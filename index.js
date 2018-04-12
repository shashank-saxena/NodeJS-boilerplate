var ct = require("./build/utils/constants");

console.log(ct);
ct.d = 'he';
console.log(ct);

// require("dotenv").config();
// const express = require("express");
// const app = express();
// // let helmet = require("helmet");
// // let hpp = require("hpp");
// // let cors = require("cors");
// // let router = express.Router();
// let bodyParser = require("body-parser");
// app.use(bodyParser.urlencoded({
//   extended: true
// }));
//
// app.use(bodyParser.json());
// // app.use(cors());
// // app.use(helmet());
// // app.use(hpp());
// app.use(function (req, res, next) {
//   req.body.startTime = Date.now();
//   next();
// });
// app.get("/", function (req, res) {
//   res.send("Hello World....!!!!");
// });
//
// app.listen(3000, () => console.log("Example app listening on port 3000!"));
// app.use("/operators", require("./build/routes/operator"));
// app.use("/aircrafts", require("./build/routes/aircraft"));
// // require("./build/routes/operator")(app, router);
//
// module.exports = app;
