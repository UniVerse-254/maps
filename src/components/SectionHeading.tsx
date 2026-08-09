export default function SectionHeading({
  eyebrow,
  title,
  action,
}: {
  eyebrow?: string;
  title: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-4 flex items-end justify-between px-1">
      <div className="flex flex-col gap-0.5">
        {eyebrow && (
          <span className="text-[11px] font-semibold uppercase tracking-wider text-content-muted">
            {eyebrow}
          </span>
        )}
        <h2 className="font-display text-xl font-bold tracking-tight text-content">
          {title}
        </h2>
      </div>

      {/* 
        If an action (like a "See All" button) is passed, 
        it will sit perfectly aligned to the baseline of the title 
      */}
      {action && <div className="mb-1">{action}</div>}
    </div>
  );
}
