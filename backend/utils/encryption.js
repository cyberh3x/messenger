const CryptoJS = require("crypto-js"),
  _env = process.env,
  unicode = CryptoJS.enc.Utf8,
  encrypt = (data) => {
    return CryptoJS.AES.encrypt(data.toString(), _env.PASS_SEC).toString(
      unicode
    );
  },
  decrypt = (data) => {
    return CryptoJS.AES.decrypt(data.toString(), _env.PASS_SEC).toString(
      unicode
    );
  };

module.exports = {
  encrypt,
  decrypt,
};
