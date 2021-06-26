"use strict";

const express = require("express");
const { BadRequestError } = require("../expressError");
const Vaccine = require("../models/vaccine");

const router = express.Router({ mergeParams: true });

// get statistics for all vaccines & COVID
router.get("/", async (req, res, next) => {
  try {
    let stats = await Vaccine.getStats();
    return res.json({ stats });
  } catch (err) {
    return next(err);
  }
});

// get list of all vaccine stories by name
router.get("/:vaccineName", async (req, res, next) => {
  // TODO: get list of all stories for this vaccine
  try {
    const stories = await Vaccine.get(req.params.vaccineName);
    return res.json({ stories });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
