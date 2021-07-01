"use strict";

const express = require("express");
const { BadRequestError } = require("../expressError");
const Story = require("../models/story");

const router = express.Router({ mergeParams: true });

router.post("/", async (req, res) => {
  const story = await Story.create(req.body);
  return res.status(201).json({ story });
});

// example url http://localhost:3001/story/search?q=worth+it
// example url myvaccineexprience.org/story/search?q=worth+it

router.get("/search", async (req, res) => {
  const results = await Story.search(req.query.q);
  return res.status(201).json({ results });
});

module.exports = router;
