import { useParams, useNavigate } from "react-router-dom";
import {
  Layers,
  MapPin,
  BookOpen,
  Navigation,
  ChevronRight,
} from "lucide-react";
import TopBar from "@/components/TopBar";
import PhaseTag from "@/components/PhaseTag";
import SectionHeading from "@/components/SectionHeading";
import { buildings } from "@/data/buildings";
import { rooms } from "@/data/rooms";

export default function BuildingPage() {
  const { buildingId } = useParams();
  const navigate = useNavigate();

  // Find the building or fallback to the first one safely
  const building = buildings.find((b) => b.id === buildingId) ?? buildings[0];

  // Group rooms by floor
  const roomsByFloor = building?.floors.map((floor) => ({
    floor,
    rooms: rooms.filter((r) => r.building === building.id && r.floor === floor),
  }));

  return (
    <div className="flex flex-col pb-8">
      <TopBar
        eyebrow={`Building · ${building?.code}`}
        title={building?.name ?? "Unknown Building"}
        onBack={() => navigate(-1)} // Native back navigation
      />

      <div className="space-y-8 px-4 py-6">
        {/* Hero Plate */}
        <section className="overflow-hidden rounded-2xl border border-line/60 bg-panel shadow-sm">
          <div className="flex items-start justify-between gap-3 px-5 pt-5">
            <div>
              <div className="font-display text-4xl font-bold tracking-tight text-content">
                {building?.code}
              </div>
              <div className="mt-1 font-body text-[15px] font-medium text-content-muted">
                {building?.name}
              </div>
            </div>
            {/* Updated from zone to phase to match new mock data */}
            <PhaseTag phase={building?.phase ?? "phase1"} />
          </div>

          <p className="px-5 pb-6 pt-4 text-[15px] leading-relaxed text-content-muted">
            {building?.description}
          </p>

          <div className="px-4 pb-4">
            <button
              onClick={() => navigate(`/navigate/${building?.id}`)}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-route py-3.5 font-semibold text-white shadow-sm transition-all duration-200 active:scale-[0.98] active:opacity-90"
            >
              <Navigation className="h-5 w-5" strokeWidth={2.5} />
              <span className="text-[17px]">Navigate Here</span>
            </button>
          </div>
        </section>

        {/* Meta Stats Grid */}
        <section className="grid grid-cols-2 gap-3">
          <div className="flex flex-col justify-center rounded-2xl border border-line/60 bg-panel p-4 shadow-sm">
            <div className="flex items-center gap-1.5 text-[12px] font-medium text-content-muted">
              <Layers className="h-4 w-4" />
              <span>Floors</span>
            </div>
            <div className="mt-1.5 font-display text-xl font-bold text-content">
              {building?.floors.length}
            </div>
          </div>

          <div className="flex flex-col justify-center rounded-2xl border border-line/60 bg-panel p-4 shadow-sm">
            <div className="flex items-center gap-1.5 text-[12px] font-medium text-content-muted">
              <BookOpen className="h-4 w-4" />
              <span>Home School</span>
            </div>
            <div className="mt-1.5 truncate font-display text-[15px] font-bold text-content leading-tight">
              {building?.homeSchool}
            </div>
          </div>
        </section>

        {/* Main Entrance */}
        <section>
          <SectionHeading eyebrow="Getting In" title="Main Entrance" />
          <div className="flex items-start gap-3.5 rounded-2xl border border-line/60 bg-panel p-4 shadow-sm">
            <MapPin
              className="mt-0.5 h-5 w-5 shrink-0 text-red-500"
              strokeWidth={2.5}
            />
            <p className="text-[15px] font-medium leading-relaxed text-content-muted">
              {building?.entrance}
            </p>
          </div>
        </section>

        {/* Floor Directory (Grouped iOS List Style) */}
        <section>
          <SectionHeading eyebrow="Floor by floor" title="Directory" />
          <div className="space-y-5">
            {roomsByFloor?.map(({ floor, rooms: floorRooms }) => (
              <div
                key={floor}
                className="overflow-hidden rounded-2xl border border-line/60 bg-panel shadow-sm"
              >
                {/* Floor Header */}
                <div className="flex items-center justify-between border-b border-line/60 bg-line/10 px-4 py-3">
                  <span className="font-display text-[15px] font-bold text-content">
                    {floor}
                  </span>
                  <span className="text-[13px] font-medium text-content-muted">
                    {floorRooms.length}{" "}
                    {floorRooms.length === 1 ? "room" : "rooms"}
                  </span>
                </div>

                {/* Rooms List */}
                {floorRooms.length > 0 ? (
                  <ul className="divide-y divide-line/40">
                    {floorRooms.map((r) => (
                      <li key={r.id}>
                        <button
                          onClick={() => navigate(`/room/${r.id}`)}
                          className="group flex w-full items-center gap-3.5 px-4 py-3.5 text-left transition-colors hover:bg-line/20 active:bg-line/40"
                        >
                          <span className="flex h-9 w-12 shrink-0 items-center justify-center rounded-lg bg-route-soft font-display text-[13px] font-bold text-route">
                            {r.id}
                          </span>
                          <span className="flex-1 truncate font-body text-[15px] font-medium text-content">
                            {r.type}
                          </span>
                          <ChevronRight className="h-4.5 w-4.5 shrink-0 text-content-muted/50 transition-transform group-hover:translate-x-0.5" />
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="px-4 py-4 text-[13px] font-medium text-content-muted/60">
                    No rooms listed on this floor yet.
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
