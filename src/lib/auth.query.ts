import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { GetCurrentUser } from "./auth.service";

interface CurrentUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

export const useGetMeQuery = () => {
  return useQuery<CurrentUser, AxiosError>({
    queryKey: ["me"],
    queryFn: GetCurrentUser,
    enabled: !import.meta.env.DEV, // Disable the query in development mode
    retry: false, // Fail immediately on 401 so the interceptor can redirect
    staleTime: 1000 * 60 * 5, // Cache the user profile for 5 minutes
  });
};
