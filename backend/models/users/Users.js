const { encrypt } = require("../../utils/encryption");

const mongoose = require("mongoose"),
  UserSchema = new mongoose.Schema(
    {
      username: {
        type: String,
        required: true,
        unique: true,
        index: true,
      },
      password: {
        type: String,
        required: true,
        select: false,
        set: onSetPassword,
      },
    },
    { timestamps: true }
  );

function onSetPassword(password) {
  return encrypt(password);
}

module.exports = mongoose.model("User", UserSchema);
