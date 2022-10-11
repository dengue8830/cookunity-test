import { Config, dependency } from "@foal/core";
import { CurrencyResponse } from "../../types/api-layer.types";
import { IpApiResponse } from "../../types/ip-api.types";
import { Trace } from "../../types/trace.model.types";
import { TraceRepository } from "../repository/trace.repository";
const distanceFrom = require("distance-from");
import axios from "axios";

const USA_COORDINATES = [44.5, -89.5];

export class TraceService {
  @dependency
  traceRepository: TraceRepository;

  async fetchIpData(ip: string): Promise<IpApiResponse> {
    const { data } = await axios.get<IpApiResponse>(
      `http://ip-api.com/json/${ip}?fields=status,message,country,countryCode,lat,lon,currency`
    );
    if (data.status !== "success") {
      throw new Error("ip-api error: " + (data.message || "unkown"));
    }
    return data;
  }

  async fetchCurrencyData(currency: string): Promise<CurrencyResponse> {
    const { data } = await axios.get<CurrencyResponse>(
      `https://api.apilayer.com/fixer/convert?to=USD&from=${currency}&amount=1`,
      {
        headers: {
          apikey: Config.get("apilayer.key"),
        },
      }
    );
    if (data.error) {
      throw new Error("currency error: " + (data.error.info || "unkown"));
    }
    return data;
  }

  /**
   * Calculate the spherical distance between two coordinates points.
   * @param coords [lat, lon]
   * @returns Distance in km.
   */
  getDistanceFrom(coords: [number, number]): number {
    return distanceFrom(USA_COORDINATES).to(coords).in("km");
  }

  saveTrace(trace: Trace) {
    this.traceRepository.save(trace);
  }
}
