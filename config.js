"use strict";

/** Shared config for application; can be required many places. */
require("dotenv").config();
require("colors");

const SECRET_KEY = process.env.SECRET_KEY || "secret-dev";

const PORT = process.env.PORT || 8080;

// Use dev database, testing database, or via env var, production database
function getDatabaseUri() {
  return process.env.NODE_ENV === "test"
    ? "my_vaccine_experience_test"
    : process.env.DATABASE_URL || "my_vaccine_experience";
}

module.exports = {
  SECRET_KEY,
  PORT,
  getDatabaseUri,
};
