"use strict";
function bbvaConsumer() {
  const bbvaAuthService = require("./bbva-auth");

  // function getToken() {
  //   bbvaAuthService.getAuthToken().then(function(body) {
  //     return body.access_token;
  //   }).catch(function(err) {
  //     return err;
  //   });
  // }

  return {
    "create": function() {
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

      return bbvaAuthService.getAuthToken().then(function(body) {
        const request = require("request-promise");
        const token = body.access_token;

        console.log(token);
        let options = {
          "method": "POST",
          "uri": "https://sandbox-apis.openplatformbbva.com/consumer/v3.0",
          "headers": {
            "Authorization": "jwt " + token,
            "Accept": "application/json",
            "Content-Type": "application/json",
            "X-Unique-Transaction-Id": "my-unique-transaction-id",
            "X-Customer-Ip": "127.0.0.1"
          },
          "body": consumerData,
          "json": true
        };

        return request(options);
      }).catch(function(err) {
        return err;
      });

    }
  };

}

module.exports = bbvaConsumer();
