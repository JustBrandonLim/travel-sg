"use client";

import { useSearchParams, notFound } from "next/navigation";
import { useState, useEffect } from "react";
import { BusArrival } from "@interfaces/travel-sg";

export const runtime = "edge";

export default function BusArrivalsPage() {
  const name: string | null = useSearchParams().get("name");
  const code: string | null = useSearchParams().get("code");
  const road: string | null = useSearchParams().get("road");

  if (name === null || code === null || road === null) notFound();

  const [ready, setReady] = useState<boolean>(false);
  const [busArrivals, setBusArrivals] = useState<BusArrival[]>([]);

  useEffect(() => {
    if (ready || busArrivals.length > 0) return;

    (async () => {
      const busArrivalsResponse = await fetch(`/api/bus/arrivals?code=${code}`, {
        cache: "no-store",
      });
      const busArrivalsResponseData: BusArrival[] = await busArrivalsResponse.json();

      setBusArrivals(busArrivalsResponseData);
      setReady(true);
    })();
  }, [busArrivals]);

  return (
    <main className="p-3 bg-neutral-300 rounded-md grow overflow-y-auto flex flex-col gap-3">
      <div className="flex flex-col gap-3 p-3 bg-white rounded-md">
        <div className="flex flex-col gap-1">
          <h2 className="font-bold text-sm">{name}</h2>
          <h3 className="text-xs">{road}</h3>
          <h3 className="text-xs">{code}</h3>
        </div>

        {!ready && (
          <>
            <span className="h-3 w-3/5 block bg-neutral-300 rounded-md animate-pulse" />
            <span className="h-3 w-2/5 block bg-neutral-300 rounded-md animate-pulse" />
            <span className="h-3 w-1/5 block bg-neutral-300 rounded-md animate-pulse" />
          </>
        )}

        {ready &&
          busArrivals.map((busArrival, index) => {
            return (
              <div key={index} className="flex flex-col gap-1">
                <h2 className="font-bold text-sm">{busArrival.number}</h2>
                {busArrival.arrivals.map((arrival, index) => {
                  return (
                    <div key={index} className="flex flex-col gap-1">
                      <hr className="bg-black" />
                      <div className="flex flex-col gap-1">
                        <h3>{arrival.arrival}</h3>
                        <h3>{arrival.load}</h3>
                        <h3>{arrival.feature}</h3>
                        <h3>{arrival.type}</h3>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
      </div>
    </main>
  );
}
