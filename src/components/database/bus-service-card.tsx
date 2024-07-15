interface BusServiceCardProps {
  number: string;
  originCode: string;
  destinationCode: string;
  operator: string;
  direction: number;
}

export const runtime = "edge";

export default function BusServiceCard(props: BusServiceCardProps) {
  return (
    <div className="p-3 bg-white rounded-md flex flex-col gap-3">
      <p>Type: Bus Service</p>
      <p>Number: {props.number}</p>
      <p>Origin Code: {props.originCode}</p>
      <p>Destination Code: {props.destinationCode}</p>
      <p>Operator: {props.operator}</p>
      <p>Direction: {props.direction}</p>
    </div>
  );
}
