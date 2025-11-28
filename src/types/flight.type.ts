export interface FlightOfferSnapshot {
  data: {
    type: string;
    id: string;
    itineraries: Array<{
      segments: Array<{
        departure: { iataCode: string; at: string };
        arrival: { iataCode: string; at: string };
        carrierCode: string;
        number: string;
      }>;
    }>;
    price: { total: string; currency: string };
    validatingAirlineCodes: string[];
    travelerPricings: Array<any>;
  };
}
