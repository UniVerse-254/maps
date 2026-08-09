import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { DoorOpen, Clock, Calendar, Filter } from "lucide-react";
import TopBar from "@/components/TopBar";
import SectionHeading from "@/components/SectionHeading";
import StatusPill from "@/components/StatusPill";
import roomsScheduleData from "@/data/rooms_schedule.json";
import type { DayOfWeek } from "@/types";

interface SessionSlot {
  day: string;
  start: string;
  end: string;
  course_code: string;
  course_title: string;
  lecturer: string | null;
  group: string;
}

const roomsSchedule = roomsScheduleData as Record<string, SessionSlot[]>;

const DAYS: DayOfWeek[] = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export default function AvailableRoomsPage() {
  const navigate = useNavigate();

  const [selectedDay, setSelectedDay] = useState<DayOfWeek>(() => {
    const today = new Date().toLocaleDateString("en-US", {
      weekday: "long",
    }) as DayOfWeek;
    return DAYS.includes(today) ? today : "Monday";
  });

  const [selectedTime, setSelectedTime] = useState<string>(() => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = now.getMinutes() < 30 ? "00" : "30";
    return `${hours}:${minutes}`;
  });

  const [searchFilter, setSearchFilter] = useState("");

  const availableRooms = useMemo(() => {
    const results: Array<{
      id: string;
      freeFrom: string;
      freeUntil: string;
      type: string;
      building: string;
    }> = [];

    const [selHour, selMin] = selectedTime.split(":").map(Number);
    const targetMinutes = selHour! * 60 + selMin!;

    Object.entries(roomsSchedule).forEach(([roomId, sessions]) => {
      const daySessions = sessions
        .filter((s) => s.day.toLowerCase() === selectedDay.toLowerCase())
        .map((s) => {
          const [startH, startM] = s.start.split(":").map(Number);
          const [endH, endM] = s.end.split(":").map(Number);
          return {
            startMins: startH! * 60 + startM!,
            endMins: endH! * 60 + endM!,
            startStr: s.start,
            endStr: s.end,
          };
        })
        .sort((a, b) => a.startMins - b.startMins);

      const activeSession = daySessions.find(
        (s) => targetMinutes >= s.startMins && targetMinutes < s.endMins,
      );

      if (!activeSession) {
        const nextSession = daySessions.find(
          (s) => s.startMins > targetMinutes,
        );
        const freeUntil = nextSession ? nextSession.startStr : "18:00"; // Default end of day

        const prevSession = [...daySessions]
          .reverse()
          .find((s) => s.endMins <= targetMinutes);
        const freeFrom = prevSession ? prevSession.endStr : "07:00"; // Default start of day

        results.push({
          id: roomId,
          building: roomId.split(" ")[0] || "Campus", // Extract building prefix
          type:
            roomId.includes("LAB") || roomId.includes("FORGE")
              ? "Laboratory"
              : "Lecture Room",
          freeFrom,
          freeUntil,
        });
      }
    });

    if (!searchFilter.trim()) return results;
    return results.filter(
      (r) =>
        r.id.toLowerCase().includes(searchFilter.toLowerCase()) ||
        r.building.toLowerCase().includes(searchFilter.toLowerCase()),
    );
  }, [selectedDay, selectedTime, searchFilter]);

  return (
    <div className="flex flex-col pb-8">
      <TopBar eyebrow="Derived from the timetable" title="Available Spaces" />

      <div className="space-y-6 px-4 py-6">
        {/* Helper Text */}
        <p className="text-[15px] leading-relaxed text-content-muted">
          No sensors — just the timetable. Filter by day and time to see which
          rooms are currently open.
        </p>

        {/* Interactive Filter Bar */}
        <div className="flex flex-col gap-3 rounded-2xl border border-line/60 bg-panel p-4 shadow-sm">
          <div className="flex items-center gap-2 text-[13px] font-bold text-content uppercase tracking-wider">
            <Filter className="h-4 w-4 text-route" />
            <span>Availability Filter</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Day Selector */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-semibold text-content-muted">
                Day
              </label>
              <select
                value={selectedDay}
                onChange={(e) => setSelectedDay(e.target.value as DayOfWeek)}
                className="rounded-xl border border-line bg-base px-3 py-2.5 text-[14px] font-medium text-content outline-none focus:border-route"
              >
                {DAYS.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            {/* Time Selector */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-semibold text-content-muted">
                Time
              </label>
              <input
                type="time"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="rounded-xl border border-line bg-base px-3 py-2 text-[14px] font-medium text-content outline-none focus:border-route"
              />
            </div>
          </div>

          {/* Quick Search Input */}
          <div className="mt-1">
            <input
              type="text"
              placeholder="Filter by room name (e.g., CB, STMB, LAB)..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="w-full rounded-xl border border-line bg-base px-3 py-2.5 text-[14px] font-medium text-content outline-none focus:border-route"
            />
          </div>
        </div>

        {/* Results Section */}
        <section>
          <SectionHeading
            eyebrow={`Found ${availableRooms.length} spaces`}
            title="Study & lab spaces"
            action={<DoorOpen className="h-5 w-5 text-content-muted/50" />}
          />

          {availableRooms.length > 0 ? (
            <div className="space-y-3 mt-3">
              {availableRooms.map((r) => (
                <button
                  key={r.id}
                  onClick={() => navigate(`/room/${encodeURIComponent(r.id)}`)}
                  className="group flex w-full items-center gap-3.5 rounded-2xl border border-line/60 bg-panel px-4 py-3.5 text-left shadow-sm transition-all duration-200 hover:border-line hover:shadow-md active:scale-[0.98]"
                >
                  {/* Room ID Badge */}
                  <div className="flex h-12 w-16 shrink-0 items-center justify-center rounded-xl bg-route/10 text-route">
                    <span className="font-display text-[13px] font-bold tracking-tight truncate px-1">
                      {r.type}
                    </span>
                  </div>

                  {/* Text Details */}
                  <div className="min-w-0 flex-1 flex flex-col justify-center gap-0.5">
                    <div className="truncate font-body text-[15px] font-semibold leading-tight text-content">
                      {r.id}
                    </div>
                    <div className="truncate font-body text-[13px] font-medium text-content-muted">
                      {r.building}
                    </div>
                    <div className="mt-1 flex items-center gap-1.5 text-[12px] font-medium text-content-muted/80">
                      <Clock className="h-3.5 w-3.5" strokeWidth={2.5} />
                      <span>
                        Free: {r.freeFrom} – {r.freeUntil}
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
          ) : (
            <div className="mt-4 flex flex-col items-center justify-center rounded-2xl border border-dashed border-line bg-panel p-8 text-center">
              <Calendar className="h-8 w-8 text-content-muted mb-2" />
              <p className="text-[15px] font-bold text-content">
                No rooms available
              </p>
              <p className="text-[13px] text-content-muted mt-1">
                Try selecting a different time slot or day.
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
