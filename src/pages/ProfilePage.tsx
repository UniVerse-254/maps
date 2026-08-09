import { useState } from "react";
import SectionHeading from "@/components/SectionHeading";
import TopBar from "@/components/TopBar";
import { useProfile } from "@/hooks/useProfile";
import { useTimetable } from "@/hooks/useTimetable";
import {
  Mail,
  GraduationCap,
  BookOpen,
  CalendarDays,
  LogOut,
  Wifi,
  Check,
  Edit3,
} from "lucide-react";

export default function ProfilePage() {
  const { profile, updateProfileField } = useProfile();
  const { getSessionsForDay } = useTimetable();

  // Get today's sessions dynamically
  const todayName = new Date().toLocaleDateString("en-US", {
    weekday: "long",
  }) as any;
  const todaysSessions = getSessionsForDay(todayName);

  return (
    <div className="flex flex-col pb-8">
      <TopBar eyebrow="Your Account" title="Profile" right={<span />} />

      <div className="space-y-8 px-4 py-6">
        {/* Header Avatar Section */}
        <section className="flex items-center gap-4 px-2">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-route/10 font-display text-2xl font-bold text-route shadow-sm">
            {profile.name
              ? profile.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()
              : "U"}
          </div>
          <div className="min-w-0 flex-1 flex flex-col justify-center">
            <h2 className="truncate font-display text-2xl font-bold tracking-tight text-content leading-tight">
              {profile.name || "Unnamed Student"}
            </h2>
            <p className="truncate font-body text-[15px] font-medium text-content-muted mt-0.5">
              {profile.programme || "Tap fields below to complete profile"}
            </p>
          </div>
        </section>

        {/* User Details (Editable Inline List Style) */}
        <section className="overflow-hidden rounded-2xl border border-line/60 bg-panel shadow-sm divide-y divide-line/40">
          <EditableRow
            icon={Mail}
            label="School Email"
            value={profile.email}
            onChange={(val) => updateProfileField("email", val)}
            placeholder="Enter email address..."
          />
          <EditableRow
            icon={BookOpen}
            label="Home School"
            value={profile.school}
            onChange={(val) => updateProfileField("school", val)}
            placeholder="Enter home school/faculty..."
          />
          <EditableRow
            icon={GraduationCap}
            label="Programme"
            value={profile.programme}
            onChange={(val) => updateProfileField("programme", val)}
            placeholder="Enter course degree..."
          />
          <EditableRow
            icon={CalendarDays}
            label="Year of Study"
            value={profile.year}
            onChange={(val) => updateProfileField("year", val)}
            placeholder="Enter year (e.g. Year 3)..."
          />
        </section>

        {/* Timetable Section */}
        <section>
          <SectionHeading
            eyebrow="Connected"
            title={`Today's Timetable (${todayName})`}
          />
          <div className="overflow-hidden rounded-2xl border border-line/60 bg-panel shadow-sm divide-y divide-line/40">
            {todaysSessions.length > 0 ? (
              todaysSessions.map((t) => (
                <div
                  key={t.id}
                  className="flex items-center gap-3.5 px-4 py-3.5 transition-colors"
                >
                  <span className="w-24 shrink-0 text-[13px] font-medium text-content-muted">
                    {t.startTime} - {t.endTime}
                  </span>
                  <div className="min-w-0 flex-1 flex flex-col">
                    <div className="truncate font-body text-[15px] font-semibold text-content leading-tight">
                      {t.courseCode}: {t.courseTitle}
                    </div>
                    <div className="text-[13px] font-medium text-content-muted mt-0.5">
                      {t.roomId || "Virtual Session"}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="px-4 py-6 text-center text-[14px] text-content-muted">
                No classes scheduled for today. Enjoy your day off!
              </div>
            )}
          </div>
        </section>

        {/* App Settings */}
        <section className="overflow-hidden rounded-2xl border border-line/60 bg-panel shadow-sm divide-y divide-line/40">
          <div className="flex items-center justify-between px-4 py-3.5">
            <div className="flex items-center gap-3 text-[15px] font-medium text-content">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-route/10 text-route">
                <Wifi className="h-4 w-4" strokeWidth={2.5} />
              </div>
              Offline Cache
            </div>
            <span className="text-[15px] font-medium text-route">Enabled</span>
          </div>
        </section>

        {/* Sign Out Button
        <button className="flex w-full items-center justify-center gap-2 rounded-2xl bg-panel py-3.5 text-[15px] font-semibold text-red-500 shadow-sm transition-all duration-200 active:scale-[0.98] active:opacity-70">
          <LogOut className="h-5 w-5" strokeWidth={2.5} />
          Sign Out
        </button> */}
      </div>
    </div>
  );
}

/**
 * Modern inline-editable row component
 */
function EditableRow({
  icon: Icon,
  label,
  value,
  onChange,
  placeholder,
}: {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  value: string;
  onChange: (val: string) => void;
  placeholder: string;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(value);

  const handleSave = () => {
    setIsEditing(false);
    onChange(text);
  };

  return (
    <div className="flex items-center gap-4 px-4 py-3">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-line/30 text-content-muted">
        <Icon className="h-4.5 w-4.5" strokeWidth={2} />
      </div>
      <div className="min-w-0 flex-1 flex flex-col justify-center">
        <div className="text-[12px] font-medium text-content-muted leading-tight">
          {label}
        </div>
        {isEditing ? (
          <input
            type="text"
            autoFocus
            value={text}
            onChange={(e) => setText(e.target.value)}
            onBlur={handleSave}
            onKeyDown={(e) => e.key === "Enter" && handleSave()}
            placeholder={placeholder}
            className="w-full bg-transparent font-semibold text-[15px] text-content outline-none border-b border-route py-0.5"
          />
        ) : (
          <div
            onClick={() => setIsEditing(true)}
            className="group flex items-center justify-between cursor-pointer py-0.5"
          >
            <span
              className={`truncate text-[15px] font-semibold ${value ? "text-content" : "text-content-muted italic"}`}
            >
              {value || placeholder}
            </span>
            <Edit3 className="h-3.5 w-3.5 text-content-muted opacity-0 group-hover:opacity-150 transition-opacity shrink-0 ml-2" />
          </div>
        )}
      </div>
    </div>
  );
}
