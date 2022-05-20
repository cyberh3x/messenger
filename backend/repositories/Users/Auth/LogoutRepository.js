const { TOKEN_KEY } = require("../../../constants");

class LogoutRepository {
  async logout(req, res) {
    try {
      const token = req.cookies?.token;
      if (token) {
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
