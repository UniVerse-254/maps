import { useEffect } from "react";
import { useGetMeQuery } from "@/lib/auth.query";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import type { ReactNode } from "react";

const IS_DEV = import.meta.env.DEV;

const DUMMY_USER = {
  id: "ghost",
  name: "Ghost Hunter",
  email: "ghost.hunter@strathmore.edu",
  role: "student",
};

function hasAuthenticatedBefore(): boolean {
  try {
    const raw = localStorage.getItem("campus_user_profile");
    if (!raw) return false;
    const parsed = JSON.parse(raw);
    return Boolean(parsed?.email);
  } catch {
    return false;
  }
}

function Spinner({ label }: { label: string }) {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-base">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-line border-t-route"></div>
      <p className="mt-4 text-[14px] font-medium text-content-muted">{label}</p>
    </div>
  );
}

function OfflineUnverifiedScreen() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-3 bg-base px-8 text-center">
      <p className="text-[15px] font-semibold text-content">You're offline</p>
      <p className="max-w-xs text-[13px] font-medium text-content-muted">
        We can't verify your login without a connection yet. Connect once to
        sign in, then you're set for the rest of the semester.
      </p>
      <button
        onClick={() => window.location.reload()}
        className="mt-2 rounded-xl bg-route px-5 py-2.5 text-[14px] font-semibold text-white transition-transform active:scale-[0.97]"
      >
        Try Again
      </button>
    </div>
  );
}

export default function AuthGuard({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (IS_DEV) {
      queryClient.setQueryData(["me"], DUMMY_USER);
    }
  }, [queryClient]);

  if (IS_DEV) {
    return <>{children}</>;
  }

  const { data: user, isLoading, error } = useGetMeQuery();

  if (isLoading) {
    return <Spinner label="Syncing CampusLink profile..." />;
  }

  const isUnauthorized =
    axios.isAxiosError(error) && error.response?.status === 401;

  if (isUnauthorized) {
    return <Spinner label="Redirecting to sign in..." />;
  }

  if (error) {
    if (hasAuthenticatedBefore()) {
      return <>{children}</>;
    }
    return <OfflineUnverifiedScreen />;
  }

  if (!user) {
    return <Spinner label="Syncing CampusLink profile..." />;
  }

  return <>{children}</>;
}
