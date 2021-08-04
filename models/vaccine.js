"use strict";

const db = require("../db");

class Vaccine {
  // FIXME: Add fingerprint
  static async get(vaccineName, fingerprint) {
    vaccineName = vaccineName.toLowerCase();
    const vaccineStoryRes = await db.query(
      `SELECT * FROM stories WHERE vaccine=$1 AND visability='t' ORDER BY created_at ASC`,
      [vaccineName]
    );

    const flaggedStories = await db.query(
      `SELECT story_id FROM user_flags WHERE fingerprint=$1`,
      [fingerprint]
    );

    const flaggedStoriesArray = flaggedStories.rows.map(
      (story) => story["story_id"]
    );

    return { stories: vaccineStoryRes.rows, flaggedStoriesArray };
  }

  static async getStats() {
    const vaccines = ["pfizer", "astrazeneca", "moderna", "johnsonandjohnson"];
    let stats = {};
    for (let vaccine of vaccines) {
      const all = await db.query(
        `SELECT COUNT(story_id) FROM stories WHERE vaccine='${vaccine}' AND visability='t';`
      );
      const satsifiedCount = await db.query(
        `SELECT COUNT(story_id) FROM stories WHERE vaccine='${vaccine}' AND satisfied='Yes' AND visability='t';`
      );
      stats[vaccine] =
        Math.round(
          (satsifiedCount.rows[0].count / all.rows[0].count) * 100 * 100
        ) / 100;
    }

    const countVaccine = await db.query(
      `SELECT COUNT(*) FROM stories WHERE NOT vaccine='covid'AND visability='t';`
    );

    const countCOVID = await db.query(
      `SELECT satisfied, COUNT(*) FROM stories WHERE vaccine='covid' AND visability='t' GROUP BY satisfied ;`
    );

    stats["vaccineCount"] = countVaccine.rows[0].count;
    stats["covid"] = countCOVID.rows;
    return stats;
  }
}

module.exports = Vaccine;
