const { v4: uuidv4 } = require("uuid"),
  generate = () => uuidv4();

module.exports = { generate };
