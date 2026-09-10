import { cn } from "@/lib/utils";

export default function BrandLoader({
  className,
  label = "Loading Semzi",
}: {
  className?: string;
  label?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-center bg-background",
        className
      )}
      role="status"
      aria-live="polite"
      aria-label={label}
    >
      <div className="flex flex-col items-center gap-7">
        <p className="font-serif text-4xl italic font-bold tracking-tight text-foreground">
          Semzi
        </p>
        <div className="relative h-14 w-14">
          <span className="absolute inset-0 rounded-full border border-accent/25 motion-safe:animate-[soap-ripple_1.8s_ease-out_infinite]" />
          <span className="absolute inset-0 rounded-full border border-accent/20 motion-safe:animate-[soap-ripple_1.8s_ease-out_infinite] motion-safe:[animation-delay:0.55s]" />
          <span className="absolute inset-[18px] rounded-full bg-accent" />
        </div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-foreground-muted">
          Preparing
        </p>
        <span className="sr-only">{label}</span>
      </div>
    </div>
  );
}
