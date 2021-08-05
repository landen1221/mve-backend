"use strict";

const db = require("../db");
const { ExpressError } = require("../expressError");

const MIN_FLAG_COUNT_FOR_REVIEW = 2;

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
    const results = await db.query(
      `SELECT * FROM stories ORDER BY created_at DESC;`
    );
    return results.rows;
  }

  // May not need this
  static async addAdmin(username, password) {
    try {
      await db.query(
        `INSERT INTO admin (username, password) VALUES ($1, $2);`,
        [username, password]
      );
      return "Success";
    } catch (err) {
      return err;
    }
  }

  // For login
  static async getAdmin(username) {
    try {
      const results = await db.query(
        `SELECT username, password FROM admin WHERE username=$1 AND is_admin=true;`,
        [username]
      );
      const user = results.rows[0];
      if (user) {
        return user;
      }
      throw new ExpressError("Username not found!", 400);
    } catch (err) {
      return err;
    }
  }

  // Likely not efficient, but sufficient since we're never working with a large dataset with current setup (stories are manually selected)
  static async changeVisability(parsedChecked) {
    try {
      for (let story in parsedChecked) {
        let changeVisability = !parsedChecked[story];
        await db.query(`UPDATE stories SET visability=$1 WHERE story_id=$2;`, [
          changeVisability,
          story.split("_")[1],
        ]);
      }
      return;
    } catch (err) {
      return err;
    }
  }
}

module.exports = Admin;
