"use client";

import { useState, MouseEvent } from "react";

export default function SentimentAnalysis() {
  const [input, setInput] = useState("");

  const [loading, setLoading] = useState(false);

  const [label, setLabel] = useState("NA");
  const [score, setScore] = useState(-1);

  async function handleClick(event: MouseEvent<HTMLButtonElement>) {
    setLoading(true);

    if (input.length === 0) {
      setLabel("NA");
      setScore(-1);

      setLoading(false);

      return;
    }

    const response = await fetch("/api/sentiment-analysis", {
      method: "POST",
      body: JSON.stringify(input),
    });

    const data = await response.json();

    setLabel(data.label);
    setScore(data.score);

    setLoading(false);
  }

  return (
    <main className="m-5">
      <h1 className="font-bold text-xl mb-10">Sentiment Analysis</h1>

      <div className="flex flex-col gap-5 border border-red-500 rounded-md p-5 mb-10">
        <p>Input</p>
        <input className="border border-black p-2 rounded-md" type="text" onChange={(event) => setInput(event.target.value)} />
        <button className="border border-black p-2 bg-blue-500 text-white rounded-md" onClick={handleClick} disabled={loading}>
          {loading ? "Loading" : "Analyse"}
        </button>
      </div>

      <div className="flex flex-col gap-5 border border-red-500 rounded-md p-5">
        <p>Output</p>
        <p>{label}</p>
        <p>{score}</p>
      </div>
    </main>
  );
}
