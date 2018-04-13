"use strict";
function user() {
  let data = [
    { "id": 1, "firstName": "Sandro", "lastName": "Munda", "email": "mail1@mail.com", "password": "secret" },
    { "id": 2, "firstName": "John", "lastName": "Doe", "email": "mail2@mail.com", "password": "hidden" }
  ];

  return {
    "get": function(req, res) {
      let log = require("../utils/logger");
      let reqIP = req.connection.remoteAddress;
      let reqHeader = JSON.stringify(res.req.headers);
      let resAPI = JSON.stringify( { "result": "shub am " } );

      log.error.error("Request IP : " + reqIP + ", Request headers : " + reqHeader + ", API Response : " + JSON.stringify(resAPI));
      res.send("get operators");
    },
    "getByID": function(req, res) {
      let serializer = require("../serializers/operator-serializer");
      let serializedData = serializer.serialize(data);

      res.send(serializedData.data);

    }
  };
}

module.exports = user();
