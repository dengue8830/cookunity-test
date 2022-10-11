export interface IpApiResponse {
  status: "success" | "fail";
  message?: "private range" | "reserved range" | "invalid query";
  country: string;
  countryCode: string;
  lat: number;
  lon: number;
  currency: string;
}
