const crypto = require("crypto");
const createHash = (string) => {
  return crypto.createHash("md5").update(string).digest("hex");
};
module.exports = createHash;
