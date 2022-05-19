const { TOKEN_KEY } = require("../../../constants");
const users = require("../../../models/users/Users"),
  jwt = require("jsonwebtoken"),
  { decrypt } = require("../../../utils/encryption");

class LoginRepository {
  constructor(model) {
    this.model = model;
  }

  async login({ username, password: sendedPassword }, res) {
    try {
      const user = await this.model.findOne({ username });
      if (!user)
        throw {
          message: "User not found.",
          status: 404,
        };
      const storedPassword = decrypt(user.password);
      if (storedPassword !== sendedPassword)
        throw {
          message: "Unauthorized.",
          status: 401,
        };
      const { password, ...others } = user._doc;
      const accessToken = jwt.sign(others, process.env.JWT_SEC, {
        expiresIn: "3d",
      });
      res.cookie(TOKEN_KEY, accessToken);
      return { ...others, accessToken, status: 200 };
    } catch (error) {
      return error;
    }
  }
}

module.exports = new LoginRepository(users);
