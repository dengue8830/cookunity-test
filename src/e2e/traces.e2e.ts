import { createApp } from "@foal/core";
import * as request from "supertest";
import { AppController } from "../app/app.controller";
import axios from "axios";
import nock = require("nock");

axios.defaults.adapter = require("axios/lib/adapters/http");

describe("traces", () => {
  let app;

  before(async () => {
    app = await createApp(AppController);
  });

  it("/traces should return country, coordinates, currencies, and distance", async () => {
    // Mocking 3rd party calls is a good practice, we're testing our code not 3rd party apis.
    nock("http://ip-api.com")
      .get(uri => uri.includes("/"))
      .reply(200, {
        status: "success",
        country: "Uruguay",
        countryCode: "UY",
        lat: -34.0939,
        lon: -56.2186,
        currency: "UYU",
      });
    nock("https://api.apilayer.com")
      .get(uri => uri.includes("/"))
      .reply(200, {
        success: true,
        query: { from: "UYU", to: "USD", amount: 1 },
        info: { timestamp: 1665453543, rate: 0.024488 },
        date: "2022-10-11",
        result: 0.024488,
      });
    await request(app)
      .post("/api/traces")
      .send({
        ip: "167.62.158.169",
      })
      .expect(200, {
        ip: "167.62.158.169",
        name: "Uruguay",
        code: "UY",
        lat: -34.0939,
        lon: -56.2186,
        currencies: [{ iso: "UYU", symbol: "$U", conversion_rate: 0.024488 }],
        distance_to_usa: 9363.70705252753,
      });
  });
});
