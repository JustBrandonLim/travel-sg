interface BusArrivalFeedbackCardProps {
  code: string;
  number: string;
  content: string;
}

export const runtime = "edge";

export default function BusArrivalFeedbackCard(props: BusArrivalFeedbackCardProps) {
  return (
    <div className="p-3 bg-white rounded-md flex flex-col gap-3">
      <p>Type: Bus Arrival Feedback</p>
      <p>Code: {props.code}</p>
      <p>Number: {props.number}</p>
      <p>Content: {props.content}</p>
    </div>
  );
}
