"use strict";
function paymentService() {
  const paymentSystem = require("../../lib/payment-system/payment-system")("BBVA");

  return {
    "createConsumer": function(consumerData) {
      return new Promise(function(resolve, reject) {
        paymentSystem.consumer.create(consumerData).then(function(body) {
          return resolve(body);
        }).catch(function(err) {
          return reject(err);
        });
      });
    },
    "moveMoney": function(moveMoneyData) {
      return new Promise(function(resolve, reject) {
        paymentSystem.moveMoney.moveMoney(moveMoneyData).then(function(body) {
          return resolve(body);
        }).catch(function(err) {
          return reject(err);
        });
      });
    }
  };
}

module.exports = paymentService();
