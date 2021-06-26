"use strict";

const request = require("supertest");

const app = require("../app");
const { commonBeforeAll, commonAfterAll } = require("../models/_testCommon");

beforeAll(commonBeforeAll);
afterAll(commonAfterAll);

describe("Get /story", function () {
  test("Adds story when information is valid", async function () {
    const resp = await request(app).post("/story").send({
      username: "testing1",
      vaccine: "pfizer",
      satisfied: "Yes",
      age: 50,
      gender: "Male",
      story: "Testing story1",
    });
    expect(resp.statusCode).toEqual(201);
    expect(resp.body).toEqual({
      story: "Story successfully added for testing1",
    });
  });

  test("Works without gender and age", async function () {
    const resp = await request(app).post("/story").send({
      username: "testing2",
      vaccine: "pfizer",
      satisfied: "Yes",
      story: "Testing story2",
    });
    expect(resp.statusCode).toEqual(201);
    expect(resp.body).toEqual({
      story: "Story successfully added for testing2",
    });
  });
});

describe("get /story/search", function () {
  const base = "/story/search?q=";
  test("Successfully searches for stories based on username", async function () {
    const usernameSearch = "testUser";
    const resp = await request(app).get(`${base}${usernameSearch}`);
    expect(resp.statusCode).toEqual(201);
    expect(resp.body.results.meta["query"]).toEqual(usernameSearch);
    expect(resp.body.results.stories.length).toEqual(5);
  });
  test("Successfully searches for stories based on story data", async function () {
    const searchQuery = "freedom+back";
    const resp = await request(app).get(`${base}${searchQuery}`);
    expect(resp.statusCode).toEqual(201);
    expect(resp.body.results.stories[0].story).toEqual(
      "Did not feel well for a couple of days, but it was worth it to get my freedom back"
    );
  });
});
