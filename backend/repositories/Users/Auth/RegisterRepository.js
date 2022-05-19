const users = require("../../../models/users/Users"),
  { encrypt } = require("../../../utils/encryption");

class RegisterRepository {
  constructor(model) {
    this.model = model;
  }

  async register({ username, email, password }) {
    const userExist = this.model.findOne({ username });
    if (userExist)
      return {
        message: "Username exist",
        status: 403,
      };
    const newUser = this.model({
      username,
      email,
      password: encrypt(password),
    });

    try {
      const savedUser = await newUser.save();
      return savedUser;
    } catch (error) {
      return error;
    }
  }
}

module.exports = new RegisterRepository(users);
