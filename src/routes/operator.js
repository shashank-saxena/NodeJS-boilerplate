function operator () {
  let router = require("express").Router();
  let operatorController = require("../controllers/operator-controller");
  router.get("/", operatorController.get);

  router.get("/:id/aircraft", function (req, res) {
    res.send("get operator's aircraft");
  });
  return router;
}

module.exports = operator();
