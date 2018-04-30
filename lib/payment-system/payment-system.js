"use strict";
module.exports = function(bank) {
  let libraryObj = "";

  if (bank === "BBVA") {
    libraryObj = require("./bbva/bbva");
  } else if(bank === "CBC") {
    libraryObj = require("./bbva/bbva");
  } else {
    libraryObj = require("./bbva/bbva");
  }

  return libraryObj;
};
