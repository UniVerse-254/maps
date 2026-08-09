import { NavLink } from "react-router-dom";
import { Home, Search, DoorOpen, User, ArrowUpRight } from "lucide-react";
import { GithubIcon } from "./ui/github";

const NAV_ITEMS = [
  { id: "home", path: "/", label: "Home", icon: Home },
  { id: "search", path: "/search", label: "Search", icon: Search },
  {
    id: "available",
    path: "/available",
    label: "Available Rooms",
    icon: DoorOpen,
  },
  { id: "profile", path: "/profile", label: "Profile", icon: User },
];

export default function Sidebar() {
  return (
    <div className="flex h-full w-full flex-col p-4">
      {/* App Branding / Logo area */}
      <div className="mb-10 flex items-center gap-3 px-3 pt-2">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-panel shadow-sm border border-line/60">
          <img
            src="/logo.svg"
            alt="CampusLink Logo"
            className="h-6 w-6 object-contain"
          />
        </div>
        <div className="flex flex-col justify-center">
          <span className="font-display text-lg font-bold tracking-tight text-content leading-none mb-1">
            CampusLink
          </span>
          <span className="text-[11px] font-bold uppercase tracking-widest text-route leading-none">
            Maps
          </span>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 space-y-2">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.id}
            to={item.path}
            // 'end' ensures the Home ('/') route doesn't stay active when on '/search'
            end={item.path === "/"}
            className={({ isActive }) =>
              `group flex items-center gap-3.5 rounded-xl px-4 py-3.5 transition-all duration-200 active:scale-[0.98] ${
                isActive
                  ? "bg-route text-white shadow-md shadow-route/20"
                  : "text-content-muted hover:bg-line/40 hover:text-content"
              }`
            }
          >
            {({ isActive }) => {
              const Icon = item.icon;
              return (
                <>
                  <Icon
                    className="h-5 w-5 shrink-0 transition-transform group-hover:scale-105"
                    strokeWidth={isActive ? 2.5 : 2}
                  />
                  <span
                    className={`text-[15px] tracking-wide ${
                      isActive ? "font-semibold" : "font-medium"
                    }`}
                  >
                    {item.label}
                  </span>
                </>
              );
            }}
          </NavLink>
        ))}
      </nav>

      {/* Footer Ecosystem & Open Source Links */}
      <div className="mt-auto flex flex-col gap-4">
        <a
          href="https://campuslink.online"
          className="group flex items-center justify-between rounded-xl border border-line/60 bg-panel px-4 py-3.5 shadow-sm transition-all hover:border-route hover:shadow-md active:scale-[0.98]"
        >
          <div className="flex flex-col">
            <span className="text-[13px] font-bold text-content">
              Food & Utilities
            </span>
            <span className="text-[11px] font-medium text-content-muted mt-0.5">
              Return to main app
            </span>
          </div>
          <ArrowUpRight className="h-4 w-4 text-content-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-route" />
        </a>

        <div className="flex items-center justify-between px-1 text-[11px] font-medium text-content-muted">
          <span>v0.0.1-alpha</span>

          <a
            href="https://github.com/UniVerse-254/maps"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 transition-colors hover:text-content"
            title="Contribute on GitHub"
          >
            <GithubIcon className="h-3.5 w-3.5" />
            <span>Contribute</span>
          </a>
        </div>
      </div>
    </div>
  );
}
