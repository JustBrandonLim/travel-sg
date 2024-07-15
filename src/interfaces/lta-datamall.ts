export interface BusStopsResponseData {
  "odata.metadata": string;
  value: {
    BusStopCode: string;
    RoadName: string;
    Description: string;
    Latitude: number;
    Longitude: number;
  }[];
}

export interface BusServicesResponseData {
  "odata.metadata": string;
  value: {
    ServiceNo: string;
    Operator: string;
    Direction: number;
    Category: string;
    OriginCode: string;
    DestinationCode: string;
    AM_Peak_Freq: string;
    AM_Offpeak_Freq: string;
    PM_Peak_Freq: string;
    PM_Offpeak_Freq: string;
    LoopDesc: string;
  }[];
}

export interface BusRoutesResponseData {
  "odata.metadata": string;
  value: {
    ServiceNo: string;
    Operator: string;
    Direction: number;
    StopSequence: number;
    BusStopCode: string;
    Distance: number;
    WD_FirstBus: string;
    WD_LastBus: string;
    SAT_FirstBus: string;
    SAT_LastBus: string;
    SUN_FirstBus: string;
    SUN_LastBus: string;
  }[];
}

export interface BusArrivalsResponseData {
  "odata.metadata": string;
  BusStopCode: string;
  Services: {
    ServiceNo: string;
    Operator: string;
    NextBus: {
      OriginCode: string;
      DestinationCode: string;
      EstimatedArrival: string;
      Latitude: string;
      Longitude: string;
      VisitNumber: string;
      Load: string;
      Feature: string;
      Type: string;
    };
    NextBus2: {
      OriginCode: string;
      DestinationCode: string;
      EstimatedArrival: string;
      Latitude: string;
      Longitude: string;
      VisitNumber: string;
      Load: string;
      Feature: string;
      Type: string;
    };
    NextBus3: {
      OriginCode: string;
      DestinationCode: string;
      EstimatedArrival: string;
      Latitude: string;
      Longitude: string;
      VisitNumber: string;
      Load: string;
      Feature: string;
      Type: string;
    };
  }[];
}
