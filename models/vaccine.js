"use strict";

const db = require("../db");
const { NotFoundError } = require("../expressError");

class Vaccine {
  static async get(vaccineName) {
    vaccineName = vaccineName.toLowerCase();
    const vaccineStoryRes = await db.query(
      `SELECT * FROM stories WHERE vaccine=$1`,
      [vaccineName]
    );

    console.log(vaccineStoryRes);

    // if (!vaccineStoryRes.length)
    //   throw new NotFoundError(`Invalid url parameter of ${vaccineName}`);

    return vaccineStoryRes.rows;
  }
}

module.exports = Vaccine;
