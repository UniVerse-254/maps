import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Building2, DoorOpen, SearchX } from "lucide-react";
import TopBar from "@/components/TopBar";
import SearchBar from "@/components/SearchBar";
import SignagePlate from "@/components/SignagePlate";
import PhaseTag from "@/components/PhaseTag";
import { buildings } from "@/data/buildings";
import { rooms } from "@/data/rooms";

export default function SearchPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const filteredBuildings = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return buildings;
    return buildings.filter(
      (b) =>
        b.name.toLowerCase().includes(q) || b.code!.toLowerCase().includes(q),
    );
  }, [query]);

  const filteredRooms = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rooms;
    return rooms.filter(
      (r) => r.id.toLowerCase().includes(q) || r.type.toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <div className="flex flex-col pb-8">
      <TopBar
        eyebrow="Universal Search"
        title="Find Your Way"
        onBack={() => navigate(-1)}
        right={<span />}
      />

      <div className="space-y-8 px-4 py-6">
        <SearchBar
          value={query}
          onChange={setQuery}
          autoFocus
          placeholder="Search buildings, rooms..."
        />

        {/* Buildings Section */}
        <section>
          <div className="mb-3 flex items-center gap-2 text-[13px] font-semibold text-content-muted">
            <Building2 className="h-4 w-4" />
            Buildings
          </div>

          <div className="space-y-3">
            {filteredBuildings.map((b) => (
              <SignagePlate
                key={b.id}
                phase={b.phase ?? "phase1"}
                code={b.code ?? ""}
                label={b.name}
                sub={`${b.floors.length} floors`}
                onClick={() => navigate(`/building/${b.id}`)}
              />
            ))}

            {filteredBuildings.length === 0 && (
              <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-line/80 bg-panel px-4 py-10 text-center shadow-sm">
                <SearchX className="h-6 w-6 text-content-muted/50" />
                <p className="text-[14px] font-medium text-content-muted">
                  No buildings match “{query}”
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Rooms Section */}
        <section>
          <div className="mb-3 flex items-center gap-2 text-[13px] font-semibold text-content-muted">
            <DoorOpen className="h-4 w-4" />
            Rooms &amp; Labs
          </div>

          <div className="space-y-3">
            {filteredRooms.map((r) => {
              const building = buildings.find((b) => b.id === r.building);
              return (
                <button
                  key={r.id}
                  onClick={() => navigate(`/room/${r.id}`)}
                  className="group flex w-full items-center gap-3.5 rounded-2xl border border-line/60 bg-panel px-4 py-3.5 text-left shadow-sm transition-all duration-200 hover:border-line hover:shadow-md active:scale-[0.98]"
                >
                  {/* FIXED: Flexible width boundaries with internal truncation */}
                  <div
                    className="flex h-11 min-w-[3.5rem] max-w-[6.5rem] shrink-0 items-center justify-center rounded-xl bg-route-soft px-2.5"
                    title={r.id}
                  >
                    <span className="truncate font-display text-[13px] font-bold tracking-tight text-route">
                      {r.id}
                    </span>
                  </div>

                  <div className="min-w-0 flex-1 flex flex-col justify-center">
                    <div className="truncate font-body text-[15px] font-semibold text-content leading-tight">
                      {r.type}
                    </div>
                    <div className="truncate text-[13px] font-medium text-content-muted mt-0.5">
                      {building?.name} · {r.floor}
                    </div>
                  </div>

                  <PhaseTag phase={building?.phase ?? "phase1"} />
                </button>
              );
            })}

            {filteredRooms.length === 0 && (
              <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-line/80 bg-panel px-4 py-10 text-center shadow-sm">
                <SearchX className="h-6 w-6 text-content-muted/50" />
                <p className="text-[14px] font-medium text-content-muted">
                  No rooms match “{query}”
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
