"use strict";
function bbvaConsumer() {
  const bbvaHelper = require("../helpers/helper.js");

  return {
    "create": function(consumerData) {
      let payload = bbvaHelper.getPayloadData("POST", "consumer/v3.0", consumerData);
      const request = require("request-promise");
      
      return new Promise(function(resolve, reject) {
        payload.then(function(data) {
          return resolve(request(data));
        }).catch(function(err) {
          return reject(err);
        });
      });
    }
  };

}

module.exports = bbvaConsumer();
