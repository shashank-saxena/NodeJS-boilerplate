"use strict";
function operatorController() {
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
      const paymentService = require("../services/payment-service");
      let consumerData = {
        "first_name": "Newput1",
        "middle_name": "User",
        "last_name": "Test",
        "ssn": "834567341",
        "dob": "1980-05-20",
        "contact": [
          {
            "type": "phone",
            "value": "+14153217654"
          },
          {
            "type": "email",
            "value": "newput1@mailinator.com"
          }
        ],
        "citizenship_status": "us_citizen",
        "citizenship_country": "USA",
        "occupation": "finance_accounting_tax",
        "income": [
          "SALARY"
        ],
        "expected_activity": [
          "CASH"
        ],
        "address": [
          {
            "type": "LEGAL",
            "line1": "201 mission st",
            "city": "san francisco",
            "state": "CA",
            "zip_code": "94104"
          }
        ],
        "pep": {
          "association": "no"
        }
      };

      let result = paymentService.createConsumer(consumerData);
      
      result.then(function(body) {
        res.send(body);
      }).catch(function(err) {
        res.send(err);
      });
    }
  };
}

module.exports = operatorController();
