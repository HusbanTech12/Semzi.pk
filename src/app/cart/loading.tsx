import { Skeleton } from "@/components/ui/skeleton";

export default function CartLoading() {
  return (
    <div className="pt-20 max-w-7xl mx-auto px-6 lg:px-8 py-8">
      <Skeleton className="h-8 w-24 mb-8" />
      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex gap-6 p-4 border border-border rounded-lg">
              <Skeleton className="w-24 h-24 rounded-lg shrink-0" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-8 w-28" />
              </div>
            </div>
          ))}
        </div>
        <div className="lg:col-span-1">
          <Skeleton className="h-48 w-full rounded-lg" />
        </div>
      </div>
    </div>
  );
}
