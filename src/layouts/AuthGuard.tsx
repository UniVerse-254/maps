import { useGetMeQuery } from "@/lib/auth.query";
import type { ReactNode } from "react";

export default function AuthGuard({ children }: { children: ReactNode }) {
  const { data: user, isLoading, isError } = useGetMeQuery();

  if (isLoading) {
    return (
      <div className="flex h-screen w-screen flex-col items-center justify-center bg-base">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-line border-t-route"></div>
        <p className="mt-4 text-[14px] font-medium text-content-muted">
          Syncing CampusLink profile...
        </p>
      </div>
    );
  }

  // If there's an error (like a 401), the Axios interceptor takes over
  // and redirects the window to campuslink.online. We return null to prevent flashes.
  if (isError || !user) {
    return null;
  }

  // User is authenticated, render the main app layout
  return <>{children}</>;
}
