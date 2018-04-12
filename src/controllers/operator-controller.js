"use strict";
function user() {
  return {
    "get": function (req, res) {
      res.send("get operators");
    }
  };
}

module.exports = user();
