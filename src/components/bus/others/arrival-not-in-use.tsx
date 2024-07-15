interface ArrivalProps {
  number: string;
  firstBus: {
    arrival: string;
    load: string;
    accessible: boolean;
    type: string;
  };
  secondBus: {
    arrival: string;
    load: string;
    accessible: boolean;
    type: string;
  };
  thirdBus: {
    arrival: string;
    load: string;
    accessible: boolean;
    type: string;
  };
}

export default function Arrival(props: ArrivalProps) {
  return (
    <div className="grid grid-cols-4 items-center gap-3 text-md bg-neutral-300 rounded-md p-3">
      <p className="font-bold text-sm col-span-4">{props.number}</p>

      <div className="grid grid-cols-1 gap-1 items-center">
        <p>{props.firstBus.arrival}</p>
        {props.firstBus.load === "Low" && <div className="w-3 h-3 rounded-full bg-green-500" />}
      </div>

      <div>
        <h5 className="text-xs">{props.secondBus.arrival}</h5>
      </div>

      <div>
        <h5>{props.thirdBus.arrival}</h5>
      </div>
    </div>
  );
}
