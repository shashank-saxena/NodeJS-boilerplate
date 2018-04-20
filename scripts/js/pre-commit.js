"use strict";

const shell = require("shelljs");
const chalk = require("chalk");
const config = require("../git-hooks-config.json");

let logs = [];
let exitOnError = false;

function lintJsAndJsonFiles() {
  let changedJsAndJsonFiles = (shell.exec("git diff HEAD --staged --name-only --diff-filter=ACM | grep '.[js|json]$'", { "silent": true }).stdout || "").trim();

  if (!changedJsAndJsonFiles) {
    return true;
  }
  changedJsAndJsonFiles = changedJsAndJsonFiles.replace(/\n/gi, " ");

  // remove ignored file
  changedJsAndJsonFiles = changedJsAndJsonFiles.replace(".eslintrc.json", "");

  // this will check the code and break the commit
  // if any linting errors found
  let shellStr = shell.exec("eslint " + changedJsAndJsonFiles, { "silent": true });

  if (shellStr.code !== 0) {
    logs.push(chalk.blue("eslint: Linting issues in your changed code!"));
    logs.push(chalk.red(shellStr.stdout));
    exitOnError = true;
  } else {
    logs.push(chalk.green("eslint: Linting finished with no errors"));
  }
}

function lintYmlFiles() {
  let changedYamlFiles = (shell.exec("git diff HEAD --name-only --diff-filter=ACM | grep '.[yml]$'", { "silent": true }).stdout || "").trim();

  if (!changedYamlFiles) {
    return true;
  }
  changedYamlFiles = changedYamlFiles.replace(/\n/gi, " ");

  let shellStr = shell.exec("yamllint " + changedYamlFiles, { "silent": true });

  if (shellStr.code !== 0) {
    logs.push(chalk.blue("yamllint: Linting issues in your changed code!"));
    logs.push(chalk.red(shellStr.stdout));
    exitOnError = true;
  } else {
    logs.push(chalk.green("yamllint: Linting finished with no errors"));
  }
}

function verifyInstallation() {
  let stagedJsonFiles = shell.exec("git diff --staged --name-only | grep '.json$'", { "silent": true }).stdout;
  let isPackagaeJsonExists = (stagedJsonFiles.trim().indexOf("package.json") !== -1);
  let isPackageLockExists = (stagedJsonFiles.trim().indexOf("package-lock.json") !== -1);

  if (!isPackagaeJsonExists && isPackageLockExists) {
    logs.push(chalk.red("npm packages: Change detected in package-lock.json file, without any changes in package.json!"));
    exitOnError = true;
  } else {
    logs.push(chalk.red(chalk.green("npm packages: package.json & package-lock.json are ok")));
  }
}

function checkFilenames() {
  let fileNames = (shell.exec("git diff HEAD --name-only --diff-filter=ACMR | grep '.js$'", { "silent": true }).stdout || "").trim();

  if(!fileNames) {
    return true;
  }

  let dirsToValidate = config.VALIDATE_DIR_FILE_NAMES;
  let validFilenamesRegex = /src\/([a-z]*)\/([a-z-]*)\.js/;
  let fileNamesArr = fileNames.split("\n");

  for (let i = 0; i < fileNamesArr.length; i++) {
    let groups = validFilenamesRegex.exec(fileNamesArr[i].trim());

    if (groups && dirsToValidate.indexOf(groups[1]) !== -1) {
      let temp = groups[2].split("-");
      let fileSuffix = temp[temp.length - 1];

      fileSuffix = (groups[1] === "routes" ? fileSuffix : (fileSuffix + "s"));
      if (groups[1] !== fileSuffix) {
        logs.push(chalk.red("file names: " + fileNamesArr[i] + " is an invalid file name"));
        exitOnError = true;
      }
    }
  }
}

function logMessages() {
  shell.echo(chalk.green("Pre-commit: Checks started"));

  for (let i = 0; i < logs.length; i++) {
    shell.echo(logs[i]);
  }
  shell.echo(chalk.green("Pre-commit: Checks finished"));

  if (exitOnError) {
    shell.exit(1);
  }
}

function preCommit() {
  if (!shell.which("eslint")) {
    logs.push(chalk.red("Sorry, this script requires eslint"));
    exitOnError = true;
  } else {
    lintJsAndJsonFiles();
    lintYmlFiles();
    checkFilenames();
    verifyInstallation();
  }
  logMessages();
}

preCommit();
