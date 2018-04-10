// @flow
function response(): any {
  return {
    sendResponse: function(req: any, success: boolean, responseCode: number, data?: any, error?: any, message?: string): ResponseObj {
      let result = {
        success: success,
        data: (data) ? data : null,
        _meta: {
          responseCode: responseCode,
          message: (message) ? message : null,
          processingTime: (new Date().getTime() - req.startTime),
          errors: (error) ? error : null
        }
      };
      return result;
    }
  };
}
module.exports = response();
