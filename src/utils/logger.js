"use strict";
let winston = require("winston");
let path = require("path");

function logger() {
  let dateObj = new Date();
  let fileName = (dateObj.getMonth() + 1) + "-" + dateObj.getDate() + "-" + dateObj.getFullYear();
  let accessLog = path.join(__dirname, "../../logs/access-" + fileName + ".log");
  let errorLog = path.join(__dirname, "../../logs/error-" + fileName + ".log");

  /* log format */
  // 04/13/18 9:54:20 AM - error: Request IP : ::1, Request headers : {"host":"localhost:3000","connection":"keep-alive","cache-control":"max-age=0","upgrade-insecure-requests":"1","user-agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36","accept":"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8","accept-encoding":"gzip, deflate, br","accept-language":"en-US,en;q=0.9","cookie":"io=mvNXUPyIo83xlsTXAAAA; skipLoginPage=true","if-none-match":"W/\"d-Qvo7JIitvKUlO72Kwi0Mh69U5LA\""}, API Response : "{\"result\":\"expected result \"}"

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

  let LoggerTransportObj = (process.env.NODE_ENV !== "development") ? winston.transports.Console : winston.transports.File;

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

