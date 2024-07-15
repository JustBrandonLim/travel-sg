import Link from "next/link";

import { ChevronRight } from "lucide-react";

export const runtime = "edge";

interface BusStopCardProps {
  name: string;
  code: string;
  road: string;
}

export default function BusStopCard(props: BusStopCardProps) {
  return (
    <Link
      href={`/bus/arrivals?name=${props.name}&code=${props.code}&road=${props.road}`}
      className="flex items-center justify-between gap-3 p-3 bg-white rounded-md">
      <div className="flex flex-col gap-1">
        <h2 className="font-bold text-sm">{props.name}</h2>
        <h3 className="text-xs">{props.road}</h3>
        <h3 className="text-xs">{props.code}</h3>
      </div>
      <ChevronRight />
    </Link>
  );
}
