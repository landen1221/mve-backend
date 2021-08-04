"use strict";

const db = require("../db");

class Story {
  static async create(data) {
    const { username, vaccine, satisfied, age, gender, story } = data;

    const vaccineLowerCase = vaccine.toLowerCase();
    try {
      const result = await db.query(
        `INSERT INTO stories (username, vaccine, satisfied, age, gender, story) VALUES ($1, $2, $3, $4, $5, $6) RETURNING story_id, username, vaccine, satisfied, age, gender`,
        [username, vaccineLowerCase, satisfied, age, gender, story]
      );
      return `Story successfully added for ${username}`;
    } catch (err) {
      return err;
    }
  }

  // SELECT * FROM stories WHERE story ILIKE '%after%worth%it%'
  static async search(queryString) {
    let sqlReady = `%${queryString.split(" ").join("%")}%`;
    const results = await db.query(
      `SELECT * FROM stories WHERE story ILIKE '${sqlReady}' OR username ILIKE '${sqlReady}' AND visability='t'`
    );
    let final = {};
    final["meta"] = { query: queryString };
    final["stories"] = results.rows;

    return final;
  }

  static async addFlag(story_id) {
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

      return newTotal;
    } catch (err) {
      return err;
    }
  }

  static async subtractFlag(story_id) {
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

      return newTotal;
    } catch (err) {
      return err;
    }
  }
}

module.exports = Story;
