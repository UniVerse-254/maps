export default function StatusPill({ status }: { status: string }) {
  const isFree = status === "free";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[12px] font-medium tracking-wide transition-colors ${
        isFree
          ? "bg-green-100/80 text-green-700 dark:bg-green-500/15 dark:text-green-400"
          : "bg-red-100/80 text-red-700 dark:bg-red-500/15 dark:text-red-400"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          isFree
            ? "bg-green-500 dark:bg-green-400"
            : "bg-red-500 dark:bg-red-400"
        }`}
      />
      {isFree ? "Available" : "Occupied"}
    </span>
  );
}
