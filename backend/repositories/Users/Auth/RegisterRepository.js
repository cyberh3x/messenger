const users = require("../../../models/users/Users"),
  registerSchema = require("../../../schema/auth/registerSchema");

class RegisterRepository {
  constructor(model) {
    this.model = model;
  }

  async register(body) {
    return registerSchema
      .validate(body, { abortEarly: false })
      .then(async ({ username, password }) => {
        const userRegistered = await this.model.findOne({ username }).exec();
        if (userRegistered)
          throw {
            message: "This username is already registered.",
            status: 422,
          };
        else {
          const newUser = this.model({
            username,
            password,
          });
          try {
            await newUser.save();
            return {
              message: "Your account has been successfully registered.",
              status: 200,
            };
          } catch (error) {
            return error;
          }
        }
      })
      .catch((errors) => {
        errors.status = 422;
        return errors;
      });
  }
}

module.exports = new RegisterRepository(users);
