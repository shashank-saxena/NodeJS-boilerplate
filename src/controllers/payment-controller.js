"use strict";
function paymentController() {
  const responseService = require("../services/response-service");

  return {

    "createConsumer": function(req, res) {
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
    },
    "moveMoney": function(req, res) {
      const paymentService = require("../services/payment-service");
      let result = paymentService.moveMoney(req.body);

      result.then(function(data) {
        let response = responseService.prepareResponse(req, true, 200, data, null);

        res.send(response);
      }).catch(function(err) {
        let response = responseService.prepareResponse(req, true, 400, null, err, null);

        res.send(response);
      });
    }
  };
}

module.exports = paymentController();
