const rooms = require("../../models/rooms/Rooms"),
  users = require("../../models/users/Users"),
  { idIsValid } = require("../../utils/db");

class RoomsRepository {
  async get(roomId, contactId) {
    if (roomId && contactId && idIsValid(roomId) && idIsValid(contactId)) {
      try {
        const room = await rooms.findOne({ _id: roomId }).exec(),
          contact = await users.findById(contactId).exec();
        if (room) return { room, contact };
        else {
          return {};
        }
      } catch (error) {
        return error;
      }
    }
  }

  async create(userId, audienceId) {
    const roomExist = await rooms.findOne({ userId, audienceId }).exec();
    if (!roomExist) {
      const room = new rooms({ userId, audienceId });
      try {
        const newRoom = await room.save();
        return {
          message: "Room created successfully.",
          room: newRoom,
          status: 200,
        };
      } catch (error) {
        return {
          message: "Failed to create room.",
          status: 500,
          error,
        };
      }
    } else return roomExist;
  }
}

module.exports = new RoomsRepository();
