"use strict";

const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");
const { UnauthorizedError } = require("../expressError");

function authenticateJWT(req, res, next) {
  try {
    const payload = jwt.verify(req.body._token, SECRET_KEY);
    req.user = payload;
    return next();
  } catch (err) {
    return next();
  }
}

function ensureLoggedIn(req, res, next) {
  try {
    if (!req.user) throw new UnauthorizedError();
    return next();
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  authenticateJWT,
  ensureLoggedIn,
};
