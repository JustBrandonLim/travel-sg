interface BusArrivalAnalysisCardProps {
  code: string;
  number: string;
  positiveSentiment: number;
  negativeSentiment: number;
  sentiment: string;
}

export const runtime = "edge";

export default function BusArrivalAnalysisCard(props: BusArrivalAnalysisCardProps) {
  return (
    <div className="p-3 bg-white rounded-md flex flex-col gap-3">
      <p>Type: Bus Arrival Analysis</p>
      <p>Code: {props.code}</p>
      <p>Number: {props.number}</p>
      <p>Positive Sentiment: {props.positiveSentiment}</p>
      <p>Negative Sentiment: {props.negativeSentiment}</p>
      <p>Sentiment: {props.sentiment}</p>
    </div>
  );
}
