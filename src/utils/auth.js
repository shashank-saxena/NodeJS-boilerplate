// let jwt = require('jsonwebtoken');
// 
// function auth() {
//
//   function prepareAuthResponse(hash: any): any {
//     let accessToken = jwt.sign(
//       hash, 'JWT_SECRET_KEY', { expiresIn: '30h' });
//     let jwtDecoded = jwt.decode(accessToken, {complete: true});
//     return {
//       access_token: accessToken,
//       token_type: 'bearer',
//       expires_in: (jwtDecoded['payload']['exp'] - jwtDecoded['payload']['iat']),
//       '.issued': jwtDecoded['payload']['iat'],
//       '.expires': jwtDecoded['payload']['exp']
//     };
//   }
//
//   // public
//   return {
//     operatorLogin: function(reqData: any, callback: (resObj: ResponseObj) => void) {
//       let operatorService = require('../services/operator');
//       operatorService.getOperatorByCredentials(reqData, function(operator) {
//         var JSONAPIDeserializer = require('jsonapi-serializer').Deserializer;
//         new JSONAPIDeserializer({keyForAttribute: 'camelCase'}).deserialize(operator, function(err, operator) {
//           console.log(operator);
//           let responseUtil = require('../utils/response');
//           let data = prepareAuthResponse({operatorId: operator.Id, roleId: operator.roleId, email: operator.email});
//           let result: ResponseObj = responseUtil.sendResponse(reqData, true, 200, data);
//           return callback(result);
//         });
//       });
//     },
//     verifyAuth: function(roles: Array<number>) {
//       let responseUtil = require('../utils/response');
//       return (req, res, next) => {
//         jwt.verify(req.headers.token, 'JWT_SECRET_KEY', function(err, decoded) {
//           if (roles.includes(decoded.roleId))
//             next();
//           else {
//             let result: ResponseObj = responseUtil.sendResponse(req.body, true, 403, null, null, 'Access Denied');
//             res.send(result);
//           }
//         });
//       };
//     }
//   };
// }
//
// // Export authService function
// module.exports = auth();
