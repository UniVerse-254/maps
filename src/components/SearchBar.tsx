import { Search, X } from "lucide-react";

export default function SearchBar({
  value,
  onChange,
  placeholder = "Search buildings, rooms…",
  autoFocus,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
}) {
  return (
    <div className="flex items-center gap-2.5 rounded-xl border border-line/50 bg-panel px-4 py-2.5 shadow-sm transition-all focus-within:border-route focus-within:ring-4 focus-within:ring-route-soft">
      <Search className="h-5 w-5 shrink-0 text-content-muted" strokeWidth={2} />

      <input
        autoFocus={autoFocus}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent font-body text-[17px] text-content placeholder:text-content-muted focus:outline-none"
      />

      {value && (
        <button
          onClick={() => onChange("")}
          aria-label="Clear search"
          className="shrink-0 rounded-full bg-line/60 p-1 text-content-muted transition-colors hover:bg-line hover:text-content active:scale-95"
        >
          <X className="h-3.5 w-3.5" strokeWidth={3} />
        </button>
      )}
    </div>
  );
}
