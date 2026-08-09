import { useGetMeQuery } from "@/lib/auth.query";
import { useQueryClient } from "@tanstack/react-query";
import type { ReactNode } from "react";

const IS_DEV = import.meta.env.DEV;

const DUMMY_USER = {
  id: "ghost",
  name: "Ghost Hunter",
  email: "ghost.hunter@strathmore.edu",
  role: "student",
};

export default function AuthGuard({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();

  if (IS_DEV) {
    queryClient.setQueryData(["me"], DUMMY_USER);
  }

  const { data: user, isLoading, isError } = useGetMeQuery();

  if (IS_DEV) {
    return <>{children}</>;
  }

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

  if (isError || !user) {
    return null;
  }

  return <>{children}</>;
}
