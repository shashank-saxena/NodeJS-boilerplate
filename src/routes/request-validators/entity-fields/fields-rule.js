"use strict";
const { check } = require("express-validator/check");

function fieldsRule() {
  return {
    "email": check("email").isEmail().withMessage("Please provide a valid email ID"),
    "password": check("password").isString().withMessage("Please provide a valid password").isLength({ "min": 5, "max": 20 }),
    "origin_account": check("origin_account").isString().withMessage("Please provide a valid account ID").isLength({ "min": 5 }),
    "destination_account": check("destination_account").isString().withMessage("Please provide a valid account ID").isLength({ "min": 5 }),
    "amount": check("amount").isDecimal().withMessage("Please provide an amount to transfer.")
  };
}

module.exports = fieldsRule();
