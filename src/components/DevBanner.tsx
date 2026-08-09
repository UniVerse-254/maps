import { HardHat } from "lucide-react";

export default function DevBanner() {
  return (
    <div className="flex w-full items-center justify-center gap-2 bg-yellow-500/10 px-4 py-2 text-center border-b border-yellow-500/20 backdrop-blur-md">
      <HardHat className="h-4 w-4 text-yellow-600 dark:text-yellow-500" />
      <span className="text-[12px] font-bold uppercase tracking-wider text-yellow-700 dark:text-yellow-400">
        Maps Subdomain — Active Development
      </span>
    </div>
  );
}
