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
      return "Duplicate username submitted";
    }
  }

  // SELECT * FROM stories WHERE story ILIKE '%after%worth%it%'
  static async search(queryString) {
    let sqlReady = `%${queryString.split(" ").join("%")}%`;
    const results = await db.query(
      `SELECT * FROM stories WHERE story ILIKE '${sqlReady}' OR username ILIKE '${sqlReady}'`
    );
    let final = {};
    final["meta"] = { query: queryString };
    final["stories"] = results.rows;

    return final;
  }
}

module.exports = Story;
