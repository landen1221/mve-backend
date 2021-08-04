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
        `INSERT INTO users (username, password) VALUES ($1, $2);`,
        [username, password]
      );
      return "Success";
    } catch (err) {
      return err;
    }
  }

  static async getAdmin(username) {
    try {
      const results = await db.query(
        `SELECT username, password FROM users WHERE username=$1;`,
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

  // FIXME: likely not efficient, but won't take in a large dataset with current setup (stories are selected manually)
  static async changeVisability(parsedChecked) {
    try {
      console.log("this prints!!!@#@!#");
      for (let story in parsedChecked) {
        let changeVisability = !parsedChecked[story];
        console.log(changeVisability);
        console.log(story[story.length - 1]);
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
