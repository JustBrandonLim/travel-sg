"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Home, BusFront, TrainFront, LineChart, Database } from "lucide-react";

export const runtime = "edge";

export default function SideBar() {
  const path = usePathname();

  return (
    <aside className="flex flex-col justify-between">
      <ul className="flex flex-col gap-3">
        <li>
          <Link href="/" className={`p-3 hover:bg-neutral-300 transition-colors rounded-md block ${path === "/" && `bg-neutral-300`}`}>
            <Home />
          </Link>
        </li>
        <li>
          <Link href="/bus" className={`p-3 hover:bg-neutral-300 transition-colors rounded-md block ${path.startsWith("/bus") && `bg-neutral-300`}`}>
            <BusFront />
          </Link>
        </li>
        <li>
          <Link
            href="/train"
            className={`p-3 hover:bg-neutral-300 transition-colors rounded-md block ${path.startsWith("/train") && `bg-neutral-300`}`}>
            <TrainFront />
          </Link>
        </li>
      </ul>
      <ul className="flex flex-col gap-3">
        <li>
          <Link
            href="/database"
            className={`p-3 hover:bg-neutral-300 transition-colors rounded-md block ${path.startsWith("/database") && `bg-neutral-300`}`}>
            <Database />
          </Link>
        </li>
      </ul>
    </aside>
  );
}
