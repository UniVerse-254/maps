import { phases } from "@/data/phases";
import type { PhaseId } from "@/types";

export default function PhaseTag({ phase }: { phase: PhaseId }) {
  const phaseData = phases[phase];

  if (!phaseData) return null;

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-line/60 bg-panel px-2.5 py-1 text-[12px] font-medium tracking-wide text-content-muted shadow-sm transition-colors">
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{ backgroundColor: phaseData.color }}
      />
      {phaseData.label}
    </span>
  );
}
