const { encrypt } = require("../../utils/encryption");

const mongoose = require("mongoose"),
  ContactsSchema = new mongoose.Schema({
    contactId: {
      type: String,
      required: true,
    },
    roomId: {
      type: String,
      required: true,
    },
  }),
  UserSchema = new mongoose.Schema(
    {
      firstName: {
        type: String,
        default: null,
      },
      lastName: {
        type: String,
        default: null,
      },
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
      contacts: [ContactsSchema],
      status: {
        type: Number,
        default: 0,
      },
    },
    { timestamps: true }
  );

function onSetPassword(password) {
  return encrypt(password);
}

module.exports = mongoose.model("User", UserSchema);
