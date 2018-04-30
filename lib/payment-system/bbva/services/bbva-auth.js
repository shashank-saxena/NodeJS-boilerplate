"use strict";
function bbvaAuth() {
  const appConfig = require("../../../../config/app-config");
  const appID = appConfig.BBVA_APP_ID;
  const appSecret = appConfig.BBVA_APP_SECRET;

  function generateBase64String() {
    return Buffer.from(appID + ":" + appSecret).toString("base64");
  }

  return {
    "getAuthToken": function() {
      const request = require("request-promise");
      const base64String = generateBase64String();

      let options = {
        "method": "POST",
        "uri": "https://sbx-paas.bbvacompass.com/auth/token?grant_type=client_credentials",
        "headers": {
          "Authorization": "Basic " + base64String,
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        "json": true
      };

      return new Promise(function(resolve, reject) {
        request(options).then(function(body) {
          return resolve(body.access_token);
        }).catch(function(err) {
          return reject(err);
        });
      });
    }
  };
}

module.exports = bbvaAuth();
