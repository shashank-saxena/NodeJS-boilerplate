"use strict";

// TODO(Shashank): we can keep `semver` in lib so that we check for node version before npm install too
var semver = require("semver");
var config = require("./package.json");

var nodeVersion = config.engines.node;
var npmVersion = config.engines.npm;

if (!semver.satisfies(process.version, nodeVersion)) {
  console.log("Required node version " + nodeVersion + " not satisfied with current version " + process.version + ".");
  process.exit(1);
}

if (!semver.satisfies(semver.clean(process.env.npm_package_engines_npm), npmVersion)) {
  console.log("Required npm version " + npmVersion + " not satisfied with current version " + process.env.npm_package_engines_npm + ".");
  process.exit(1);
}
