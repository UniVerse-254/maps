import { useState, useEffect, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Clock,
  ChevronRight,
  Star,
  History,
  MapPin,
  Calendar,
  CheckCircle2,
  X,
  Search,
  Check,
  Plus,
} from "lucide-react";
import TopBar from "@/components/TopBar";
import SectionHeading from "@/components/SectionHeading";
import SearchBar from "@/components/SearchBar";
import { buildings } from "@/data/buildings";
import courseListData from "@/data/course_list.json";

import { useGetMeQuery } from "@/lib/auth.query";
import { useCourses } from "@/hooks/useCourses";
import { useTimetable } from "@/hooks/useTimetable";
import { useRecentSearches } from "@/hooks/useRecentSearches";
import { useFavoriteRooms } from "@/hooks/useFavoriteRooms";
import type { ClassSession, CourseSelection } from "@/types";

interface CourseListItem {
  code: string;
  title: string;
}

const allCourses: CourseListItem[] = courseListData as CourseListItem[];

export default function HomePage() {
  const navigate = useNavigate();
  const { data: user } = useGetMeQuery();
  const displayName = user?.name || user?.email || "Student";

  // Data Hooks
  const { courses, addCourse, removeCourse } = useCourses();
  const {
    timetable,
    pendingTimetable,
    generateTimetable,
    confirmValidation,
    cancelValidation,
    isLoaded,
  } = useTimetable();
  const { searches } = useRecentSearches();
  const { favorites } = useFavoriteRooms();

  // Local State
  const [isSetupModalOpen, setIsSetupModalOpen] = useState(false);
  const [nextClass, setNextClass] = useState<
    (ClassSession & { startsInMinutes: number }) | null
  >(null);

  // Auto-trigger modal if no courses exist
  useEffect(() => {
    if (isLoaded && courses.length === 0) {
      setIsSetupModalOpen(true);
    }
  }, [courses.length, isLoaded]);

  useEffect(() => {
    if (!timetable || timetable.sessions.length === 0) return;

    const calculateNextClass = () => {
      const now = new Date();
      const currentDay = now.toLocaleDateString("en-US", { weekday: "long" });
      const currentMinutes = now.getHours() * 60 + now.getMinutes();

      const todaysClasses = timetable.sessions.filter(
        (s) => s.day === currentDay,
      );

      const upcoming = todaysClasses
        .map((session) => {
          const [hours, minutes] = session.startTime.split(":").map(Number);
          const startMinutes = hours! * 60 + minutes!;
          return { ...session, startMinutes };
        })
        .filter((session) => session.startMinutes > currentMinutes - 15)
        .sort((a, b) => a.startMinutes - b.startMinutes)[0];

      if (upcoming) {
        setNextClass({
          ...upcoming,
          startsInMinutes: upcoming.startMinutes - currentMinutes,
        });
      } else {
        setNextClass(null);
      }
    };

    calculateNextClass();
    const interval = setInterval(calculateNextClass, 60000);
    return () => clearInterval(interval);
  }, [timetable]);

  return (
    <div className="flex flex-col pb-8">
      <TopBar eyebrow="Good morning" title={displayName} />

      <div className="space-y-8 px-4 py-6">
        {/* Hero Widget: Next Class */}
        {nextClass ? (
          <section>
            <SectionHeading
              eyebrow="I have somewhere to be"
              title="Your next class"
            />
            <div className="overflow-hidden rounded-[1.5rem] bg-route text-white shadow-md">
              <div className="flex items-center justify-between px-5 pt-5">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-2.5 py-1 text-[12px] font-semibold tracking-wide backdrop-blur-md">
                  <Clock className="h-3.5 w-3.5" />
                  {nextClass.startsInMinutes > 0
                    ? `Starts in ${nextClass.startsInMinutes} min`
                    : "Started recently"}
                </span>
                <span className="text-[13px] font-medium text-white/80">
                  {nextClass.startTime} - {nextClass.endTime}
                </span>
              </div>

              <div className="flex flex-col justify-center px-5 pb-4 pt-3">
                <div className="font-display text-[22px] font-bold leading-tight tracking-tight">
                  {nextClass.courseCode}: {nextClass.courseTitle}
                </div>
                <div className="mt-0.5 text-[15px] font-medium text-white/80">
                  {nextClass.lecturer || "TBA"}
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-white/10 bg-white/5 px-5 py-4 backdrop-blur-sm">
                <div className="flex flex-col">
                  <span className="font-display text-2xl font-bold tracking-tight">
                    {nextClass.roomId || "Virtual"}
                  </span>
                  <span className="text-[13px] font-medium text-white/70">
                    {nextClass.isVirtual ? "Online Meeting" : "On Campus"}
                  </span>
                </div>
                {!nextClass.isVirtual && nextClass.roomId && (
                  <button
                    onClick={() => navigate(`/navigate/${nextClass.roomId}`)}
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-route shadow-sm transition-transform active:scale-90"
                    aria-label="Navigate to class"
                  >
                    <ChevronRight className="h-6 w-6" strokeWidth={3} />
                  </button>
                )}
              </div>
            </div>
          </section>
        ) : (
          <section>
            <div className="flex flex-col items-center justify-center rounded-[1.5rem] border border-dashed border-line bg-panel py-8 px-4 text-center">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-route/10 text-route">
                <Calendar className="h-6 w-6" />
              </div>
              <h3 className="text-[16px] font-bold text-content">
                No more classes today
              </h3>
              <p className="mt-1 text-[14px] text-content-muted">
                You're all clear! Enjoy the rest of your day.
              </p>
            </div>
          </section>
        )}

        {/* Universal Search */}
        <section>
          <SectionHeading
            eyebrow="Universal search"
            title="Find a room or building"
          />
          <div
            onClick={() => navigate("/search")}
            className="block w-full cursor-pointer transition-transform active:scale-[0.98]"
          >
            <SearchBar
              value=""
              onChange={() => {}}
              placeholder="Search campus..."
            />
          </div>
        </section>

        {/* Recents */}
        {searches?.length > 0 && (
          <section>
            <SectionHeading
              eyebrow="Pick up where you left off"
              title="Recent searches"
              action={<History className="h-5 w-5 text-content-muted/50" />}
            />
            <div className="flex flex-wrap gap-2.5">
              {searches.map((r) => (
                <button
                  key={r}
                  onClick={() => navigate(`/search?q=${encodeURIComponent(r)}`)}
                  className="rounded-full border border-line/60 bg-panel px-4 py-2 text-[14px] font-medium text-content-muted shadow-sm transition-colors hover:border-line hover:text-content active:scale-95"
                >
                  {r}
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Favourites */}
        {favorites?.length > 0 && (
          <section>
            <SectionHeading
              eyebrow="Bookmarked"
              title="Favourite locations"
              action={
                <Star className="h-5 w-5 text-yellow-500" fill="currentColor" />
              }
            />
            <div className="space-y-3">
              {favorites.map((favId) => {
                const building = buildings.find((b) => b.id === favId);
                if (!building) return null;

                return (
                  <button
                    key={favId}
                    onClick={() => navigate(`/building/${favId}`)}
                    className="group flex w-full items-center gap-3.5 rounded-2xl border border-line/60 bg-panel px-4 py-3 text-left shadow-sm transition-all duration-200 hover:border-line hover:shadow-md active:scale-[0.98]"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-500 dark:bg-red-500/15 dark:text-red-400">
                      <MapPin className="h-5 w-5" strokeWidth={2.5} />
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col justify-center">
                      <div className="truncate font-body text-[15px] font-semibold text-content">
                        {building.name}
                      </div>
                      <div className="truncate text-[13px] font-medium text-content-muted">
                        {building.description ||
                          building.code ||
                          "Campus Building"}
                      </div>
                    </div>
                    <ChevronRight className="h-4.5 w-4.5 shrink-0 text-content-muted/50 transition-transform group-hover:translate-x-0.5" />
                  </button>
                );
              })}
            </div>
          </section>
        )}
      </div>

      {isSetupModalOpen && (
        <CourseSetupModal
          onClose={() => setIsSetupModalOpen(false)}
          courses={courses}
          addCourse={addCourse}
          removeCourse={removeCourse}
          pendingTimetable={pendingTimetable}
          generateTimetable={generateTimetable}
          confirmValidation={confirmValidation}
          cancelValidation={cancelValidation}
        />
      )}
    </div>
  );
}

/**
 * Sub-component for multi-selecting filtered courses from course_list.json
 * and generating the validated timetable.
 */
function CourseSetupModal({
  onClose,
  courses,
  addCourse,
  removeCourse,
  pendingTimetable,
  generateTimetable,
  confirmValidation,
  cancelValidation,
}: any) {
  const [searchTerm, setSearchTerm] = useState("");
  const [inputGroup, setInputGroup] = useState("");
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Filter available courses based on search input and exclude already added ones
  const filteredCourses = useMemo(() => {
    return allCourses.filter(
      (item) =>
        !courses.includes(item.code) &&
        (item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.title.toLowerCase().includes(searchTerm.toLowerCase())),
    );
  }, [searchTerm, courses]);

  // Handle outside click to close the dropdown suggestion list
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpenDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectCourse = (code: string) => {
    addCourse(code);
    setSearchTerm("");
    setIsOpenDropdown(false);
  };

  const handleGenerate = () => {
    const selections: CourseSelection[] = courses.map((code: string) => ({
      courseCode: code,
      group: inputGroup ? inputGroup.toUpperCase() : null,
    }));
    generateTimetable(selections);
  };

  const handleConfirm = async () => {
    await confirmValidation();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm sm:items-center p-4">
      <div className="w-full max-w-lg overflow-hidden rounded-3xl bg-base shadow-2xl animate-in slide-in-from-bottom-10 sm:zoom-in-95">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-line px-6 py-4">
          <h2 className="text-[18px] font-bold text-content">
            Setup Your Timetable
          </h2>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-content-muted hover:bg-line/50"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Staging / Validation View */}
        {pendingTimetable ? (
          <div className="flex max-h-[60vh] flex-col overflow-y-auto px-6 py-4">
            <div className="mb-4 flex items-center gap-2 rounded-xl bg-route/10 p-4 text-route">
              <CheckCircle2 className="h-5 w-5 shrink-0" />
              <p className="text-[14px] font-medium">
                Timetable generated! Review your classes below.
              </p>
            </div>

            <div className="space-y-3">
              {pendingTimetable.map((session: ClassSession) => (
                <div
                  key={session.id}
                  className="flex flex-col rounded-xl border border-line bg-panel p-3 shadow-sm"
                >
                  <div className="flex justify-between items-start">
                    <span className="font-bold text-[15px]">
                      {session.courseCode}
                    </span>
                    <span className="text-[12px] font-semibold text-route bg-route/10 px-2 py-0.5 rounded">
                      {session.day}
                    </span>
                  </div>
                  <span className="text-[13px] text-content-muted mt-1">
                    {session.courseTitle}
                  </span>
                  <div className="mt-3 flex items-center justify-between text-[12px] font-medium text-content-muted">
                    <span>
                      {session.startTime} - {session.endTime}
                    </span>
                    <span>{session.roomId || "Virtual"}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={cancelValidation}
                className="flex-1 rounded-xl border border-line bg-panel py-3 font-bold text-content hover:bg-line/40"
              >
                Go Back
              </button>
              <button
                onClick={handleConfirm}
                className="flex-1 rounded-xl bg-route py-3 font-bold text-white hover:bg-route/90 shadow-md shadow-route/20"
              >
                Save Timetable
              </button>
            </div>
          </div>
        ) : (
          /* Selection Input View */
          <div className="px-6 py-6">
            <p className="mb-5 text-[14px] text-content-muted">
              Search and select your units from the directory to automatically
              generate your weekly schedule.
            </p>

            {/* Filterable Search Dropdown */}
            <div className="relative mb-4" ref={dropdownRef}>
              <div className="relative flex items-center">
                <Search className="absolute left-4 h-4 w-4 text-content-muted" />
                <input
                  type="text"
                  placeholder="Search course code or title..."
                  value={searchTerm}
                  onFocus={() => setIsOpenDropdown(true)}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setIsOpenDropdown(true);
                  }}
                  className="w-full rounded-xl border border-line bg-panel py-3 pl-11 pr-4 text-[14px] font-medium text-content outline-none focus:border-route"
                />
              </div>

              {/* Suggestions Box */}
              {isOpenDropdown && (
                <div className="absolute left-0 right-0 z-20 mt-1 max-h-56 overflow-y-auto rounded-xl border border-line bg-panel shadow-xl">
                  {filteredCourses.length > 0 ? (
                    filteredCourses.map((item) => (
                      <button
                        type="button"
                        key={item.code}
                        onClick={() => handleSelectCourse(item.code)}
                        className="flex w-full flex-col px-4 py-2.5 text-left transition-colors hover:bg-line/40 border-b border-line/30 last:border-none"
                      >
                        <span className="text-[14px] font-bold text-content">
                          {item.code}
                        </span>
                        <span className="text-[12px] text-content-muted truncate">
                          {item.title}
                        </span>
                      </button>
                    ))
                  ) : (
                    <div className="px-4 py-3 text-center text-[13px] text-content-muted">
                      No matching courses found
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Selected Courses Chips */}
            {courses.length > 0 ? (
              <div className="mb-6 flex flex-wrap gap-2 max-h-32 overflow-y-auto p-1">
                {courses.map((c: string) => {
                  const match = allCourses.find((item) => item.code === c);
                  return (
                    <span
                      key={c}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-route/10 border border-route/20 px-3 py-1.5 text-[13px] font-medium text-route"
                    >
                      <Check className="h-3.5 w-3.5" />
                      {c} {match ? `(${match.title})` : ""}
                      <button
                        type="button"
                        onClick={() => removeCourse(c)}
                        className="ml-1 text-route/70 hover:text-red-500 transition-colors"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </span>
                  );
                })}
              </div>
            ) : (
              <div className="mb-6 rounded-xl border border-dashed border-line p-4 text-center text-[13px] text-content-muted">
                No courses selected yet. Use the search box above to add units.
              </div>
            )}

            <div className="mb-6">
              <label className="mb-2 block text-[13px] font-semibold text-content">
                Group / Cohort (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g., YEAR 2 GROUP A"
                value={inputGroup}
                onChange={(e) => setInputGroup(e.target.value)}
                className="w-full rounded-xl border border-line bg-panel px-4 py-3 text-[14px] font-medium text-content outline-none focus:border-route"
              />
            </div>

            <button
              type="button"
              onClick={handleGenerate}
              disabled={courses.length === 0}
              className="w-full rounded-xl bg-route py-3.5 font-bold text-white disabled:opacity-50 hover:bg-route/90 shadow-md shadow-route/20 transition-all active:scale-[0.98]"
            >
              Generate Timetable
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
