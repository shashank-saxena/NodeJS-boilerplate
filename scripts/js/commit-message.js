"use strict";

const shell = require("shelljs");
const chalk = require("chalk");
const config = require("../git-hooks-config.json");

function commitMessage() {
  // this will provide us the passed arguments from npm script
  const argv = require("yargs").argv;

  let commitMsg = shell.cat(argv.gitParams);

  shell.echo(chalk.green("Commit Message: Checks started"));

  if (commitMsg.trim().length > config.COMMIT_MSG_LENGTH) {
    shell.echo(chalk.red("Your commit message is too long, keep it less than 64 chars!"));
    shell.exit(1);
  } else {
    shell.echo(chalk.green("Commit Message: Checks OK"));
  }
}

commitMessage();
