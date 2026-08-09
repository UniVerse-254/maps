import { Link } from "react-router-dom";
import { Home, Search, DoorOpen, User } from "lucide-react";

// We add a 'path' property to map the UI tab to the actual router URL
const TABS = [
  { id: "home", path: "/", label: "Home", icon: Home },
  { id: "search", path: "/search", label: "Search", icon: Search },
  { id: "available", path: "/available", label: "Available", icon: DoorOpen },
  { id: "profile", path: "/profile", label: "Profile", icon: User },
];

export default function BottomNav({ active }: { active: string }) {
  return (
    <nav className="w-full px-2 pt-2 pb-1">
      <ul className="mx-auto flex max-w-md items-center justify-between">
        {TABS.map((tab) => {
          const isActive = active === tab.id;
          const Icon = tab.icon;

          return (
            <li key={tab.id} className="flex-1">
              <Link
                to={tab.path}
                // active:scale-95 adds a subtle "squish" effect when the user taps the icon
                className={`flex w-full flex-col items-center gap-1 py-1 transition-all duration-200 active:scale-95 ${
                  isActive
                    ? "text-route"
                    : "text-content-muted hover:text-content"
                }`}
              >
                <Icon
                  className="h-6 w-6 transition-all duration-200"
                  // Apple standard: active icons have a slightly heavier visual weight
                  strokeWidth={isActive ? 2.5 : 2}
                />
                <span
                  className={`text-[10px] tracking-wide transition-all duration-200 ${
                    isActive
                      ? "font-semibold text-route"
                      : "font-medium text-content-muted"
                  }`}
                >
                  {tab.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
