"use strict";
function user() {
  return {
    "get": function(req, res) {
      let log = require("../utils/logger");
      let reqIP = req.connection.remoteAddress;
      let reqHeader = JSON.stringify(res.req.headers);
      let resAPI = JSON.stringify( { "result": "shub am " } );

      log.error.error("Request IP : " + reqIP + ", Request headers : " + reqHeader + ", API Response : " + JSON.stringify(resAPI));
      res.send("get operators");
    }
  };
}

module.exports = user();
