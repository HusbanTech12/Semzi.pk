import { cn } from "@/lib/utils";

interface PriceDisplayProps {
  priceCents: number;
  compareAtCents?: number;
  className?: string;
}

const formatPrice = (cents: number) =>
  `PKR ${(cents / 100).toLocaleString("en-PK")}`;

export default function PriceDisplay({ priceCents, compareAtCents, className }: PriceDisplayProps) {
  const price = formatPrice(priceCents);
  const comparePrice = compareAtCents ? formatPrice(compareAtCents) : undefined;

  return (
    <div className={cn("flex items-center gap-2 font-mono", className)}>
      <span className={cn("text-sm font-medium", comparePrice && "text-destructive")}>{price}</span>
      {comparePrice && (
        <span className="text-xs text-foreground-muted/50 line-through">{comparePrice}</span>
      )}
    </div>
  );
}
