import SectionHeading from "@/components/SectionHeading";
import TopBar from "@/components/TopBar";
import { profile, timetable } from "@/data/mockData";
import {
  Mail,
  GraduationCap,
  BookOpen,
  CalendarDays,
  LogOut,
  Wifi,
} from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="flex flex-col pb-8">
      <TopBar eyebrow="Your Account" title="Profile" right={<span />} />

      <div className="space-y-8 px-4 py-6">
        {/* Header Avatar Section */}
        <section className="flex items-center gap-4 px-2">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-route-soft font-display text-2xl font-bold text-route shadow-sm">
            {profile.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
          <div className="min-w-0 flex-1 flex flex-col justify-center">
            <h2 className="truncate font-display text-2xl font-bold tracking-tight text-content leading-tight">
              {profile.name}
            </h2>
            <p className="truncate font-body text-[15px] font-medium text-content-muted mt-0.5">
              {profile.programme}
            </p>
          </div>
        </section>

        {/* User Details (iOS Grouped List Style) */}
        <section className="overflow-hidden rounded-2xl border border-line/60 bg-panel shadow-sm divide-y divide-line/40">
          <InfoRow icon={Mail} label="School Email" value={profile.email} />
          <InfoRow icon={BookOpen} label="Home School" value={profile.school} />
          <InfoRow
            icon={GraduationCap}
            label="Programme"
            value={profile.programme}
          />
          <InfoRow
            icon={CalendarDays}
            label="Year of Study"
            value={profile.year}
          />
        </section>

        {/* Timetable Section */}
        <section>
          <SectionHeading eyebrow="Connected" title="Today's Timetable" />
          <div className="overflow-hidden rounded-2xl border border-line/60 bg-panel shadow-sm divide-y divide-line/40">
            {timetable.map((t) => (
              <div
                key={t.time}
                className={`flex items-center gap-3.5 px-4 py-3.5 transition-colors ${
                  t.active ? "bg-route/5" : ""
                }`}
              >
                <span className="w-24 shrink-0 text-[13px] font-medium text-content-muted">
                  {t.time}
                </span>
                <div className="min-w-0 flex-1 flex flex-col">
                  <div
                    className={`truncate font-body text-[15px] leading-tight ${t.active ? "font-bold text-route" : "font-semibold text-content"}`}
                  >
                    {t.course}
                  </div>
                  <div className="text-[13px] font-medium text-content-muted mt-0.5">
                    {t.building} · {t.room}
                  </div>
                </div>
                {t.active && (
                  <span className="shrink-0 rounded-full bg-route px-2.5 py-1 text-[11px] font-semibold tracking-wide text-white shadow-sm">
                    Now
                  </span>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* App Settings */}
        <section className="overflow-hidden rounded-2xl border border-line/60 bg-panel shadow-sm divide-y divide-line/40">
          <div className="flex items-center justify-between px-4 py-3.5">
            <div className="flex items-center gap-3 text-[15px] font-medium text-content">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-route-soft text-route">
                <Wifi className="h-4 w-4" strokeWidth={2.5} />
              </div>
              Offline Cache
            </div>
            {/* iOS-style fake toggle visually represented */}
            <span className="text-[15px] font-medium text-content-muted">
              Enabled
            </span>
          </div>
        </section>

        {/* Sign Out Button (Destructive action style) */}
        <button className="flex w-full items-center justify-center gap-2 rounded-2xl bg-panel py-3.5 text-[15px] font-semibold text-red-500 shadow-sm transition-all duration-200 active:scale-[0.98] active:opacity-70">
          <LogOut className="h-5 w-5" strokeWidth={2.5} />
          Sign Out
        </button>
      </div>
    </div>
  );
}

/**
 * Modern iOS Settings-style list row
 */
function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-4 px-4 py-3">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-line/30 text-content-muted">
        <Icon className="h-4.5 w-4.5" strokeWidth={2} />
      </div>
      <div className="min-w-0 flex-1 flex flex-col">
        <div className="text-[12px] font-medium text-content-muted leading-tight">
          {label}
        </div>
        <div className="truncate text-[15px] font-semibold text-content leading-snug">
          {value}
        </div>
      </div>
    </div>
  );
}
