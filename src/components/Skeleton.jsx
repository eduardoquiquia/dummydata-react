import { cn } from "../lib/utils";

export function Skeleton({ className, ...props }) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-ink-muted", className)}
      {...props}
    />
  );
}

export function ProductSkeleton() {
  return (
    <div className="rounded-xl border border-border bg-ink-muted overflow-hidden">
      <Skeleton className="aspect-square w-full rounded-none" />
      <div className="p-5 space-y-3">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <div className="flex justify-between pt-2">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-4 w-12" />
        </div>
      </div>
    </div>
  );
}
