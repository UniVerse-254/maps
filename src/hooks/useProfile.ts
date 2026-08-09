import { useLocalStorage } from "./useLocalStorage";
import { useGetMeQuery } from "@/lib/auth.query";
import { useEffect } from "react";
import type { Profile } from "@/types";

const EMPTY_PROFILE: Profile = {
  name: "",
  email: "",
  school: "",
  programme: "",
  year: "",
};

export function useProfile() {
  const { data: user } = useGetMeQuery();

  const [profile, setProfile] = useLocalStorage<Profile>(
    "campus_user_profile",
    EMPTY_PROFILE,
  );

  useEffect(() => {
    if (user) {
      setProfile((prev) => ({
        ...prev,
        name: prev.name || user.name || "",
        email: prev.email || user.email || "",
      }));
    }
  }, [user]);

  const updateProfileField = (field: keyof Profile, value: string) => {
    setProfile((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return { profile, updateProfileField };
}
