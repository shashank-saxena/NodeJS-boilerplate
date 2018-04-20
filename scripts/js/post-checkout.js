"use strict";

const shell = require("shelljs");

function postCheckout() {

  let changedFiles = (shell.exec("git diff-tree -r --name-only --no-commit-id ORIG_HEAD HEAD").stdout || "").trim();

  if (changedFiles.indexOf("package.json") !== -1) {
    shell.exec("rm -rf node_modules");
    shell.exec("npm install");
  }
}

postCheckout();
