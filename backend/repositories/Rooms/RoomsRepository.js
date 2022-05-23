const rooms = require("../../models/rooms/Rooms");

class RoomsRepository {
  constructor(model) {
    this.model = model;
  }

  async get(roomId) {
    try {
      const room = await this.model.findById(roomId).exec();
      if (room) return room;
      else
        throw {
          message: "Room not found",
          status: 404,
        };
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async create(userId, audienceId) {
    const roomExist = await this.model.find({ userId, audienceId }).exec();
    if (!roomExist) {
      const newRoom = new this.model({ userId, audienceId });
      try {
        await newRoom.save();
        return {
          message: "Room created successfully.",
          status: 200,
        };
      } catch (error) {
        return {
          message: "Failed to create room.",
          status: 500,
          error,
        };
      }
    }
  }
}

module.exports = new RoomsRepository(rooms);
