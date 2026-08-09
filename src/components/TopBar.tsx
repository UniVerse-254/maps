import { ChevronLeft, Bell } from "lucide-react";

export default function TopBar({
  title,
  eyebrow,
  onBack,
  right,
}: {
  title: string;
  eyebrow?: string;
  onBack?: () => void;
  right?: React.ReactNode;
}) {
  return (
    <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-line/60 bg-base/80 px-4 py-3 backdrop-blur-xl transition-colors">
      {onBack ? (
        <button
          onClick={onBack}
          aria-label="Go back"
          // Native iOS back buttons are borderless, accent-colored, with a simple opacity fade on tap
          className="-ml-2 flex h-9 shrink-0 items-center justify-center text-route transition-opacity active:opacity-50"
        >
          <ChevronLeft className="h-7 w-7" strokeWidth={2.5} />
        </button>
      ) : (
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-route font-display text-lg font-bold text-white shadow-sm">
          C
        </div>
      )}

      <div className="min-w-0 flex-1 flex flex-col justify-center">
        {eyebrow && (
          // Dropped uppercase monospace for a standard native sub-label
          <div className="text-[12px] font-medium text-content-muted leading-tight mb-0.5">
            {eyebrow}
          </div>
        )}
        <h1 className="truncate font-display text-[17px] font-semibold tracking-tight text-content leading-tight">
          {title}
        </h1>
      </div>

      {right ?? (
        <button
          aria-label="Notifications"
          // Apple's secondary action buttons use a soft translucent background instead of a hard outline
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-line/40 text-content transition-colors hover:bg-line/60 active:scale-95"
        >
          <Bell className="h-5 w-5" strokeWidth={2} />
        </button>
      )}
    </header>
  );
}
