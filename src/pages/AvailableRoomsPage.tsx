import { useNavigate } from "react-router-dom";
import { DoorOpen, Clock } from "lucide-react";
import TopBar from "@/components/TopBar";
import SectionHeading from "@/components/SectionHeading";
import { availableRooms } from "@/data/mockData";
import StatusPill from "@/components/StatusPill";

export default function AvailableRoomsPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col">
      <TopBar eyebrow="Derived from the timetable" title="Available Now" />

      <div className="space-y-8 px-4 py-6">
        {/* Helper Text */}
        <p className="text-[15px] leading-relaxed text-content-muted">
          No sensors — just the timetable. Rooms below are free based on
          scheduled classes.
        </p>

        <section>
          <SectionHeading
            eyebrow="Sorted by availability"
            title="Study & lab spaces"
            action={<DoorOpen className="h-5 w-5 text-content-muted/50" />}
          />

          <div className="space-y-3">
            {availableRooms.map((r) => (
              <button
                key={r.id}
                onClick={() => navigate(`/room/${r.id}`)}
                className="group flex w-full items-center gap-3.5 rounded-2xl border border-line/60 bg-panel px-4 py-3.5 text-left shadow-sm transition-all duration-200 hover:border-line hover:shadow-md active:scale-[0.98]"
              >
                {/* Room ID Badge (Soft Apple-style avatar) */}
                <div className="flex h-12 w-14 shrink-0 items-center justify-center rounded-xl bg-route-soft text-route">
                  <span className="font-display text-[15px] font-bold tracking-tight">
                    {r.id}
                  </span>
                </div>

                {/* Text Details */}
                <div className="min-w-0 flex-1 flex flex-col justify-center gap-0.5">
                  <div className="truncate font-body text-[15px] font-semibold leading-tight text-content">
                    {r.type}
                  </div>
                  <div className="truncate font-body text-[13px] font-medium text-content-muted">
                    {r.building}
                  </div>
                  <div className="mt-1 flex items-center gap-1.5 text-[12px] font-medium text-content-muted/80">
                    <Clock className="h-3.5 w-3.5" strokeWidth={2.5} />
                    <span>
                      {r.freeFrom} – {r.freeUntil}
                    </span>
                  </div>
                </div>

                {/* Status Indicator */}
                <div className="shrink-0">
                  <StatusPill status="free" />
                </div>
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
