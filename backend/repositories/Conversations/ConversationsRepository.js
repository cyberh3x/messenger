const rooms = require("../../models/rooms/Rooms");

class ConversationsRepository {
  async create({ _id, userId, audienceId }, message, { _id: authUserId }) {
    try {
      return await rooms
        .findOneAndUpdate(
          { _id },
          {
            $push: {
              conversations: {
                senderId: authUserId,
                receiverId: authUserId === userId ? audienceId : userId,
                message,
              },
            },
          },
          { new: true }
        )
        .exec();
    } catch (error) {
      return error;
    }
  }
}

module.exports = new ConversationsRepository();
