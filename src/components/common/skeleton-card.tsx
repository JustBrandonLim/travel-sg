export const runtime = "edge";

export default function SkeletonCard() {
  return (
    <div className="rounded-md p-3 bg-white flex flex-col gap-3">
      <span className="h-3 w-3/5 block bg-neutral-300 rounded-md animate-pulse" />
      <span className="h-3 w-2/5 block bg-neutral-300 rounded-md animate-pulse" />
      <span className="h-3 w-1/5 block bg-neutral-300 rounded-md animate-pulse" />
    </div>
  );
}
