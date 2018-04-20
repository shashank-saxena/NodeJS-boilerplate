"use strict";

const express = require("express");


function aircraftRoutes() {
  // eslint-disable-next-line new-cap
  let aircraftRouter = express.Router();

  aircraftRouter.get("/", function(req, res) {
    res.send("get all aircrafts");
  });

  aircraftRouter.get("/:id", function(req, res) {
    res.send("get aircraft by id");
  });
  return aircraftRouter;
}

function operatorRoutes() {
  // eslint-disable-next-line new-cap
  let operatorRouter = express.Router();
  let operatorController = require("../controllers/operator-controller");

  operatorRouter.get("/", operatorController.get);

  // validate
  // let validator = require("express-validation");
  // let validationSchema = require("../request_validations/operator-validator");

  // operatorRouter.post("/", validator(validationSchema), operatorController.create);
  //
  operatorRouter.get("/:id(\d+)", operatorController.getByID);
  //
  operatorRouter.get("/:id/aircraft", function(req, res) {
    res.send("get operator's aircraft");
  });

  operatorRouter.get("/token", operatorController.getAuthToken);

  operatorRouter.get("/consumer", operatorController.create);

  return operatorRouter;
}

function appRoutes(appServer) {
  // default route handling for the app
  appServer.get("/", function(req, res) {
    res.send("Hello World....!!!!");
  });

  // let appConfig = require("../../config/app-config");

  appServer.use("/operators", operatorRoutes());
  appServer.use("/aircrafts", aircraftRoutes());

  // if (appConfig.API_VERSIONS.includes("v1")) {
  //   appServer.use("/operators", operatorRoutes());
  // } else {
  //   appServer.use("/aircrafts", aircraftRoutes());
  // }
  // appServer.use("/operators", operatorRoutes());
}

module.exports = appRoutes;
