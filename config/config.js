"use strict";
let appConfig = require("./app-config.js");

module.exports = {
  "development": {
    "username": appConfig.DB_USER,
    "password": appConfig.DB_PASSWORD,
    "database": appConfig.DB_NAME,
    "host": appConfig.DB_HOST,
    "dialect": appConfig.DB_DIALECT
  },
  "test": {
    "username": "database_test",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
};
