const { generate } = require("../../utils/uuid"),
  mongoose = require("mongoose"),
  ConversationsSchema = new mongoose.Schema(
    {
      id: {
        type: Number,
        default: generate(),
      },
      senderId: {
        type: Number,
        required: true,
      },
      receiverId: {
        type: Number,
      },
      message: {
        type: String,
        required: true,
      },
      replyTo: {
        type: String,
        default: null,
      },
    },
    { timestamps: true }
  ),
  RoomsSchema = new mongoose.Schema(
    {
      userId: {
        type: Number,
        required: true,
        index: true,
      },
      audienceId: {
        type: Number,
        required: true,
        index: true,
      },
      conversations: [ConversationsSchema],
    },
    { timestamps: true }
  );

module.exports = mongoose.model("Rooms", RoomsSchema);
