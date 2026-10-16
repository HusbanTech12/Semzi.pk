import { Skeleton } from "@/components/ui/skeleton";
import ProductCardSkeleton from "@/components/ProductCardSkeleton";

export default function FeaturedProductsFallback() {
  return (
    <section className="bg-surface-muted/40 py-24 lg:py-28">
      <div className="mx-auto max-w-[92rem] px-5 sm:px-8 lg:px-10">
        <div className="mb-14 flex flex-col items-center gap-3 sm:mb-16">
          <Skeleton className="h-3 w-28" />
          <Skeleton className="h-9 w-56" />
        </div>
        <div className="mx-auto grid max-w-[84rem] grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-7 lg:grid-cols-4 lg:gap-8">
          {[1, 2, 3, 4].map((i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
