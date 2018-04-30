"use strict";
let jsonWebToken = require("jsonwebtoken");

function jwt() {

  function jwtAuthToken(userData) {
    return new Promise(function(resolve) {
      let accessToken = jsonWebToken.sign(
        userData, "JWT_SECRET_KEY", { "expiresIn": "30h" });
      let jwtDecoded = jsonWebToken.decode(accessToken, { "complete": true });
      let decodedToken = {
        "access_token": accessToken,
        "token_type": "jwt",
        "expires_in": (jwtDecoded.payload.exp - jwtDecoded.payload.iat),
        ".issued": jwtDecoded.payload.iat,
        ".expires": jwtDecoded.payload.exp
      };

      resolve(decodedToken);
    });
  }

  function verifyToken(token) {
    return new Promise(function(resolve, reject) {
      jsonWebToken.verify(token, "JWT_SECRET_KEY", function(err, decodedToken) {
        if (err) {
          reject(err);
        }
        resolve(decodedToken);
      });
    });

  }

  return {
    "getToken": function(data) {
      return jwtAuthToken(data);
    },
    "verifyToken": function(token) {
      return verifyToken(token);
    }
  };
}

// Export authService function
module.exports = jwt();
