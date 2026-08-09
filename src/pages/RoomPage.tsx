import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Navigation,
  Flag,
  Pencil,
  Clock,
  CalendarDays,
  ChevronDown,
} from "lucide-react";
import TopBar from "@/components/TopBar";
import SectionHeading from "@/components/SectionHeading";
import StatusPill from "@/components/StatusPill";
import { rooms } from "@/data/rooms";
import { buildings } from "@/data/buildings";
import { useOccupancy, useWeekSchedule } from "@/hooks/useOccupancy";

// Helper for the visual timeline math
const timeToMinutes = (timeStr: string) => {
  const [h, m] = timeStr.split(":").map(Number);
  return h! * 60 + m!;
};

export default function RoomPage() {
  const { roomId } = useParams();
  const navigate = useNavigate();

  const [scheduleView, setScheduleView] = useState<"upcoming" | "week">(
    "upcoming",
  );
  const [expandedDay, setExpandedDay] = useState<string | null>(null);

  const room = rooms.find((r) => r.id === roomId) ?? rooms[0];
  const building = buildings.find((b) => b.id === room?.building);

  const upcomingData = useOccupancy(room?.id);
  const weekData = useWeekSchedule(room?.id);

  // Define the boundaries of the visual timeline (08:15 to 18:15)
  const DAY_START_MINS = timeToMinutes("08:15");
  const DAY_END_MINS = timeToMinutes("18:15");
  const TOTAL_DAY_MINS = DAY_END_MINS - DAY_START_MINS;

  return (
    <div className="flex flex-col pb-8">
      <TopBar
        eyebrow="Room details"
        title={room?.id ?? "Unknown Room"}
        onBack={() => navigate(-1)}
        right={<span />}
      />

      <div className="space-y-8 px-4 py-6">
        {/* Hero Plate */}
        <section className="overflow-hidden rounded-2xl border border-line/60 bg-panel shadow-sm">
          <div className="px-5 pt-5 pb-2">
            <div className="font-display text-4xl font-bold tracking-tight text-content">
              {room?.id ?? "Unknown Room"}
            </div>
            <div className="mt-1 font-body text-[15px] font-medium text-content-muted">
              {room?.type}
            </div>
          </div>

          <dl className="grid grid-cols-2 gap-4 px-5 py-4">
            <div>
              <dt className="text-[12px] font-medium text-content-muted mb-0.5">
                Building
              </dt>
              <dd className="font-semibold text-[15px] text-content">
                {building?.name}
              </dd>
            </div>
            <div>
              <dt className="text-[12px] font-medium text-content-muted mb-0.5">
                Floor
              </dt>
              <dd className="font-semibold text-[15px] text-content">
                {room?.floor}
              </dd>
            </div>
            <div className="col-span-2">
              <dt className="text-[12px] font-medium text-content-muted mb-0.5">
                Home School
              </dt>
              <dd className="font-semibold text-[15px] text-content">
                {building?.homeSchool}
              </dd>
            </div>
          </dl>

          <div className="px-4 pb-4 pt-2">
            <button
              onClick={() => navigate(`/navigate/${room?.id}`)}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-route py-3.5 font-semibold text-white shadow-sm transition-all duration-200 active:scale-[0.98] active:opacity-90"
            >
              <Navigation className="h-5 w-5" strokeWidth={2.5} />
              <span className="text-[17px]">Navigate Here</span>
            </button>
          </div>
        </section>

        {/* Occupancy Section */}
        <section>
          <SectionHeading
            eyebrow="Derived from timetable"
            title="Expected Occupancy"
          />

          {/* Segmented Control */}
          <div className="mb-4 flex rounded-xl bg-line/40 p-1">
            <button
              onClick={() => setScheduleView("upcoming")}
              className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2 text-[13px] font-semibold transition-all ${
                scheduleView === "upcoming"
                  ? "bg-panel text-content shadow-sm"
                  : "text-content-muted hover:text-content"
              }`}
            >
              <Clock className="h-4 w-4" />
              Upcoming
            </button>
            <button
              onClick={() => setScheduleView("week")}
              className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2 text-[13px] font-semibold transition-all ${
                scheduleView === "week"
                  ? "bg-panel text-content shadow-sm"
                  : "text-content-muted hover:text-content"
              }`}
            >
              <CalendarDays className="h-4 w-4" />
              This Week
            </button>
          </div>

          {/* View Container */}
          {scheduleView === "upcoming" ? (
            <div className="overflow-hidden rounded-2xl border border-line/60 bg-panel shadow-sm divide-y divide-line/40">
              {upcomingData.length > 0 ? (
                upcomingData.map((slot, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3.5 px-4 py-3.5"
                  >
                    <Clock className="h-4 w-4 shrink-0 text-content-muted/50" />
                    <span className="w-28 shrink-0 text-[13px] font-medium text-content-muted">
                      {slot.time}
                    </span>
                    <span
                      className={`flex-1 truncate text-[15px] ${
                        slot.status === "free"
                          ? "text-content-muted/50"
                          : "font-medium text-content"
                      }`}
                    >
                      {slot.label}
                    </span>
                    <div className="shrink-0">
                      <StatusPill status={slot.status as "free" | "occupied"} />
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex items-center gap-3.5 px-4 py-5 text-content-muted">
                  <span className="text-[14px] font-medium">
                    No scheduled classes remaining today.
                  </span>
                </div>
              )}
            </div>
          ) : (
            /* Visual Availability Bar - Week View */
            <div className="space-y-3">
              <div className="flex justify-between px-2 text-[11px] font-bold uppercase tracking-wider text-content-muted/60">
                <span>8:15 AM</span>
                <span>6:15 PM</span>
              </div>

              {weekData.map((dayData) => {
                const isExpanded = expandedDay === dayData.day;

                // Calculate the visual blocks for the bar
                const blocks = [];
                let cursor = DAY_START_MINS;

                dayData.sessions.forEach((session) => {
                  const startMins = Math.max(
                    DAY_START_MINS,
                    timeToMinutes(session.start),
                  );
                  const endMins = Math.min(
                    DAY_END_MINS,
                    timeToMinutes(session.end),
                  );

                  if (startMins > cursor) {
                    // Add free block before this class
                    blocks.push({ type: "free", duration: startMins - cursor });
                  }
                  // Add occupied block
                  blocks.push({
                    type: "occupied",
                    duration: endMins - startMins,
                  });
                  cursor = endMins;
                });

                if (cursor < DAY_END_MINS) {
                  // Fill the rest of the day with a free block
                  blocks.push({
                    type: "free",
                    duration: DAY_END_MINS - cursor,
                  });
                }

                return (
                  <div
                    key={dayData.day}
                    className="overflow-hidden rounded-2xl border border-line/60 bg-panel shadow-sm transition-all"
                  >
                    <button
                      onClick={() =>
                        setExpandedDay(isExpanded ? null : dayData.day)
                      }
                      className="flex w-full flex-col gap-2 px-4 py-3.5 text-left active:bg-line/20"
                    >
                      <div className="flex w-full items-center justify-between">
                        <span className="font-semibold text-content text-[15px]">
                          {dayData.day}
                        </span>
                        <ChevronDown
                          className={`h-4 w-4 text-content-muted transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
                        />
                      </div>

                      {/* The Visual Bar */}
                      <div className="flex h-2.5 w-full overflow-hidden rounded-full bg-green-500/15">
                        {blocks.map((block, i) => (
                          <div
                            key={i}
                            className={`h-full ${block.type === "occupied" ? "bg-route" : "bg-transparent"}`}
                            style={{
                              width: `${(block.duration / TOTAL_DAY_MINS) * 100}%`,
                            }}
                          />
                        ))}
                      </div>
                    </button>

                    {/* Expandable Accordion List */}
                    {isExpanded && (
                      <div className="border-t border-line/40 bg-line/10 divide-y divide-line/40">
                        {dayData.sessions.length > 0 ? (
                          dayData.sessions.map((session, idx) => (
                            <div key={idx} className="flex gap-4 px-4 py-3.5">
                              <span className="w-24 shrink-0 text-[13px] font-medium text-content-muted pt-0.5">
                                {session.start} – {session.end}
                              </span>
                              <div className="flex flex-col min-w-0">
                                <span className="truncate text-[14px] font-semibold text-content leading-tight">
                                  {session.course_title || session.course_code}
                                </span>
                                {session.group && (
                                  <span className="mt-0.5 truncate text-[12px] font-medium text-content-muted">
                                    {session.group}
                                  </span>
                                )}
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="px-4 py-4 text-center text-[13px] font-medium text-content-muted">
                            Free all day
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* Contribution Actions */}
        <section>
          <SectionHeading
            eyebrow="Help others find this room"
            title="Contribute"
          />
          <div className="grid grid-cols-2 gap-3">
            <button className="flex flex-col items-center gap-3 rounded-2xl border border-line/60 bg-panel px-3 py-5 text-center shadow-sm transition-all hover:border-line active:scale-[0.98]">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 text-red-500 dark:bg-red-500/15 dark:text-red-400">
                <Flag className="h-5 w-5" strokeWidth={2.5} />
              </div>
              <span className="text-[13px] font-semibold text-content leading-tight">
                Report Incorrect Info
              </span>
            </button>

            <button className="flex flex-col items-center gap-3 rounded-2xl border border-line/60 bg-panel px-3 py-5 text-center shadow-sm transition-all hover:border-line active:scale-[0.98]">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-route-soft text-route">
                <Pencil className="h-5 w-5" strokeWidth={2.5} />
              </div>
              <span className="text-[13px] font-semibold text-content leading-tight">
                Suggest Correction
              </span>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
