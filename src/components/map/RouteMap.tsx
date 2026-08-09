import { useCallback, useEffect, useMemo, useState } from "react";
import {
  MapContainer,
  Marker,
  Polyline,
  Polygon,
  Tooltip,
  Popup,
  useMap,
} from "react-leaflet";
import L, { type LatLngBoundsExpression, type LatLngExpression } from "leaflet";
import { MapPin, LocateFixed } from "lucide-react";
import type { Building, Coordinates } from "@/types";
import { buildings } from "@/data/buildings";
import { routingGraph } from "@/data/routing";
import { findShortestPath } from "@/utils/pathfinding";

function makeDotIcon(color: string, ringColor: string) {
  return L.divIcon({
    className: "",
    html: `<span style="
      display:block;
      width:16px;
      height:16px;
      border-radius:9999px;
      background:${color};
      border:2.5px solid ${ringColor};
      box-shadow:0 1px 3px rgba(0,0,0,0.35);
    "></span>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
  });
}

const startIcon = makeDotIcon("#B8452F", "#ffffff");
const destinationIcon = makeDotIcon("#E8A33D", "#14213D");

function haversineMeters(a: Coordinates, b: Coordinates): number {
  const R = 6371000;
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);

  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;

  return 2 * R * Math.asin(Math.sqrt(h));
}

function formatDistanceEta(meters: number) {
  const walkingSpeedMs = 1.35;
  const minutes = Math.max(1, Math.round(meters / walkingSpeedMs / 60));
  const distanceLabel =
    meters >= 1000
      ? `${(meters / 1000).toFixed(1)} km`
      : `${Math.round(meters)} m`;
  return `${distanceLabel} · ${minutes} min walk`;
}

function fallbackBoundsFromBuildings(source: Building[]): Coordinates[] {
  const points = source.flatMap((b) => b.footprint ?? [b.coordinates]);
  const lats = points.map((p) => p.lat);
  const lngs = points.map((p) => p.lng);
  const pad = 0.002;

  const minLat = Math.min(...lats) - pad;
  const maxLat = Math.max(...lats) + pad;
  const minLng = Math.min(...lngs) - pad;
  const maxLng = Math.max(...lngs) + pad;

  return [
    { lat: minLat, lng: minLng },
    { lat: minLat, lng: maxLng },
    { lat: maxLat, lng: maxLng },
    { lat: maxLat, lng: minLng },
  ];
}

function toLatLngTuples(points: Coordinates[]): LatLngExpression[] {
  return points.map((p) => [p.lat, p.lng]);
}

function FitBounds({ points }: { points: Coordinates[] }) {
  const map = useMap();

  useEffect(() => {
    if (points.length < 2) return;
    const bounds = L.latLngBounds(points.map((p) => [p.lat, p.lng]));
    map.fitBounds(bounds, { padding: [40, 40] });
  }, [map, points]);

  return null;
}

export interface RouteMapProps {
  destination: Building;
  start?: Coordinates;
  campusBoundary?: Coordinates[];
  groundColor?: string;
  pageColor?: string;
  buildingColor?: string;
  height?: string;
  className?: string;
}

export default function RouteMap({
  destination,
  start,
  campusBoundary,
  groundColor = "#EDE8DC",
  pageColor = "#F5F1E8",
  buildingColor = "#C9C4B6",
  height = "13rem",
  className = "",
}: RouteMapProps) {
  const [userLocation, setUserLocation] = useState<Coordinates | null>(
    start ?? null,
  );
  const [permissionDenied, setPermissionDenied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(!start);
  const destinationCoordinates = destination.coordinates;

  const requestLocation = useCallback(() => {
    if (!("geolocation" in navigator)) {
      setError("Geolocation isn't supported on this device.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    setPermissionDenied(false);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setLoading(false);
      },
      (err) => {
        if (err.code === err.PERMISSION_DENIED) {
          setPermissionDenied(true);
        } else {
          setError(
            "Couldn't get your location. Check your connection and try again.",
          );
        }
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000 },
    );
  }, []);

  useEffect(() => {
    if (start) return;
    requestLocation();
  }, [start, requestLocation]);

  // ==========================================
  // ALL HOOKS ARE NOW DECLARED AT THE TOP LEVEL
  // (Fixes the "Rendered more hooks than during previous render" bug)
  // ==========================================
  const routeInfo = useMemo(() => {
    if (!userLocation) return null;
    const meters = haversineMeters(userLocation, destinationCoordinates);
    return formatDistanceEta(meters);
  }, [userLocation, destinationCoordinates]);

  const boundaryRing = useMemo(
    () => campusBoundary ?? fallbackBoundsFromBuildings(buildings),
    [campusBoundary],
  );

  const maxBounds: LatLngBoundsExpression = useMemo(() => {
    const lats = boundaryRing.map((p) => p.lat);
    const lngs = boundaryRing.map((p) => p.lng);
    const pad = 0.001;
    return [
      [Math.min(...lats) - pad, Math.min(...lngs) - pad],
      [Math.max(...lats) + pad, Math.max(...lngs) + pad],
    ];
  }, [boundaryRing]);

  const graphEdges = useMemo(() => {
    if (!routingGraph) return [];
    const drawn = new Set();
    const lines: LatLngExpression[][] = [];

    Object.entries(routingGraph).forEach(([nodeId, data]: [string, any]) => {
      const { lat: lat1, lng: lon1 } = data.coords;

      Object.keys(data.neighbors).forEach((neighborId) => {
        const edgeKey = [nodeId, neighborId].sort().join("-");
        if (!drawn.has(edgeKey)) {
          drawn.add(edgeKey);
          const neighbor = routingGraph[neighborId];
          if (neighbor) {
            const { lat: lat2, lng: lon2 } = neighbor.coords;
            lines.push([
              [lat1, lon1],
              [lat2, lon2],
            ]);
          }
        }
      });
    });
    return lines;
  }, []);

  const routePoints: Coordinates[] = useMemo(() => {
    if (!userLocation || !destinationCoordinates || !routingGraph) {
      return userLocation && destinationCoordinates
        ? [userLocation, destinationCoordinates]
        : [];
    }
    return findShortestPath(userLocation, destinationCoordinates, routingGraph);
  }, [userLocation, destinationCoordinates, routingGraph]);

  // ==========================================
  // CONDITIONAL RENDER GUARDS (Placed after hooks)
  // ==========================================
  if (loading) {
    return (
      <section
        className={`flex items-center justify-center rounded-2xl border border-line/60 bg-panel shadow-sm ${className}`}
        style={{ height }}
      >
        <span className="text-[13px] font-medium text-content-muted">
          Finding your location…
        </span>
      </section>
    );
  }

  if (permissionDenied || error || !userLocation) {
    return (
      <section
        className={`rounded-2xl border border-dashed border-line/80 bg-panel p-5 shadow-sm ${className}`}
      >
        <div className="flex items-start gap-3.5">
          <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-route/10 text-route">
            <MapPin className="h-4.5 w-4.5" strokeWidth={2.5} />
          </div>
          <div>
            <div className="text-[15px] font-semibold text-content">
              {permissionDenied
                ? "Turn on location for navigation"
                : "Location unavailable"}
            </div>
            <p className="mt-1 text-[13px] font-medium leading-relaxed text-content-muted">
              {permissionDenied
                ? "We need your location to plot a walking route. Allow location access in your browser's site settings, then try again."
                : error}
            </p>
          </div>
        </div>

        <button
          onClick={requestLocation}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-route py-3 text-[14px] font-semibold text-white transition-transform active:scale-[0.97]"
        >
          <LocateFixed className="h-4 w-4" strokeWidth={2.5} />
          Try Again
        </button>
      </section>
    );
  }

  return (
    <section
      className={`overflow-hidden rounded-2xl border border-line/60 bg-panel shadow-sm ${className}`}
    >
      <div style={{ height }}>
        <MapContainer
          center={[userLocation.lat, userLocation.lng]}
          zoom={17}
          minZoom={15}
          maxBounds={maxBounds}
          maxBoundsViscosity={0.8}
          scrollWheelZoom={false}
          style={{ height: "100%", width: "100%", background: pageColor }}
        >
          <Polygon
            positions={toLatLngTuples(boundaryRing)}
            pathOptions={{
              stroke: false,
              fillColor: groundColor,
              fillOpacity: 1,
            }}
            interactive={false}
          />

          {buildings
            .filter((b) => b.footprint && b.footprint.length > 0)
            .map((building) => (
              <Polygon
                key={building.id}
                positions={toLatLngTuples(building.footprint!)}
                pathOptions={{
                  stroke: false,
                  fillColor: buildingColor,
                  fillOpacity: 1,
                  className: "campus-building-shape",
                }}
              >
                <Tooltip direction="center" permanent={false} opacity={1}>
                  {building.name}
                </Tooltip>
                <Popup>
                  <strong>{building.name}</strong>
                  {building.code && (
                    <>
                      <br />
                      {building.code}
                    </>
                  )}
                </Popup>
              </Polygon>
            ))}

          {graphEdges.length > 0 && (
            <Polyline
              positions={graphEdges}
              pathOptions={{
                color: "#14213D",
                weight: 1.5,
                opacity: 0.3,
                interactive: false,
              }}
            />
          )}

          <Polyline
            positions={toLatLngTuples(routePoints)}
            pathOptions={{
              color: "#3F7A5C",
              weight: 4,
              dashArray: "8 6",
              lineCap: "round",
              lineJoin: "round",
            }}
          />

          <Marker
            position={[userLocation.lat, userLocation.lng]}
            icon={startIcon}
          />
          <Marker
            position={[destinationCoordinates.lat, destinationCoordinates.lng]}
            icon={destinationIcon}
          />

          <FitBounds points={routePoints} />
        </MapContainer>
      </div>

      <div className="flex items-center justify-between px-5 py-4 border-t border-line/40">
        <div>
          <div className="text-[12px] font-medium text-content-muted mb-0.5">
            Distance · ETA
          </div>
          <div className="font-display text-[15px] font-bold text-content leading-tight">
            {routeInfo}
          </div>
        </div>
        <span className="rounded-full bg-route-soft px-3 py-1.5 text-[12px] font-semibold text-route">
          {destination.code ?? "Preferred Route"}
        </span>
      </div>
    </section>
  );
}
