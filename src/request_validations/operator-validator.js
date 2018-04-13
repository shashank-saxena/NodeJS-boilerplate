"use strict";
const Joi = require("joi");

module.exports = {
  "body": {
    "firstName": Joi.string().min(2).max(50).required(),
    "lastName": Joi.string().min(2).max(50).required(),
    "email": Joi.string().email().required()
  },
  "options": {
    "allowUnknownBody": true,
    "allowUnknownHeaders": true,
    "allowUnknownQuery": true,
    "allowUnknownParams": true,
    "allowUnknownCookies": true
  }
};
