const { TOKEN_KEY } = require("../../../constants");
const users = require("../../../models/users/Users"),
  jwt = require("jsonwebtoken"),
  { decrypt } = require("../../../utils/encryption"),
  loginSchema = require("../../../schema/auth/loginScema");

class LoginRepository {
  async login(body, res) {
    return await loginSchema
      .validate(body, { abortEarly: false })
      .then(async ({ username, password }) => {
        try {
          const user = await users
            .findOneAndUpdate({ username }, { status: 1 }, { new: true })
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
          delete user.password;
          const accessToken = jwt.sign(user.toJSON(), process.env.JWT_SEC, {
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

module.exports = new LoginRepository();
