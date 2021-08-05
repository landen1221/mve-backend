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
router.get("/:vaccineName/:fingerprint", async (req, res, next) => {
  try {
    const { vaccineName, fingerprint } = req.params;
    const stories = await Vaccine.get(vaccineName, fingerprint);
    return res.json({ stories });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
