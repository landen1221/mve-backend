"use strict";

const db = require("../db");
const { NotFoundError } = require("../expressError");

class Story {
  static async create(data) {
    const { username, vaccine, satisfied, age, gender } = data;
    const result = await db.query(
      `INSERT INTO stories (username, vaccine, satisfied, age, gender) VALUES ($1, $2, $3, $4, $5) RETURNING story_id, username, vaccine, satisfied, age, gender`,
      [username, vaccine, satisfied, age, gender]
    );
    return `Story successfully added for ${username}`;
  }
}

module.exports = Story;
