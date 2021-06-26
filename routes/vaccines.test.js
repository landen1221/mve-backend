"use strict";

const request = require("supertest");

const app = require("../app");
const { commonBeforeAll, commonAfterAll } = require("../models/_testCommon");

beforeAll(commonBeforeAll);
afterAll(commonAfterAll);

describe("Get /vaccine", function () {
  test("obtains accurate statistics", async function () {
    const resp = await request(app).get("/vaccine");
    expect(resp.statusCode).toEqual(200);
    expect(resp.body.stats["pfizer"]).toEqual(100);
    expect(resp.body.stats["moderna"]).toEqual(50);
    expect(resp.body.stats.covid[0]).toEqual({
      satisfied: "Severe",
      count: "1",
    });
  });
});

describe("Get /vaccine/:vaccineName", function () {
  const vaccines = [
    "pfizer",
    "moderna",
    "johnsonandjohnson",
    "astrazeneca",
    "covid",
  ];
  test("Retrievs list of all vaccine stories by vaccine name", async function () {
    for (let vaccine of vaccines) {
      const resp = await request(app).get(`/vaccine/${vaccine}`);
      // assure all vaccines can be pulled
      expect(resp.statusCode).toEqual(200);

      // quick test to confirm stories are being retrieved
      if (vaccine === "moderna") {
        expect(resp.body.stories.length).toEqual(2);
      }
    }
  });
});
