"use strict";

const express = require("express");
const { BadRequestError } = require("../expressError");
const Story = require("../models/story");

const router = express.Router({ mergeParams: true });

router.post("/", async (req, res, next) => {
  try {
    const story = await Story.create(req.body);
    return res.status(201).json({ story });
  } catch (err) {
    return next(err);
  }
});

// example url http://localhost:3001/story/search?q=worth+it
// example url myvaccineexprience.org/story/search?q=worth+it

router.get("/:fingerprint/search", async (req, res, next) => {
  try {
    const { fingerprint } = req.params;
    const results = await Story.search(req.query.q, fingerprint);
    return res.status(201).json({ results });
  } catch (err) {
    return next(err);
  }
});

router.post("/addflag/:storyID/:fingerprint", async (req, res, next) => {
  try {
    const { storyID, fingerprint } = req.params;
    const flagCount = await Story.addFlag(fingerprint, storyID);
    return res.status(201).json({ flagCount });
  } catch (err) {
    return next(err);
  }
});

router.post("/subtractflag/:storyID/:fingerprint", async (req, res, next) => {
  try {
    const { storyID, fingerprint } = req.params;
    const flagCount = await Story.subtractFlag(fingerprint, storyID);
    return res.status(201).json({ flagCount });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
