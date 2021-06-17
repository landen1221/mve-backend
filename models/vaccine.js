"use strict";

const db = require("../db");
const { NotFoundError } = require("../expressError");

class Vaccine {
  static async get(vaccineName) {
    const vaccineStoryRes = await db.query(
      `SELECT * FROM stories WHERE vaccine=$1`,
      [vaccineName]
    );

    console.log(`VaccineName = ${vaccineName}`);

    return vaccineStoryRes.rows;
  }
}

module.exports = Vaccine;
