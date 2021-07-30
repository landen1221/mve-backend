"use strict";

const db = require("../db");

const MIN_FLAG_COUNT_FOR_REVIEW = 1;

class Admin {
  // Get all stories that have more than MIN_FLAG_COUNT flags
  static async getFlaggedStories() {
    try {
      const results = await db.query(
        `SELECT * FROM stories WHERE flagCount >= ($1) AND visability='t';`,
        [MIN_FLAG_COUNT_FOR_REVIEW]
      );
      return results.rows;
    } catch (err) {
      return err;
    }
  }

  static async getAllStories() {
    const results = await db.query(`SELECT * FROM stories`);
    return results.rows;
  }

  // FIXME: change visability to false
  static async changeVisability() {
    try {
      const results = await db.query(
        `DELETE FROM stories WHERE story_id IN ()`
      );
    } catch (err) {
      return err;
    }
  }
}

module.exports = Admin;
