"use strict";

const env = require("dotenv");
const fs = require("fs");
const path = require("path");

function loadEnvVars() {
  let envFilePath = "enviroment/";

  if (process.env.NODE_ENV === "development") {
    envFilePath += ".development";
  } else if (process.env.NODE_ENV === "staging") {
    envFilePath += ".staging";
  } else if (process.env.NODE_ENV === "production") {
    envFilePath += ".production";
  } else {
    envFilePath = null;
  }

  if (fs.existsSync(path.resolve(envFilePath))) {
    env.config({ "path": path.resolve(envFilePath) });
  }
}

function appConfig() {
  loadEnvVars();

  return {
    "DEBUG": process.env.DEBUG,
    "ENV": process.env.NODE_ENV,
    "PORT": (process.env.PORT || 3000),
    "API_VERSIONS": [ "v2" ],
    "BBVA_APP_SECRET": process.env.BBVA_APP_SECRET,
    "BBVA_APP_ID": process.env.BBVA_APP_ID
  };
}

module.exports = appConfig();
