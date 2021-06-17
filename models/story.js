"use strict";

const db = require("../db");

class Story {
  static async create(data) {
    const { username, vaccine, satisfied, age, gender, story } = data;
    console.log("this prints");
    const vaccineLowerCase = vaccine.toLowerCase();

    const result = await db.query(
      `INSERT INTO stories (username, vaccine, satisfied, age, gender, story) VALUES ($1, $2, $3, $4, $5, $6) RETURNING story_id, username, vaccine, satisfied, age, gender`,
      [username, vaccineLowerCase, satisfied, age, gender, story]
    );
    return `Story successfully added for ${username}`;
  }
}

module.exports = Story;
