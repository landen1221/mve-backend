"use strict";

const Vaccine = require("./vaccine");
const { commonBeforeAll, commonAfterAll } = require("./_testCommon");

beforeAll(commonBeforeAll);
afterAll(commonAfterAll);

const vaccines = [
  "moderna",
  "pfizer",
  "johnsonandjohnson",
  "astrazeneca",
  "covid",
];

describe("get stories by vaccine name", () => {
  test("retrieves all stories from a given vaccine", async () => {
    const storiesModerna = await Vaccine.get(vaccines[0]);
    const storiesCovid = await Vaccine.get(vaccines[vaccines.length - 1]);
    expect(storiesModerna.length).toEqual(2);
    expect(storiesCovid.length).toEqual(1);
  });
});

describe("get stats on all vaccine's satisfaction levels and COVID severity:", () => {
  test("retrieves accurate stats for all vaccines", async () => {
    let stats = await Vaccine.getStats();
    expect(stats).toEqual({
      pfizer: 100,
      astrazeneca: NaN,
      moderna: 50,
      johnsonandjohnson: 100,
      vaccineCount: "4",
      covid: [{ satisfied: "Severe", count: "1" }],
    });
  });
});
