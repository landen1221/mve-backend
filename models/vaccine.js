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

  static async getStats() {
    const vaccines = ["pfizer", "astrazeneca", "moderna", "johnsonandjohnson"];
    let percentages = {};
    for (let vaccine of vaccines) {
      const all = await db.query(
        `SELECT COUNT(story_id) FROM stories WHERE vaccine='${vaccine}'`
      );
      const satsifiedCount = await db.query(
        `SELECT COUNT(story_id) FROM stories WHERE vaccine='${vaccine}' AND satisfied='true'`
      );
      percentages[vaccine] =
        Math.round((satsifiedCount.rows[0].count / all.rows[0].count) * 100) /
        100;
    }

    const countAll = await db.query(
      `SELECT satisfied, COUNT(*) FROM stories WHERE vaccine='covid' GROUP BY satisfied;`
    );
    percentages["covid"] = countAll.rows;
    return percentages;
  }
}

module.exports = Vaccine;
