"use strict";
function authController() {

  const authService = require("../services/auth-service");
  const responseService = require("../services/response-service");

  let user = {
    "email": "newput@mailinator.com",
    "password": "123456",
    "role": "admin"
  };

  return {
    "getAuthToken": function(req, res) {
      if (user.email === req.body.email && user.password === req.body.password) {
        authService.getAuthToken(user).then(function(data) {
          let response = responseService.prepareResponse(req, true, 200, data, null);

          res.send(response);
        }).catch(function(err) {
          let response = responseService.prepareResponse(req, false, 404, err, "Something went wrong.");

          res.send(response);
        });

      } else {
        let response = responseService.prepareResponse(req, false, 403, null, null, "Invalid credentials...!.");

        res.send(response);
      }
    },
    "verifyToken": function(token) {
      return authService.verifyToken(token);
    }
  };
}
module.exports = authController();
