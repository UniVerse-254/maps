import { useNavigate } from "react-router-dom";
import { Clock, ChevronRight, Star, History, MapPin } from "lucide-react";
import TopBar from "@/components/TopBar";
import SectionHeading from "@/components/SectionHeading";
import SearchBar from "@/components/SearchBar";
import { favourites, nextClass, recentSearches } from "@/data/mockData";
import { buildings } from "@/data/buildings";
import { useGetMeQuery } from "@/lib/auth.query";

export default function HomePage() {
  const navigate = useNavigate();

  // Pull the authenticated user directly from the React Query cache.
  // Since AuthGuard handles the loading state, this resolves instantly.
  const { data: user } = useGetMeQuery();

  // Fallback just in case the backend returns a user without a name field
  const displayName = user?.name || user?.email || "Student";

  return (
    <div className="flex flex-col pb-8">
      <TopBar eyebrow="Good morning" title={displayName} />

      <div className="space-y-8 px-4 py-6">
        {/* Hero Widget: Next Class */}
        {nextClass && (
          <section>
            <SectionHeading
              eyebrow="I have somewhere to be"
              title="Your next class"
            />
            <div className="overflow-hidden rounded-[1.5rem] bg-route text-white shadow-md">
              <div className="flex items-center justify-between px-5 pt-5">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-2.5 py-1 text-[12px] font-semibold tracking-wide backdrop-blur-md">
                  <Clock className="h-3.5 w-3.5" />
                  Starts in {nextClass.startsInMinutes} min
                </span>
                <span className="text-[13px] font-medium text-white/80">
                  {nextClass.time}
                </span>
              </div>

              <div className="flex flex-col justify-center px-5 pb-4 pt-3">
                <div className="font-display text-[22px] font-bold leading-tight tracking-tight">
                  {nextClass.course}
                </div>
                <div className="mt-0.5 text-[15px] font-medium text-white/80">
                  {nextClass.lecturer}
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-white/10 bg-white/5 px-5 py-4 backdrop-blur-sm">
                <div className="flex flex-col">
                  <span className="font-display text-3xl font-bold tracking-tight">
                    {nextClass.room}
                  </span>
                  <span className="text-[13px] font-medium text-white/70">
                    {nextClass.building} · {nextClass.floor}
                  </span>
                </div>
                <button
                  onClick={() => navigate(`/navigate/${nextClass.room}`)}
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-route shadow-sm transition-transform active:scale-90"
                  aria-label="Navigate to class"
                >
                  <ChevronRight className="h-6 w-6" strokeWidth={3} />
                </button>
              </div>
            </div>
          </section>
        )}

        {/* Universal Search (Acts as a trigger) */}
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
        {recentSearches?.length > 0 && (
          <section>
            <SectionHeading
              eyebrow="Pick up where you left off"
              title="Recent searches"
              action={<History className="h-5 w-5 text-content-muted/50" />}
            />
            <div className="flex flex-wrap gap-2.5">
              {recentSearches.map((r) => (
                <button
                  key={r}
                  onClick={() => navigate("/search")}
                  className="rounded-full border border-line/60 bg-panel px-4 py-2 text-[14px] font-medium text-content-muted shadow-sm transition-colors hover:border-line hover:text-content active:scale-95"
                >
                  {r}
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Favourites */}
        {favourites?.length > 0 && (
          <section>
            <SectionHeading
              eyebrow="Bookmarked"
              title="Favourite locations"
              action={
                <Star className="h-5 w-5 text-yellow-500" fill="currentColor" />
              }
            />
            <div className="space-y-3">
              {favourites.map((f) => (
                <button
                  key={f.id}
                  onClick={() => {
                    const targetId =
                      buildings.find((b) => b.id === f.id)?.id ??
                      buildings[0]?.id;
                    navigate(`/building/${targetId}`);
                  }}
                  className="group flex w-full items-center gap-3.5 rounded-2xl border border-line/60 bg-panel px-4 py-3 text-left shadow-sm transition-all duration-200 hover:border-line hover:shadow-md active:scale-[0.98]"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-500 dark:bg-red-500/15 dark:text-red-400">
                    <MapPin className="h-5 w-5" strokeWidth={2.5} />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col justify-center">
                    <div className="truncate font-body text-[15px] font-semibold text-content">
                      {f.label}
                    </div>
                    <div className="truncate text-[13px] font-medium text-content-muted">
                      {f.sub}
                    </div>
                  </div>
                  <ChevronRight className="h-4.5 w-4.5 shrink-0 text-content-muted/50 transition-transform group-hover:translate-x-0.5" />
                </button>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
