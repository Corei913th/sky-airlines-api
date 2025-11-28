declare module "amadeus" {
  /* ===========================
   *       BASE TYPES
   * =========================== */

  export interface AmadeusOptions {
    clientId: string;
    clientSecret: string;
    hostname?: string;
    logLevel?: "debug" | "info" | "warn" | "error" | "silent";
    http?: {
      timeout?: number;
      retries?: number;
      rejectUnauthorized?: boolean;
    };
  }

  export interface AmadeusResponse<T> {
    data: T;
    meta?: any;
    dictionaries?: any;
    warnings?: any[];
  }

  /* ===========================
   *       LOCATIONS (CITY / AIRPORT)
   * =========================== */

  export type LocationSubType = "AIRPORT" | "CITY";

  export interface Location {
  id: string;
  name: string;
  type: LocationSubType
  cityCode?: string;
  countryCode?: string;
  latitude?: number;
  longitude?: number;
  iataCodes?: string[];
}

  export interface LocationAddress {
    cityName?: string;
    cityCode?: string;
    countryName?: string;
    stateCode?: string;
  }

  export interface BaseLocation {
    type: "location";
    subType: LocationSubType;
    name: string;
    iataCode: string;
    address: LocationAddress;
  }

  export interface CityLocation extends BaseLocation {
    subType: "CITY";
  }

  export interface AirportLocation extends BaseLocation {
    subType: "AIRPORT";
  }

  export type AmadeusLocation = CityLocation | AirportLocation;

  export interface LocationSearchParams {
    keyword: string;
    subType: LocationSubType;
    page?: number;
    pageLimit?: number;
  }

  /* ===========================
   *    FLIGHT SEARCH / OFFERS
   * =========================== */

  export interface FlightSearchParams {
    originLocationCode: string;
    destinationLocationCode: string;
    departureDate: string;
    returnDate?: string;
    adults: number;
    children?: number;
    infants?: number;
    travelClass?: string;
    nonStop?: boolean;
    currencyCode?: string;
    maxPrice?: number;
    max?: number;
  }

  export interface FlightOffer {
    type: string;
    id: string;
    source: string;
    itineraries: any[];
    price: any;
    travelerPricings: any[];
  }

  /* ===========================
   *       FLIGHT PRICING
   * =========================== */

  export interface FlightOffersPricingParams {
    data: {
      type: "flight-offers-pricing";
      flightOffers: FlightOffer[];
    };
  }

  /* ===========================
   *       FLIGHT BOOKING
   * =========================== */

  export interface FlightOrderParams {
    data: any; // Amadeus booking schema (very complex)
  }

  /* ===========================
   *         MAIN CLASS
   * =========================== */

  export class Amadeus {
    constructor(options: AmadeusOptions);

    /* ----- Shopping (search flights) ----- */
    public shopping: {
      flightOffersSearch: {
        get(
          params: FlightSearchParams
        ): Promise<AmadeusResponse<FlightOffer[]>>;
      };

      flightOffers: {
        pricing: {
          post(
            params: FlightOffersPricingParams
          ): Promise<AmadeusResponse<any>>;
        };
      };
    };

    /* ----- Booking ----- */
    public booking: {
      flightOrders: {
        post(
          params: FlightOrderParams
        ): Promise<AmadeusResponse<any>>;
      };
    };

    /* ----- Reference Data (cities & airports) ----- */
    public referenceData: {
      locations: {
        get(
          params: LocationSearchParams
        ): Promise<AmadeusResponse<AmadeusLocation[]>>;
      };
    };

    /* ----- Travel analytics ----- */
    public travel: {
      analytics: {
        fareSearches: {
          get(params: any): Promise<any>;
        };
      };
    };
  }

  export default Amadeus;
}
