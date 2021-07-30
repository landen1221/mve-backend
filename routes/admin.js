"use strict";

const express = require("express");
const { BadRequestError } = require("../expressError");
const Admin = require("../models/admin");

const router = express.Router({ mergeParams: true });

router.get("/flagged", async (req, res, next) => {
  try {
    const results = await Admin.getFlaggedStories();
    return res.status(201).json({ results });
  } catch (err) {
    return next(err);
  }
});

router.get("/all", async (req, res, next) => {
  try {
    const results = await Admin.getAllStories();
    return res.status(201).json({ results });
  } catch (err) {
    return next(err);
  }
});

// FIXME: not sure if this is needed -- no model created for this route
router.post("/register", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const username = req.body.username;
    return "Username successfully created";
  } catch (err) {
    return next(err);
  }
});

//FIXME: visability change not currently working
router.post("/", async (req, res, next) => {
  try {
    await Admin.removeVisability();
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
