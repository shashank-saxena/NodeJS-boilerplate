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
      let resAPI = JSON.stringify( { "result": "result" } );

      log.error.error("Request IP : " + reqIP + ", Request headers : " + reqHeader + ", API Response : " + JSON.stringify(resAPI));
      res.send("get operators");
    },
    "getByID": function(req, res) {
      let serializer = require("../serializers/operator-serializer");
      let serializedData = serializer.serialize(data);

      res.send(serializedData.data);
    },
    "getAuthToken": function(req, res) {
      const bbvaAuthService = require("../services/bbva-auth");
      let result = bbvaAuthService.getAuthToken();

      result.then(function(body) {
        res.send(body.access_token);
      }).catch(function(err) {
        res.send(err);
      });
    },
    "create": function(req, res) {
      const bbvaAuthService = require("../services/bbva-consumer");
      let result = bbvaAuthService.create();

      result.then(function(body) {
        res.send(body);
      }).catch(function(err) {
        res.send(err);
      });
    }
  };
}

module.exports = user();
