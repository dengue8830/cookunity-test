import { createApp, ServiceManager } from "@foal/core";
import * as request from "supertest";
import { AppController } from "../app/app.controller";
import { TraceRepository } from "../app/repository/trace.repository";

describe("statistics", () => {
  let app;

  before(async () => {
    const serviceManager = new ServiceManager();
    const traceRepository = new TraceRepository([
      {
        name: "Peru",
        distanceToUsa: 700,
      },
      {
        name: "Argentina",
        distanceToUsa: 1000,
      },
      {
        name: "Bolivia",
        distanceToUsa: 900,
      },
      {
        name: "Bolivia",
        distanceToUsa: 900,
      },
    ]);
    serviceManager.set(TraceRepository, traceRepository);
    app = await createApp(AppController, {
      serviceManager,
    });
  });

  it("/statistics should return longest distance from requested traces and most traced country", () => {
    return request(app)
      .get("/api/statistics")
      .expect(200, {
        longest_distance: {
          country: "Argentina",
          value: 1000,
        },
        most_traced: {
          country: "Bolivia",
          value: 2,
        },
      });
  });
});
