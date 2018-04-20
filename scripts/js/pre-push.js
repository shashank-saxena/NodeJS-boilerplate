"use strict";

const shell = require("shelljs");
const chalk = require("chalk");
const config = require("../git-hooks-config.json");

function prePush() {
  let currentBranch = (shell.exec("git rev-parse --abbrev-ref HEAD", { "silent": true }).stdout || "").trim();

  if (!currentBranch) {
    return true;
  }

  if (config.DISABLE_BRANCHES_PUSH.indexOf(currentBranch) !== -1) {
    shell.echo(chalk.red("Disable push: Direct push to " + chalk.underline.bold(currentBranch) + " branch has been disbaled. You can create a pull request to merge your changes to this branch"));
    shell.exit(1);
  }
}

prePush();
