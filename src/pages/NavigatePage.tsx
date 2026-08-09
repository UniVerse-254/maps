import { useParams, useNavigate } from "react-router-dom";
import { MapPin, Footprints, Building2, DoorOpen } from "lucide-react";
import TopBar from "@/components/TopBar";
import { campusBoundary } from "@/data/boundary";
import RouteMap from "@/components/map/RouteMap";
import { buildings } from "@/data/buildings";
import { rooms } from "@/data/rooms";

interface Step {
  icon: typeof MapPin;
  label: string;
  sub: string;
}

export default function NavigatePage() {
  const { targetId } = useParams<{ targetId: string }>();
  const navigate = useNavigate();

  // Look up the destination
  const room = rooms.find((r) => r.id === targetId);
  const building =
    buildings.find((b) => b.id === (room?.building ?? targetId)) ??
    buildings[0];

  if (!building) {
    return (
      <div className="flex h-full items-center justify-center text-content-muted">
        Destination not found.
      </div>
    );
  }

  const steps: Step[] = [
    { icon: MapPin, label: "You are here", sub: "Current location" },
    {
      icon: Building2,
      label: `Arrive at ${building.name}`,
      sub: building.entrance,
    },
    ...(room
      ? [
          {
            icon: DoorOpen,
            label: `Go to ${room.floor}`,
            sub: `Room ${room.id}`,
          },
        ]
      : []),
  ];

  return (
    <div className="flex flex-col pb-8">
      <TopBar
        eyebrow="Outdoor Navigation"
        title="Walking Route"
        onBack={() => navigate(-1)}
        right={<span />}
      />

      <div className="space-y-6 px-4 py-6">
        {/* Live route map — replaces the old static SVG illustration */}
        <RouteMap
          destination={building}
          campusBoundary={campusBoundary}
          start={{ lat: -1.310471249091984, lng: 36.8140122605563 }} // Oval Building — dev-only stand-in for "already on campus"
        />

        {/* Step list */}
        <section className="space-y-3">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div
                key={i}
                className="flex items-center gap-4 rounded-2xl border border-line/60 bg-panel px-4 py-3.5 shadow-sm"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-route-soft text-route">
                  <Icon className="h-5 w-5" strokeWidth={2.25} />
                </div>
                <div className="min-w-0 flex-1 flex flex-col justify-center">
                  <div className="truncate font-body text-[15px] font-semibold text-content leading-tight">
                    {step.label}
                  </div>
                  <div className="truncate text-[13px] font-medium text-content-muted mt-0.5">
                    {step.sub}
                  </div>
                </div>
              </div>
            );
          })}
        </section>
      </div>
    </div>
  );
}
