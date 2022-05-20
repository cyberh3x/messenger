const { TOKEN_KEY } = require("../../../constants");
const users = require("../../../models/users/Users"),
  jwt = require("jsonwebtoken"),
  { decrypt } = require("../../../utils/encryption"),
  loginSchema = require("../../../schema/auth/loginScema");

class LoginRepository {
  constructor(model) {
    this.model = model;
  }

  async login(body, res) {
    return await loginSchema
      .validate(body, { abortEarly: false })
      .then(async ({ username, password }) => {
        try {
          const user = await this.model
            .findOne({ username }, null)
            .select("+password")
            .exec();
          if (!user)
            throw {
              message: "User not found.",
              status: 401,
            };
          const storedPassword = decrypt(user.password);
          if (storedPassword !== password)
            throw {
              message: "Unauthorized.",
              status: 401,
            };
          delete user._doc.password;
          const accessToken = jwt.sign(user._doc, process.env.JWT_SEC, {
            expiresIn: "3d",
          });
          res.cookie(TOKEN_KEY, accessToken);
          return { user: { ...user._doc, accessToken }, status: 200 };
        } catch (error) {
          return error;
        }
      })
      .catch((errors) => {
        errors.status = 422;
        return errors;
      });
  }
}

module.exports = new LoginRepository(users);
