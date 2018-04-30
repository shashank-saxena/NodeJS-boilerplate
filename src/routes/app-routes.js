"use strict";

const express = require("express");
const tokenVerification = require("../middlewares/token-verification");

function authRoutes() {
  // eslint-disable-next-line new-cap
  let authRouter = express.Router();
  let authController = require("../controllers/auth-controller");
  let userFields = require("./request-validators/token-request-validator");

  authRouter.post("/token", userFields.fieldsRule, userFields.fieldsValidation, authController.getAuthToken);
  return authRouter;
}


// payment-routes
function paymentRoutes() {
  // eslint-disable-next-line new-cap
  let paymentRouter = express.Router();
  let paymentController = require("../controllers/payment-controller");
  let moveMoneyValidator = require("./request-validators/move-money-schema");

  paymentRouter.post("/move-money", moveMoneyValidator.fieldsRule, moveMoneyValidator.fieldsValidation, tokenVerification.verifyToken("admin"), paymentController.moveMoney);
  return paymentRouter;
}

function appRoutes(appServer) {
  // default route handling for the app
  appServer.get("/", function(req, res) {
    res.send("Hello World....!!!!");
  });

  appServer.use("/auth", authRoutes());
  appServer.use("/payments", paymentRoutes());
}

module.exports = appRoutes;
