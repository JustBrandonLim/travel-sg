import { BusStop } from "@interfaces/travel-sg";

export default function BusStopDisplay(props: BusStop) {
  return (
    <div className="bg-gray-800 p-5 text-white">
      <h3 className="font-bold">{props.name}</h3>
      <p>{props.road}</p>
      <p className="text-sm">{props.code}</p>
    </div>
  );
}
