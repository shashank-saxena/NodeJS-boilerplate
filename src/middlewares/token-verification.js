"use strict";
function tokenVerification() {
  const authService = require("../services/auth-service");
  const responseService = require("../services/response-service");

  return {
    "verifyToken": function(roles) {
      return ((req, res, next) => {
        authService.verifyToken(req.headers.token).then(function(data) {
          req.user = data;
          if (req.user.role === roles) {
            next();
          } else {
            let response = responseService.prepareResponse(req, false, 403, null, null, "Access Denied..!");

            res.send(response);
          }
        }).catch(function(err) {
          let response = responseService.prepareResponse(req, false, 403, null, err, "Invalid credentials...!.");

          res.send(response);
        });
      });
    }
  };
}
module.exports = tokenVerification();
