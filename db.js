"use strict";
/** Database setup for MVE. */
const { Client } = require("pg");
const { DATABASE_URL } = require("./config");

let db;

// if (process.env.NODE_ENV === "production") {
//   db = new Client({
//     connectionString: getDatabaseUri(),
//     ssl: {
//       rejectUnauthorized: false,
//     },
//   });
// } else {
//   db = new Client({
//     connectionString: getDatabaseUri(),
//   });
// }

db = new Client({
  connectionString: DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

db.connect();

module.exports = db;
