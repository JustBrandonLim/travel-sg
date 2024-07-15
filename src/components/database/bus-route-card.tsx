interface BusRouteCardProps {
  code: string;
  number: string;
  sequence: number;
}

export const runtime = "edge";

export default function BusRouteCard(props: BusRouteCardProps) {
  return (
    <div className="p-3 bg-white rounded-md flex flex-col gap-3">
      <p>Type: Bus Route</p>
      <p>Code: {props.code}</p>
      <p>Number: {props.number}</p>
      <p>Sequence: {props.sequence}</p>
    </div>
  );
}
