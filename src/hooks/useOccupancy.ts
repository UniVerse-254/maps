import { useMemo } from "react";
import roomsScheduleData from "@/data/rooms_schedule.json";

type Session = {
  day: string;
  start: string;
  end: string;
  course_code: string | null;
  course_title: string | null;
  lecturer: string | null;
  group: string;
};

type ScheduleMap = Record<string, Session[]>;
const schedule = roomsScheduleData as ScheduleMap;

export type OccupancySlot = {
  time: string;
  status: "occupied" | "free";
  label: string;
};

// Helper to convert "HH:MM" to minutes past midnight
const timeToMinutes = (timeStr: string) => {
  const [h, m] = timeStr.split(":").map(Number);
  return h! * 60 + m!;
};

// Helper to format minutes back to "HH:MM"
const minutesToTime = (mins: number) => {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
};

export function useOccupancy(roomId: string | undefined): OccupancySlot[] {
  return useMemo(() => {
    if (!roomId || !schedule[roomId]) return [];

    // Get current device time
    const now = new Date();
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const currentDay = days[now.getDay()];

    // edge case testing....
    // Or just testing
    // Set the day here
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    // Get all sessions for this room on the CURRENT day, sorted by start time
    const todaysSessions = (schedule[roomId] || [])
      .filter((s) => s.day === currentDay)
      .sort((a, b) => timeToMinutes(a.start) - timeToMinutes(b.start));

    // We want to generate the next 5 slots (including the current one)
    const timeline: OccupancySlot[] = [];
    let searchCursor = Math.max(timeToMinutes("08:15"), currentMinutes);
    const endOfDay = timeToMinutes("18:15");

    // Iterate through today's classes to build the timeline
    for (const session of todaysSessions) {
      const sessionStart = timeToMinutes(session.start);
      const sessionEnd = timeToMinutes(session.end);

      // If this class ended before our current time, skip it
      if (sessionEnd <= searchCursor) continue;

      // If there is a gap between our cursor and the start of the next class, fill it with a "free" block
      if (sessionStart > searchCursor) {
        timeline.push({
          time: `${minutesToTime(searchCursor)} – ${session.start}`,
          status: "free",
          label: "—",
        });
      }

      timeline.push({
        time: `${session.start} – ${session.end}`,
        status: "occupied",
        label: session.course_title || session.course_code || "Occupied",
      });

      searchCursor = sessionEnd;

      if (timeline.length >= 5) break;
    }

    if (timeline.length < 5 && searchCursor < endOfDay) {
      timeline.push({
        time: `${minutesToTime(searchCursor)} – 18:15`,
        status: "free",
        label: "—",
      });
    }

    return timeline.slice(0, 5);
  }, [roomId]);
}

export type WeekDaySchedule = {
  day: string;
  sessions: Session[];
};

export function useWeekSchedule(roomId: string | undefined): WeekDaySchedule[] {
  return useMemo(() => {
    if (!roomId || !schedule[roomId]) return [];

    const roomSessions = schedule[roomId] || [];
    const baseDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

    const hasSaturday = roomSessions.some((s) => s.day === "Saturday");
    const daysToRender = hasSaturday ? [...baseDays, "Saturday"] : baseDays;

    return daysToRender.map((day) => {
      const daySessions = roomSessions
        .filter((s) => s.day === day)
        .sort((a, b) => timeToMinutes(a.start) - timeToMinutes(b.start));

      return { day, sessions: daySessions };
    });
  }, [roomId]);
}
