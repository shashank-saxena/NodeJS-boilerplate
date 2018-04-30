"use strict";
function bbvaMoveMoney() {
  const bbvaHelper = require("../helpers/helper.js");
  const appConfig = require("../../../../config/app-config");
  const consumerID = appConfig.BBVA_CONSUMER_ID;

  return {
    "moveMoney": function(moveMoneyData) {
      let payload = bbvaHelper.getPayloadData("POST", "movemoney/v3.0", moveMoneyData);
      const request = require("request-promise");

      return new Promise(function(resolve, reject) {
        payload.then(function(data) {
          data.headers["Vnd.bbva.consumer-Uuid"] = consumerID;
          request(data).then(function(success) {
            return resolve(success);
          }).catch(function(err) {
            return reject(err);
          });
          // return resolve(request(data));
        }).catch(function(err) {
          return reject(err);
        });
      });
    }
  };

}

module.exports = bbvaMoveMoney();
