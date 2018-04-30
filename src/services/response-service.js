"use strict";

function responseService() {
  return {
    "prepareResponse": function(req, success, responseCode, data = null, error = null, message = null) {
      return {
        "success": success,
        "data": (data) ? data : null,
        "_meta": {
          "responseCode": responseCode,
          "message": (message) ? message : null,
          "processingTime": (new Date().getTime() - req.startTime),
          "errors": (error) ? error : null
        }
      };

      // return new Promise(function(resolve) {
      //   resolve(result);
      // });
    }
  };
}
module.exports = responseService();
