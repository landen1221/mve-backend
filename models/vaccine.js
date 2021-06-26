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
    let stats = {};
    for (let vaccine of vaccines) {
      const all = await db.query(
        `SELECT COUNT(story_id) FROM stories WHERE vaccine='${vaccine}'`
      );
      const satsifiedCount = await db.query(
        `SELECT COUNT(story_id) FROM stories WHERE vaccine='${vaccine}' AND satisfied='Yes'`
      );
      stats[vaccine] =
        Math.round(
          (satsifiedCount.rows[0].count / all.rows[0].count) * 100 * 100
        ) / 100;
    }

    const countVaccine = await db.query(
      `SELECT COUNT(*) FROM stories WHERE NOT vaccine='covid';`
    );

    const countCOVID = await db.query(
      `SELECT satisfied, COUNT(*) FROM stories WHERE vaccine='covid' GROUP BY satisfied;`
    );

    stats["vaccineCount"] = countVaccine.rows[0].count;
    stats["covid"] = countCOVID.rows;
    return stats;
  }
}

module.exports = Vaccine;
