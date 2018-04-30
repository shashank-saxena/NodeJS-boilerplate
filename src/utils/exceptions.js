"use strict";

function exceptions() {
  // private

  // public
  return {
    "badRequest": function(message, customMsg) {
      return { "httpCode": 400, "responseCode": 400, "customMsg": customMsg,
        "message": message, "errorMsg": "Bad request" };
    },
    "notAuthorized": function(message, customMsg) {
      return { "httpCode": 401, "responseCode": 401, "customMsg": customMsg,
        "message": message, "errorMsg": "Authentication failed" };
    },
    "accessDenied": function(message, customMsg) {
      return { "httpCode": 403, "responseCode": 403, "customMsg": customMsg,
        "message": message, "errorMsg": "Access Denied" };
    },
    "pageNotFound": function(message, customMsg) {
      return { "httpCode": 404, "responseCode": 404, "customMsg": customMsg,
        "message": message, "errorMsg": "Page Not Found" };
    },
    "recordNotFound": function(message, customMsg) {
      return { "httpCode": 404, "responseCode": 404, "customMsg": customMsg,
        "message": message, "errorMsg": "Record Not Found" };
    },
    "validationException": function(message, customMsg) {
      return { "httpCode": 412, "responseCode": 412, "customMsg": customMsg,
        "message": message, "errorMsg": "Validation exception" };
    },
    "verificationException": function(message, customMsg) {
      return { "httpCode": 412, "responseCode": 412, "customMsg": customMsg,
        "message": message, "errorMsg": "Verification exception" };
    },
    "requestEntityTooLarge": function(message, customMsg) {
      return { "httpCode": 413, "responseCode": 413, "customMsg": customMsg,
        "message": message, "errorMsg": "Maximum number of records allowed is 1000." };
    },
    "internalServerError": function(message, customMsg) {
      return { "httpCode": 500, "responseCode": 500, "customMsg": customMsg,
        "message": message, "errorMsg": "Server encountered some problem" };
    },
    "serverBusyError": function(message, customMsg) {
      return { "httpCode": 503, "responseCode": 503, "customMsg": customMsg,
        "message": message, "errorMsg": "Server Busy" };
    }
  };
}

// Export exception function
module.exports = exceptions();
