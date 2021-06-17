"use strict";

const express = require("express");
const { BadRequestError } = require("../expressError");
const Story = require("../models/story");

const router = express.Router({ mergeParams: true });

router.post("/", async (req, res) => {
  // TODO: post new story (get data from form)
  console.log("******************");
  const story = await Story.create(req.body);
  return res.status(201).json({ story });
});

module.exports = router;
