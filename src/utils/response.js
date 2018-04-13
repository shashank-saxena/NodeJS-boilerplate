"use strict";
function response() {
  return {
    "sendResponse": function(req, success, responseCode, data = null, error = null, message = null) {
      let result = {};

      result = {
        "success": success,
        "data": (data) ? data : null,
        "_meta": {
          "responseCode": responseCode,
          "message": (message) ? message : null,
          "processingTime": (new Date().getTime() - req.startTime),
          "errors": (error) ? error : null
        }

      };
      return result;
    }
  };
}
module.exports = response();
