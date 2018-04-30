"use strict";
function config() {

  return {
    "BASE_URL": (process.env.NODE_ENV === "development") ? "https://sbx-paas.bbvacompass.com/" : "https://sbx-paas.bbvacompass.com/"
  };
}

module.exports = config();
