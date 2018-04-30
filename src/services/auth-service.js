"use strict";
function authService() {

  const authSystem = require("../../lib/auth-system/jwt/jwt.js");

  return {
    "getAuthToken": function(userData) {
      return authSystem.getToken(userData);
    },
    "verifyToken": function(token) {
      return authSystem.verifyToken(token);
    }
  };
}
module.exports = authService();
