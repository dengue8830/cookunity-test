import {
  ApiInfo,
  ApiServer,
  dependency,
  Get,
  HttpResponseOK,
  Post,
  ValidateBody,
} from "@foal/core";
import { currencySymbols } from "../../constants/currency";
import { StatisticService } from "../services/statistic.service";
import { TraceService } from "../services/trace.service";

@ApiInfo({
  title: "Cookunity API",
  version: "1.0.0",
})
@ApiServer({
  url: "/api",
})
export class ApiController {
  @dependency
  traceService: TraceService;

  @dependency
  statisticService: StatisticService;

  @Post("/traces")
  @ValidateBody({
    additionalProperties: false,
    properties: {
      ip: { type: "string" },
    },
    required: ["ip"],
    type: "object",
  })
  async traces(_, _2, { ip }: { ip: string }) {
    const ipData = await this.traceService.fetchIpData(ip);
    const currencyData = await this.traceService.fetchCurrencyData(ipData.currency);
    const distance = this.traceService.getDistanceFrom([ipData.lat, ipData.lon]);
    this.traceService.saveTrace({ name: ipData.country, distanceToUsa: distance });

    return new HttpResponseOK({
      ip,
      name: ipData.country,
      code: ipData.countryCode,
      lat: ipData.lat,
      lon: ipData.lon,
      currencies: [
        {
          iso: ipData.currency,
          symbol: currencySymbols[ipData.currency],
          conversion_rate: currencyData.result,
        },
      ],
      distance_to_usa: distance,
    });
  }

  @Get("/statistics")
  statistics() {
    const mostTraced = this.statisticService.findMostTraced();
    const longestDistance = this.statisticService.findLongestDistance();

    return new HttpResponseOK({
      longest_distance: {
        country: longestDistance?.name,
        value: longestDistance?.distanceToUsa,
      },
      most_traced: {
        country: mostTraced?.name,
        value: mostTraced?.qty,
      },
    });
  }
}
