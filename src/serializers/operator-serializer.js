"use strict";
let JSONAPISerializer = require("jsonapi-serializer").Serializer;

module.exports = new JSONAPISerializer("operators", {
  "attributes": [ "firstName", "lastName", "email" ],
  "keyForAttribute": "camelCase",
  "nullIfMissing": true
});
