import { useLocalStorage } from "./useLocalStorage";

export function useFavoriteRooms() {
  const [favorites, setFavorites] = useLocalStorage<string[]>(
    "campus_fav_rooms",
    [],
  );

  const toggleFavorite = (roomId: string) => {
    setFavorites((prev) =>
      prev.includes(roomId)
        ? prev.filter((id) => id !== roomId)
        : [...prev, roomId],
    );
  };

  const isFavorite = (roomId: string) => favorites.includes(roomId);

  return { favorites, toggleFavorite, isFavorite };
}
