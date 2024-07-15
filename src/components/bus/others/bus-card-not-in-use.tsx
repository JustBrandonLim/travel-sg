"use client";

import { useState, useEffect } from "react";
import { BusArrival } from "@interfaces/travel-sg";
import { ChevronDown, ChevronUp, Accessibility } from "lucide-react";
import BusArrivalSkeleton from "@components/bus/others/arrival-skeleton-not-in-use";
import Arrival from "@components/bus/others/arrival-not-in-use";

export const runtime = "edge";

interface BusCardProps {
  name: string;
  code: string;
  road: string;
}

export default function BusCard(props: BusCardProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [ready, setReady] = useState<boolean>(false);
  const [busArrivals, setBusArrivals] = useState<BusArrival[]>([]);

  useEffect(() => {
    // make it such that the card is always fetching data every 1s for latest updates.
    if (!open || ready) return;

    (async () => {
      const busArrivalsResponse = await fetch(`/api/external/bus/arrivals?code=${props.code}`, { cache: "no-store" });
      const busArrivalsResponseData: BusArrival[] = await busArrivalsResponse.json();

      setBusArrivals(busArrivalsResponseData);
      setReady(true);
    })();
  }, [open]);

  return (
    <div className="flex flex-col justify-stretch gap-3 p-3 bg-white rounded-md">
      <button className="flex justify-between" onClick={() => setOpen(!open)}>
        <div className="flex flex-col items-start gap-1">
          <h2 className="font-bold text-sm">{props.name}</h2>
          <h3 className="text-xs">{props.road}</h3>
          <h3 className="text-xs">{props.code}</h3>
        </div>

        {open && <ChevronUp />}
        {!open && <ChevronDown />}
      </button>

      {open && !ready && (
        <>
          <BusArrivalSkeleton /> <BusArrivalSkeleton /> <BusArrivalSkeleton />
        </>
      )}

      {open &&
        ready &&
        busArrivals.map(function (busArrival, index) {
          return (
            <Arrival
              key={index}
              number={busArrival.number}
              firstBus={busArrival.buses[0]}
              secondBus={busArrival.buses[1]}
              thirdBus={busArrival.buses[2]}
            />
          );
        })}
    </div>
  );
}
