// @flow
function user (): any {
  return {
    get: function (req: any, res: any): void {
      res.send("get operators");
    }
  };
}

module.exports = user();
