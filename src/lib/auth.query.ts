import { useQuery } from "@tanstack/react-query";
import { GetCurrentUser } from "./auth.service";

export const useGetMeQuery = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: GetCurrentUser,
    enabled: !import.meta.env.DEV, // Disable the query in development mode
    retry: false, // Fail immediately on 401 so the interceptor can redirect
    staleTime: 1000 * 60 * 5, // Cache the user profile for 5 minutes
  });
};
