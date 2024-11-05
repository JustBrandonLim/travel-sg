"use client";

import { useSearchParams, notFound } from "next/navigation";
import { useState, useEffect } from "react";
import { BusArrival, BusArrivalAnalysis } from "@interfaces/travel-sg";
import { RefreshCcw, MessageSquarePlus, X } from "lucide-react";

export const runtime = "edge";

export default function BusArrivalsPage() {
  const name: string | null = useSearchParams().get("name");
  const code: string | null = useSearchParams().get("code");
  const road: string | null = useSearchParams().get("road");

  if (name === null || code === null || road === null) notFound();

  const [ready, setReady] = useState<boolean>(false);
  const [busArrivals, setBusArrivals] = useState<BusArrival[]>([]);
  const [busArrivalAnalysis, setBusArrivalAnalysis] = useState<BusArrivalAnalysis[]>([]);

  const [busArrivalFeedbackModal, setBusArrivalFeedbackModal] = useState<boolean>(false);
  const [busArrivalFeedbackCode, setBusArrivalFeedbackCode] = useState<string>();
  const [busArrivalFeedbackNumber, setBusArrivalFeedbackNumber] = useState<string>();
  const [busArrivalFeedbackContent, setBusArrivalFeedbackContent] = useState<string>();

  useEffect(() => {
    if (ready || busArrivals.length > 0) return;

    (async () => {
      const busArrivalsResponse = await fetch(`/api/bus/arrivals?code=${code}`, {
        cache: "no-store",
      });
      const busArrivalsResponseData: BusArrival[] = await busArrivalsResponse.json();

      const busArrivalAnalysisResponse = await fetch(`/api/bus/arrivals/analysis?code=${code}`, {
        cache: "no-store",
      });
      const busArrivalAnalysisResponseData: BusArrivalAnalysis[] = await busArrivalAnalysisResponse.json();

      setBusArrivals(busArrivalsResponseData);
      setBusArrivalAnalysis(busArrivalAnalysisResponseData);
      setReady(true);
    })();
  }, [busArrivals]);

  function refreshBusArrivals() {
    setBusArrivals([]);
    setBusArrivalAnalysis([]);
    setReady(false);
  }

  function showBusArrivalFeedbackModal(code: string, number: string) {
    setBusArrivalFeedbackModal(true);

    setBusArrivalFeedbackCode(code);
    setBusArrivalFeedbackNumber(number);
  }

  async function submitBusArrivalFeedbackModal() {
    setBusArrivalFeedbackModal(false);

    await fetch("/api/bus/arrivals/feedback", {
      method: "POST",
      body: JSON.stringify({
        code: busArrivalFeedbackCode,
        number: busArrivalFeedbackNumber,
        content: busArrivalFeedbackContent,
      }),
    });
  }

  return (
    <main className="p-3 bg-neutral-300 rounded-md grow overflow-y-auto flex flex-col gap-3">
      <div className="flex flex-col gap-3 p-3 bg-white rounded-md">
        <div className="flex flex-row justify-between items-start">
          <div className="flex flex-col gap-1">
            <h2 className="font-bold text-sm">{name}</h2>
            <h3 className="text-xs">{road}</h3>
            <h3 className="text-xs">{code}</h3>
          </div>

          <button
            className="p-1 outline outline-1 outline-neutral-300 hover:bg-neutral-300 transition-colors rounded-md"
            onClick={() => refreshBusArrivals()}>
            <RefreshCcw size={16} />
          </button>
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
                <div className="items-end flex justify-between">
                  <div className="flex gap-3 items-center">
                    <h2 className="font-bold text-sm">{busArrival.number}</h2>
                    <h3 className="p-1 bg-neutral-300 rounded-md">
                      {busArrivalAnalysis.find((busArrivalAnalysis) => {
                        return busArrivalAnalysis.number == busArrival.number;
                      })?.sentiment ?? "NEUTRAL"}
                    </h3>
                  </div>
                  <div className="flex gap-1 items-center">
                    <button
                      className="p-1 outline outline-1 outline-neutral-300 hover:bg-neutral-300 transition-colors rounded-md"
                      onClick={() => showBusArrivalFeedbackModal(busArrival.code, busArrival.number)}>
                      <MessageSquarePlus size={16} />
                    </button>
                  </div>
                </div>
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

        {busArrivalFeedbackModal && (
          <div className="fixed inset-0 flex flex-col justify-center items-center bg-gray-800 bg-opacity-50 z-50">
            <div className="rounded-md bg-white h-64 w-64 flex flex-col gap-3 p-3">
              <div className="flex justify-between items-center">
                <h2 className="font-bold text-sm">Bus Arrival Feedback</h2>
                <button
                  className="p-1 outline outline-1 outline-neutral-300 hover:bg-neutral-300 transition-colors rounded-md"
                  onClick={() => setBusArrivalFeedbackModal(false)}>
                  <X size={16} />
                </button>
              </div>

              <textarea
                className="h-full resize-none rounded-md w-full p-3 outline-none border border-neutral-300"
                onChange={(event) => setBusArrivalFeedbackContent(event.target.value)}
              />

              <button
                className="p-1 outline outline-1 outline-neutral-300 hover:bg-neutral-300 transition-colors rounded-md"
                onClick={() => submitBusArrivalFeedbackModal()}>
                Submit
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
