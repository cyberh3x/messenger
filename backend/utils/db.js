const { default: mongoose } = require("mongoose");

const idIsValid = (id) => mongoose.Types.ObjectId.isValid(id);

module.exports = { idIsValid };
