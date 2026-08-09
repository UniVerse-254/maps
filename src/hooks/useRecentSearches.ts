import { useLocalStorage } from "./useLocalStorage";

const MAX_SEARCHES = 10;

export function useRecentSearches() {
  const [searches, setSearches] = useLocalStorage<string[]>(
    "campus_recent_searches",
    [],
  );

  const addSearch = (query: string) => {
    const trimmed = query.trim();
    if (!trimmed) return;

    setSearches((prev) => {
      // Remove duplicate if it exists to bump it to the top
      const filtered = prev.filter(
        (s) => s.toLowerCase() !== trimmed.toLowerCase(),
      );
      // Insert at front and cap the array
      return [trimmed, ...filtered].slice(0, MAX_SEARCHES);
    });
  };

  const clearSearches = () => setSearches([]);

  return { searches, addSearch, clearSearches };
}
