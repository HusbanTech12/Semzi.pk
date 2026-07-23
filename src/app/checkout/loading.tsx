import { Skeleton } from "@/components/ui/skeleton";

export default function CheckoutLoading() {
  return (
    <div className="pt-20 max-w-7xl mx-auto px-6 lg:px-8 py-8">
      <Skeleton className="h-4 w-24 mb-8" />
      <div className="flex justify-center gap-2 mb-12">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center gap-2">
            <Skeleton className="w-8 h-8 rounded-full" />
            <Skeleton className="h-4 w-20 hidden sm:block" />
          </div>
        ))}
      </div>
      <div className="grid lg:grid-cols-5 gap-12">
        <div className="lg:col-span-3 space-y-6">
          <Skeleton className="h-8 w-32" />
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-12 w-full rounded-lg" />
          ))}
        </div>
        <div className="lg:col-span-2">
          <Skeleton className="h-64 w-full rounded-lg" />
        </div>
      </div>
    </div>
  );
}
