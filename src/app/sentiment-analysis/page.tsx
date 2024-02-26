"use client";

import { useState, ChangeEvent } from "react";

export default function SentimentAnalysis() {
  const [label, setLabel] = useState("NA");
  const [score, setScore] = useState(-1);

  async function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const input = event.target.value;

    if (input.length === 0) {
      setLabel("NA");
      setScore(-1);

      return;
    }

    const response = await fetch("/api/sentiment-analysis", {
      method: "POST",
      body: JSON.stringify(event.target.value),
    });

    const data = await response.json();

    setLabel(data.label);
    setScore(data.score);
  }

  return (
    <main className="m-5">
      <h1 className="font-bold text-xl mb-10">Sentiment Analysis</h1>

      <div className="flex flex-col gap-5 border border-red-500 rounded-md p-5 mb-10">
        <p>Input</p>
        <input className="border border-black p-2" onChange={handleChange} type="text" />
      </div>

      <div className="flex flex-col gap-5 border border-red-500 rounded-md p-5">
        <p>Output</p>
        <p>{label}</p>
        <p>{score}</p>
      </div>
    </main>
  );
}
