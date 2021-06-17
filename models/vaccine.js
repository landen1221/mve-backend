"use strict";

const db = require("../db");

class Vaccine {
  static async get(vaccineName) {
    vaccineName = vaccineName.toLowerCase();
    const vaccineStoryRes = await db.query(
      `SELECT * FROM stories WHERE vaccine=$1`,
      [vaccineName]
    );

    console.log(`VaccineName = ${vaccineName}`);
    return vaccineStoryRes.rows;
  }
}

module.exports = Vaccine;
