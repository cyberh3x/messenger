const { generate } = require("../../utils/uuid"),
  mongoose = require("mongoose"),
  ConversationsSchema = new mongoose.Schema(
    {
      senderId: {
        type: String,
        required: true,
      },
      receiverId: {
        type: String,
      },
      message: {
        type: String,
        required: true,
      },
      replyTo: {
        type: String,
        default: null,
      },
      status: {
        type: Number,
        default: 0,
      },
    },
    { timestamps: true }
  ),
  RoomsSchema = new mongoose.Schema(
    {
      userId: {
        type: String,
        required: true,
        index: true,
      },
      conversations: [ConversationsSchema],
    },
    { timestamps: true }
  );

module.exports = mongoose.model("Rooms", RoomsSchema);
