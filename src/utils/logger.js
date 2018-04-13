"use strict";
let winston = require("winston");
let path = require("path");

function logger() {
  let accessLog = path.join(__dirname, "../../logs/access.log");
  let errorLog = path.join(__dirname, "../../logs/error.log");

  // private
  function formatter(args) {
    let twoDigit = "2-digit";
    let options = {
      "day": twoDigit,
      "month": twoDigit,
      "year": twoDigit,
      "hour": twoDigit,
      "minute": twoDigit,
      "second": twoDigit
    };
    let date = new Date().toLocaleTimeString("en-us", options).split(",");
    let logMessage = date[0] + date[1] + " - " + args.level + ": " + args.message;

    return logMessage;
  }
  // eslint-disable-next-line
  let LoggerTransportObj = (process.env.NODE_ENV !== "production") ? winston.transports.Console : winston.transports.File;

  // public
  return {
    "info": new winston.Logger({
      "transports": [ new LoggerTransportObj({
        "level": "info",
        "formatter": formatter,
        "filename": accessLog,
        "maxsize": 10000000, // 10MB
        "maxFiles": 5,
        "handleExceptions": true,
        "json": false,
        "colorize": false
      }) ],
      "exitOnError": false
    }),
    "debug": new winston.Logger({
      "transports": [ new LoggerTransportObj({
        "level": "debug",
        "formatter": formatter,
        "filename": accessLog,
        "maxsize": 10000000, // 10MB
        "maxFiles": 5,
        "handleExceptions": true,
        "json": false,
        "colorize": false
      }) ],
      "exitOnError": false
    }),
    "warn": new winston.Logger({
      "transports": [ new LoggerTransportObj({
        "level": "warn",
        "formatter": formatter,
        "filename": errorLog,
        "maxsize": 10000000, // 10MB
        "maxFiles": 5,
        "handleExceptions": true,
        "json": false,
        "colorize": false
      }) ],
      "exitOnError": false
    }),
    "error": new winston.Logger({
      "transports": [ new LoggerTransportObj({
        "level": "error",
        "formatter": formatter,
        "filename": errorLog,
        "maxsize": 10000000, // 10MB
        "maxFiles": 5,
        "handleExceptions": true,
        "json": false,
        "colorize": false
      }) ],
      "exitOnError": false
    })
  };
}

// Export logger function
module.exports = logger();
