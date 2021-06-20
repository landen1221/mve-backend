"use strict";

const express = require("express");
const { BadRequestError } = require("../expressError");
const Vaccine = require("../models/vaccine");

const router = express.Router({ mergeParams: true });

router.get("/", async (req, res, next) => {
  let stats = await Vaccine.getStats();
  console.log(stats);
  return res.json({ stats });
});

router.get("/:vaccineName", async (req, res, next) => {
  //   TODO: get list of all stories for this vaccine
  const stories = await Vaccine.get(req.params.vaccineName);
  return res.json({ stories });
});

module.exports = router;
