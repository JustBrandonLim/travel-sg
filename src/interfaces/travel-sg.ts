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
  loop: number;
}

export interface BusRoute {
  code: string;
  number: string;
  sequence: number;
}

export interface BusArrival {
  code: string;
  number: string;
  arrivals: {
    arrival: string;
    load: string;
    feature: string;
    type: string;
  }[];
}

export interface BusArrivalFeedback {
  code: string;
  number: string;
  content: string;
}

export interface BusArrivalAnalysis {
  code: string;
  number: string;
  positiveSentiment: number;
  negativeSentiment: number;
  sentiment: string;
}
