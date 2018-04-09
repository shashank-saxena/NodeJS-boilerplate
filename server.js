'use strict';
require('dotenv').config();
const express = require('express');
const app = express();
let helmet = require('helmet');
let hpp = require('hpp');
let cors = require('cors');
let router = express.Router();
let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());
app.use(cors());
app.use(helmet());
app.use(hpp());
app.get('/', function (req, res){
	res.send("Hello World....!!!!");
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));

module.exports = app;
