import { NavLink } from "react-router-dom";
import { Home, Search, DoorOpen, User, Map } from "lucide-react";

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
      <div className="mb-8 flex items-center gap-3 px-3 pt-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-route text-white shadow-sm">
          <Map className="h-5 w-5" strokeWidth={2.5} />
        </div>
        <span className="font-display text-lg font-bold tracking-tight text-content">
          Campus Map
        </span>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 space-y-1.5">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.id}
            to={item.path}
            // 'end' ensures the Home ('/') route doesn't stay active when on '/search'
            end={item.path === "/"}
            className={({ isActive }) =>
              `group flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-200 active:scale-[0.98] ${
                isActive
                  ? "bg-route text-white shadow-sm"
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

      {/* Optional Footer Space (for versioning or settings) */}
      <div className="mt-auto px-3 pb-2 text-[11px] font-medium uppercase tracking-wider text-content-muted/50">
        University Directory
      </div>
    </div>
  );
}
