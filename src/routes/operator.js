module.exports = function(app, router) {
  let operatorController = require('../controllers/operator');
  let auth = require('../utils/auth');
  var validate = require('express-validation');
  var validation = require('../request_validations/operator.js');
  router.get('/', auth.verifyAuth([2, 3]), operatorController.print);
  router.post('/', validate(validation), operatorController.create);
  router.post('/login', operatorController.login);
  app.use('/operator', router);
};
