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
      contacts: {
        type: Array,
        default: [
          {
            contactId: {
              type: String,
              required: true,
            },
            roomId: {
              type: String,
              required: true,
            },
          },
        ],
      },
    },
    { timestamps: true }
  );

function onSetPassword(password) {
  return encrypt(password);
}

module.exports = mongoose.model("User", UserSchema);
