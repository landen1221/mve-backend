"use strict";

const express = require("express");
const { BadRequestError } = require("../expressError");
const Story = require("../models/vaccine");

const router = express.Router({ mergeParams: true });

router.post("/:vaccineName", async (req, res, next) => {
  //   res.json({ vaccine: req.params.vaccineName });
  //   res.send(req.params.vaccineName);

  // TODO: post new story (get data from form)

  const story = await Story.create(req.body);
  return res.status(201).json({ story });
});

// app.get("/staff/:fname", (req, res) => {
//   return res.json({ fname: req.params.fname });
// });

module.exports = router;
