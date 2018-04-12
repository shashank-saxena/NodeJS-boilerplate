"use strict";

const express = require("express");
const bodyParser = require("body-parser");

// let helmet = require("helmet");
// let hpp = require("hpp");
// let cors = require("cors");
// let router = express.Router();

const appConfig = require("./config/app-config");
const appRoutes = require("./src/routes/app-routes");

const app = express();

app.use(bodyParser.urlencoded({ "extended": true }));
app.use(bodyParser.json());

// app.use(cors());
// app.use(helmet());
// app.use(hpp());

// set time to calculate processing time for a response
app.use(function(req, res, next) {
  req.body.startTime = Date.now();
  next();
});

// register all app level routes
appRoutes(app);

app.listen(appConfig.PORT, null, function() {
  console.log("Express webserver configured and listening at http://localhost:" + appConfig.PORT);
});
