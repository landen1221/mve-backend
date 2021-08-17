"use strict";

const db = require("../db");

class Story {
  static async create(data) {
    const { username, vaccine, satisfied, age, gender, story, fingerprint } =
      data;

    const vaccineLowerCase = vaccine.toLowerCase();
    try {
      const currStoryCount = await db.query(
        `SELECT COUNT(*) FROM stories WHERE fingerprint=$1;`,
        [fingerprint]
      );
      const userStoryCount = currStoryCount.rows[0].count;

      if (userStoryCount >= 3) {
        return `You've submitted the maximum allowed stories. You can only submit 3 (One for Covid, and your 1st and 2nd vaccine.)`;
      }

      const result = await db.query(
        `INSERT INTO stories (username, vaccine, satisfied, age, gender, story, fingerprint) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [username, vaccineLowerCase, satisfied, age, gender, story, fingerprint]
      );
      return `Story successfully added for ${username}`;
    } catch (err) {
      return err;
    }
  }

  // SELECT * FROM stories WHERE story ILIKE '%after%worth%it%'
  static async search(queryString, fingerprint) {
    let sqlReady = `%${queryString.split(" ").join("%")}%`;
    const results = await db.query(
      `SELECT * FROM stories WHERE story ILIKE '${sqlReady}' OR username ILIKE '${sqlReady}' AND visability='t'`
    );

    const flaggedStories = await db.query(
      `SELECT story_id FROM user_flags WHERE fingerprint=$1`,
      [fingerprint]
    );

    const flaggedStoriesArray = flaggedStories.rows.map(
      (story) => story["story_id"]
    );

    let final = {};
    final["meta"] = { query: queryString };
    final["stories"] = results.rows;
    final["flaggedStoriesArray"] = flaggedStoriesArray;

    return final;
  }

  static async addFlag(fingerprint, story_id) {
    try {
      const getNum = await db.query(
        `SELECT flagCount FROM stories WHERE story_id=$1;`,
        [story_id]
      );
      let newTotal = getNum.rows[0]["flagcount"] + 1;

      await db.query(`UPDATE stories SET flagCount=$1 WHERE story_id=$2;`, [
        newTotal,
        story_id,
      ]);

      await db.query(
        `INSERT INTO user_flags (fingerprint, story_id) VALUES ($1, $2);`,
        [fingerprint, story_id]
      );

      return newTotal;
    } catch (err) {
      return err;
    }
  }

  static async subtractFlag(fingerprint, story_id) {
    try {
      const getNum = await db.query(
        `SELECT flagCount FROM stories WHERE story_id=$1;`,
        [story_id]
      );
      let newTotal = getNum.rows[0]["flagcount"] - 1;

      await db.query(`UPDATE stories SET flagCount=$1 WHERE story_id=$2;`, [
        newTotal,
        story_id,
      ]);

      await db.query(
        `DELETE FROM user_flags WHERE fingerprint=$1 AND story_id=$2;`,
        [fingerprint, story_id]
      );

      return newTotal;
    } catch (err) {
      return err;
    }
  }
}

module.exports = Story;
