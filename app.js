const express = require("express");
const cors = require("cors");

const { NotFoundError } = require("./expressError");
const vaccineRoutes = require("./routes/vaccines");
const storyRoute = require("./routes/story");

process.env.NODE_ENV = "development";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/vaccine", vaccineRoutes);
app.use("/story", storyRoute);

app.use(function (req, res, next) {
  console.log("**************************************");
  return next(new NotFoundError());
});

// Generic error handler
app.use(function (err, req, res, next) {
  if (process.env.NODE_ENV !== "test") console.error(err.stack);
  const status = err.status || 500;
  const message = err.message;

  return res.status(status).json({
    error: { message, status },
  });
});

module.exports = app;
