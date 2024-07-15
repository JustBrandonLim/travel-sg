interface BusStopCardProps {
  code: string;
  name: string;
  road: string;
  latitude: number;
  longitude: number;
}

export const runtime = "edge";

export default function BusStopCard(props: BusStopCardProps) {
  return (
    <div className="p-3 bg-white rounded-md flex flex-col gap-3">
      <p>Type: Bus Stop</p>
      <p>Code: {props.code}</p>
      <p>Name: {props.name}</p>
      <p>Road: {props.road}</p>
      <p>Latitude: {props.latitude}</p>
      <p>Longitude: {props.longitude}</p>
    </div>
  );
}
