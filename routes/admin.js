"use strict";

const express = require("express");
const { BadRequestError, ExpressError } = require("../expressError");
const Admin = require("../models/admin");
const bcrypt = require("bcrypt");
const { BCRYPT_WORK_FACTOR, SECRET_KEY } = require("../config");
const db = require("../db");
const jwt = require("jsonwebtoken");
const { ensureLoggedIn } = require("../middleware/auth");

const router = express.Router({ mergeParams: true });

// FIXME: uncomment ensureLoggedIn
router.get(
  "/flagged",
  /*ensureLoggedIn,*/ async (req, res, next) => {
    try {
      const results = await Admin.getFlaggedStories();
      return res.status(201).json({ results });
    } catch (err) {
      return next(err);
    }
  }
);
// FIXME: uncomment ensureLoggedIn
router.get(
  "/all",
  /*ensureLoggedIn,*/ async (req, res, next) => {
    try {
      const results = await Admin.getAllStories();
      return res.status(201).json({ results });
    } catch (err) {
      return next(err);
    }
  }
);

// FIXME: not sure if this is needed
router.post("/register", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      throw new ExpressError("Username and password required", 400);
    }
    const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);
    await Admin.addAdmin(username, hashedPassword);
    let token = jwt.sign({ username }, SECRET_KEY);
    return res.json({
      message: `Successfully created Admin account for ${username}`,
      token,
    });
  } catch (err) {
    return next(err);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      throw new ExpressError("Username and password required", 400);
    }

    const user = await Admin.getAdmin(username);

    const success = await bcrypt.compare(password, user.password);

    if (success) {
      let token = jwt.sign({ username }, SECRET_KEY);
      return res.json({ message: "Logged In", token });
    } else {
      return res.json({ message: "Log-in Failed" });
    }
  } catch (err) {
    return next(err);
  }
});

//FIXME: visability change not currently working
// checked example: {"story_5":true,"story_6":true,"story_4":false}
// Don't need story_ when pulling id
router.post(
  "/update",
  /*ensureLoggedIn,*/ async (req, res, next) => {
    try {
      const { checked } = req.body;
      let parsedChecked = JSON.parse(checked);
      await Admin.changeVisability(parsedChecked);
    } catch (err) {
      return next(err);
    }
  }
);

module.exports = router;
