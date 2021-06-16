"use strict";

const express = require("express");
const { BadRequestError } = require("../expressError");
const Vaccine = require("../models/vaccine");

const router = express.Router({ mergeParams: true });

router.get("/:vaccineName", async (req, res, next) => {
  //   res.json({ vaccine: req.params.vaccineName });
  //   res.send(req.params.vaccineName);

  //   TODO: get list of all stories for this vaccine
  const stories = await Vaccine.get(req.params.vaccineName);
  return res.json({ stories });
});

// app.get("/staff/:fname", (req, res) => {
//   return res.json({ fname: req.params.fname });
// });

module.exports = router;
