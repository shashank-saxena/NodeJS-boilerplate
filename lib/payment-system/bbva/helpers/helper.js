"use strict";
function helper() {
  // const config = require("../config/config");
  // const baseUrl = config.BASE_URL;

  function generateTransactionID() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + "-" + s4() + "-" + s4() + "-" + s4() + "-" + s4() + s4() + s4();
  }

  function preparePayload(method, path, data) {
    let authService = require("../services/bbva-auth");

    return new Promise(function(resolve, reject) {

      authService.getAuthToken().then(function(accessToken) {
        let options = {
          "method": method,
          "uri": "https://sandbox-apis.openplatformbbva.com/" + path,
          "headers": {
            "Authorization": "jwt " + accessToken,
            "Accept": "application/json",
            "Content-Type": "application/json",
            "X-Unique-Transaction-Id": generateTransactionID(),
            "X-Customer-Ip": "127.0.0.1"
          },
          "body": data,
          "json": true
        };

        return resolve(options);
      }).catch(function(err) {
        return reject(err);
      });
    });
  }

  return {
    "getPayloadData": function(method, path, data = null) {
      return preparePayload(method, path, data);
    }
  };
}
module.exports = helper();
