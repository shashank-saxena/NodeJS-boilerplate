"use strict";
const schema = require("./entity-fields/fields-rule");
const { validationResult } = require("express-validator/check");

function moveMoneySchema() {
  let validationSchema = {
    "fieldsRule": [
      schema.origin_account,
      schema.destination_account,
      schema.amount
    ],
    "fieldsValidation": function(req, res, next) {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(422).json({ "errors": errors.mapped() });
      }
      next();
    }
  };

  return validationSchema;
}
module.exports = moveMoneySchema();
