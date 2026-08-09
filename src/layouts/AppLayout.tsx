import BottomNav from "@/components/BottomNav";
import DevBanner from "@/components/DevBanner";
import Sidebar from "@/components/Sidebar";
import { Outlet, useLocation } from "react-router-dom";

export default function AppLayout() {
  const location = useLocation();
  const currentPath = location.pathname.split("/")[1] || "home";

  return (
    <div className="flex h-screen w-full flex-col md:flex-row bg-base bg-texture text-content overflow-hidden">
      <aside className="hidden md:flex md:w-72 md:flex-col md:border-r md:border-line md:bg-panel/80 md:backdrop-blur-xl transition-colors duration-300">
        <Sidebar />
      </aside>

      <main className="flex-1 overflow-y-auto scroll-smooth relative">
        {/* <DevBanner /> */}
        <Outlet />
      </main>

      <div className="md:hidden border-t border-line bg-panel/80 backdrop-blur-xl pb-safe transition-colors duration-300">
        <BottomNav active={currentPath} />
      </div>
    </div>
  );
}
