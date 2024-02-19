import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="pt-8 p-4">
      <div className="border rounded-lg p-3 w-full">
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-24 w-full mt-4" />
        <div className="flex gap-2 mt-3">
          <Skeleton className="h-6 w-14 rounded-full" />
          <Skeleton className="h-6 w-14 rounded-full" />
        </div>
      </div>

      <div className="mt-6 p-3 border rounded-lg">
        <Skeleton className="h-16 w-full" />
        <div className="flex justify-end mt-3">
          <Skeleton className="h-6 w-14 rounded-full" />
        </div>
      </div>

      <div className="mt-6">
        <Skeleton className="h-16 w-full" />
        <Skeleton className="h-16 w-full mt-4" />
        <Skeleton className="h-16 w-full mt-4" />
      </div>
    </div>
  );
}
