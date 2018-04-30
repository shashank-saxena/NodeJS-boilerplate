"use strict";
const schema = require("./entity-fields/fields-rule");
const { validationResult } = require("express-validator/check");

function tokenRequestValidator() {
  let validationSchema = {
    "fieldsRule": [
      schema.email,
      schema.password
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
module.exports = tokenRequestValidator();
