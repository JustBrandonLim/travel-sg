export interface BusStop {
  code: string;
  name: string;
  road: string;
  latitude: number;
  longitude: number;
}

export interface BusService {
  number: string;
  originCode: string;
  destinationCode: string;
  operator: string;
  direction: number;
}

export interface BusRoute {
  code: string;
  number: string;
  sequence: number;
}
