"use strict";
require("dotenv").config();

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const hbs = require("hbs");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");
const session = require("express-session");
const cors = require("cors");

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async (x) => {
    await mongoose.connection.db.dropDatabase();
    console.log(
      `Connected to Mongo! Database name: '${x.connections[0].name}'`
    );
  })
  .catch((err) => {
    console.error("Error connecting to mongo", err);
  });

const app_name = require("./package.json").name;
const debug = require("debug")(
  `${app_name}:${path.basename(__filename).split(".")[0]}`
);

const app = express();

// CORS Sets
app.use(
  cors({
    credentials: true,
    origin: [process.env.REACT_APP], // <== this will be the URL of our React app (it will be running on port 3000)
  })
);

// Middleware Setup
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

// Session sets
app.use(
  session({
    secret: "foo",
    resave: true,
    saveUninitialized: true,
  })
);

const index = require("./routes/index");
app.use("/", index);
const order = require("./routes/orders");
app.use("/api/order/", order);

module.exports = app;
