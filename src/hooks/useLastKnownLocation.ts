import { useLocalStorage } from "./useLocalStorage";

type Coordinates = { lat: number; lng: number } | null;

export function useLastKnownLocation() {
  const [location, setLocation] = useLocalStorage<Coordinates>(
    "campus_last_location",
    null,
  );

  const updateLocation = (lat: number, lng: number) => {
    setLocation({ lat, lng });
  };

  return { location, updateLocation };
}
