"use strict";

var env = require("dotenv");
var fs = require("fs");

function loadEnvVars () {
  var envFilePath = "../environment/";

  if (process.env.NODE_ENV === "development") {
    envFilePath += ".development";
  } else if (process.env.NODE_ENV === "staging") {
    envFilePath += ".staging";
  } else if (process.env.NODE_ENV === "production") {
    envFilePath += ".production";
  } else {
    envFilePath = null;
  }

  if (fs.existsSync(envFilePath)) {
    env.config(envFilePath);
  }
}

function appConfig () {
  loadEnvVars();

  return {
    "DEBUG": process.env.DEBUG,
    "ENV": process.env.NODE_ENV,
    "PORT": (process.env.PORT || 3000)
  };
}

module.exports = appConfig();
