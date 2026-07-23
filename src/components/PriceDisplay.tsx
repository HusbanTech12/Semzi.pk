import { cn } from "@/lib/utils";

interface PriceDisplayProps {
  priceCents: number;
  compareAtCents?: number;
  className?: string;
}

export default function PriceDisplay({ priceCents, compareAtCents, className }: PriceDisplayProps) {
  const price = `$${(priceCents / 100).toFixed(0)}`;
  const comparePrice = compareAtCents ? `$${(compareAtCents / 100).toFixed(0)}` : undefined;

  return (
    <div className={cn("flex items-center gap-2 font-mono", className)}>
      <span className={cn(comparePrice && "text-destructive")}>{price}</span>
      {comparePrice && (
        <span className="text-sm text-foreground-muted line-through">{comparePrice}</span>
      )}
    </div>
  );
}
