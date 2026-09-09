import { Skeleton } from "@/components/ui/skeleton";
import ProductCardSkeleton from "@/components/ProductCardSkeleton";

export default function FeaturedProductsFallback() {
  return (
    <section className="bg-background py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 flex flex-col items-center gap-3">
          <Skeleton className="h-3 w-28" />
          <Skeleton className="h-9 w-56" />
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
