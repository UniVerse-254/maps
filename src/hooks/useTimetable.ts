import { useState, useEffect } from "react";
import { get, set, del } from "idb-keyval";
import coursesScheduleData from "@/data/courses_schedule.json";
import type {
  ClassSession,
  DayOfWeek,
  ValidatedTimetable,
  RawSession,
  CourseSelection,
} from "@/types";

const masterSchedule = coursesScheduleData as Record<string, RawSession[]>;

const STORAGE_KEY = "user_validated_timetable";

export function useTimetable() {
  const [timetable, setTimetable] = useState<ValidatedTimetable | null>(null);
  const [pendingTimetable, setPendingTimetable] = useState<
    ClassSession[] | null
  >(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadFromIDB = async () => {
      try {
        const stored = await get<ValidatedTimetable>(STORAGE_KEY);
        if (isMounted && stored) {
          setTimetable(stored);
        }
      } catch (error) {
        console.error("Failed to load timetable from IndexedDB:", error);
      } finally {
        if (isMounted) setIsLoaded(true);
      }
    };

    loadFromIDB();

    return () => {
      isMounted = false;
    };
  }, []);

  const generateTimetable = (selections: CourseSelection[]) => {
    const generatedSessions: ClassSession[] = [];

    selections.forEach((selection) => {
      const rawCourseSessions = masterSchedule[selection.courseCode];

      if (!rawCourseSessions) {
        console.warn(
          `Course code not found in master schedule: ${selection.courseCode}`,
        );
        return;
      }

      rawCourseSessions.forEach((rawSession) => {
        // Robust matching: If no group selected, take it. Otherwise check substring case-insensitively.
        const userGroup = selection.group?.trim().toLowerCase() || "";
        const sessionGroup = rawSession.group?.trim().toLowerCase() || "";

        const matchesGroup =
          !userGroup ||
          !sessionGroup ||
          sessionGroup.includes(userGroup) ||
          userGroup.includes(sessionGroup);

        if (matchesGroup) {
          generatedSessions.push({
            id: `${selection.courseCode}-${rawSession.day}-${rawSession.start}`.replace(
              /\s+/g,
              "",
            ),
            courseCode: selection.courseCode,
            courseTitle: rawSession.title,
            roomId: rawSession.venues?.[0] || "",
            lecturer: rawSession.lecturer ?? "TBA",
            day: rawSession.day,
            startTime: rawSession.start,
            endTime: rawSession.end,
            group: rawSession.group,
            isVirtual: rawSession.is_virtual,
            venues: rawSession.venues,
            meetingId: rawSession.meeting_id,
          });
        }
      });
    });

    console.log(
      `Generated ${generatedSessions.length} sessions for selections:`,
      selections,
    );
    setPendingTimetable(generatedSessions);
  };

  const confirmValidation = async () => {
    if (!pendingTimetable) return;

    const validatedData: ValidatedTimetable = {
      updatedAt: Date.now(),
      sessions: pendingTimetable,
    };

    try {
      await set(STORAGE_KEY, validatedData);
      setTimetable(validatedData);
      setPendingTimetable(null); // Clear the staging area
    } catch (error) {
      console.error("Failed to save validated timetable:", error);
      throw error;
    }
  };

  const cancelValidation = () => {
    setPendingTimetable(null);
  };

  const clearTimetable = async () => {
    try {
      await del(STORAGE_KEY);
      setTimetable(null);
      setPendingTimetable(null);
    } catch (error) {
      console.error("Failed to clear timetable:", error);
    }
  };

  const getSessionsForDay = (day: DayOfWeek) => {
    if (!timetable) return [];

    return timetable.sessions
      .filter((s) => s.day === day)
      .sort((a, b) => a.startTime.localeCompare(b.startTime));
  };

  return {
    timetable,
    pendingTimetable,
    isLoaded,
    generateTimetable,
    confirmValidation,
    cancelValidation,
    clearTimetable,
    getSessionsForDay,
  };
}
