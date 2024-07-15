export default function ArrivalSkeleton() {
  return (
    <div className="flex flex-col gap-3 rounded-md">
      <span className="h-3 w-full block bg-white rounded-md animate-pulse" />
      <span className="h-3 w-4/6 block bg-white rounded-md animate-pulse" />
      <span className="h-3 w-2/6 block bg-white rounded-md animate-pulse" />
    </div>
  );
}
