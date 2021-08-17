"use strict";

/** Shared config for application; can be required many places. */
require("dotenv").config();

const SECRET_KEY =
  process.env.SECRET_KEY || "asldfjlKJSDF0897F__)(*&_0798_)(*:KLJD";

const BCRYPT_WORK_FACTOR = 12;

const PORT = process.env.PORT || 3001;

// Use dev database, testing database, or via env var, production database
function getDatabaseUri() {
  return process.env.NODE_ENV === "test"
    ? "my_vaccine_experience_test"
    : process.env.DATABASE_URL || "mve_two";
}

module.exports = {
  SECRET_KEY,
  PORT,
  getDatabaseUri,
  BCRYPT_WORK_FACTOR,
};
