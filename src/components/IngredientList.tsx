interface IngredientListProps {
  items: string[];
}

export default function IngredientList({ items }: IngredientListProps) {
  return (
    <div className="bg-surface-muted rounded-lg p-6">
      <p className="text-[10px] tracking-[0.2em] uppercase text-foreground-muted mb-3">
        Ingredients
      </p>
      <p className="text-xs tracking-[0.1em] uppercase text-foreground-muted leading-relaxed">
        {items.join(", ")}
      </p>
    </div>
  );
}
