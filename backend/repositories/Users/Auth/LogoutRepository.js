const users = require("../../../models/users/Users"),
  { io } = require("../../../socket"),
  { TOKEN_KEY } = require("../../../constants");

class LogoutRepository {
  async logout(req, res) {
    try {
      const token = req.cookies?.token;
      if (token) {
        const user = await users
          .findOneAndUpdate({ _id: req.user._id }, { status: 0 }, { new: true })
          .exec();
        delete req.user;
        res.clearCookie(TOKEN_KEY);
        return {
          message: "You logging out successfully.",
          status: 200,
        };
      } else
        throw {
          message: "Failed to logout.",
          status: 500,
        };
    } catch (error) {
      return error;
    }
  }
}

module.exports = new LogoutRepository();
