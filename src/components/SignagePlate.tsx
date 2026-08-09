import { ChevronRight } from "lucide-react";
import type { PhaseId } from "@/types";
import { phases } from "@/data/phases";

export default function SignagePlate({
  phase = "phase1",
  code,
  label,
  sub,
  size = "md",
  onClick,
  arrow = true,
}: {
  phase?: PhaseId;
  code: string;
  label: string;
  sub?: string;
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  arrow?: boolean;
}) {
  const phaseColor = phases[phase]?.color ?? "#007AFF";

  const sizes = {
    sm: { pad: "p-3", code: "text-xl", label: "text-[11px]" },
    md: { pad: "p-4", code: "text-2xl", label: "text-[13px]" },
    lg: { pad: "p-5", code: "text-4xl", label: "text-sm" },
  }[size];

  const Comp = onClick ? "button" : "div";

  return (
    <Comp
      onClick={onClick}
      className={`group relative flex w-full items-center gap-4 overflow-hidden rounded-2xl border border-line/60 bg-panel text-left text-content shadow-sm transition-all duration-200 ${
        onClick
          ? "cursor-pointer hover:border-line hover:shadow-md active:scale-[0.98]"
          : ""
      } ${sizes.pad}`}
    >
      <span
        className="absolute left-0 top-0 h-full w-1.5 rounded-l-2xl"
        style={{ backgroundColor: phaseColor }}
        aria-hidden="true"
      />

      <div className="flex flex-1 items-center gap-3.5 pl-2">
        <span className={`font-display font-bold tracking-tight ${sizes.code}`}>
          {code}
        </span>
        <div className="min-w-0 flex flex-col justify-center">
          <div className="truncate font-body font-semibold leading-tight">
            {label}
          </div>
          {sub && (
            <div
              className={`truncate font-body font-medium text-content-muted mt-0.5 ${sizes.label}`}
            >
              {sub}
            </div>
          )}
        </div>
      </div>

      {arrow && (
        <ChevronRight
          className="h-5 w-5 shrink-0 text-content-muted/50 transition-transform group-hover:translate-x-0.5"
          strokeWidth={2.5}
        />
      )}
    </Comp>
  );
}
