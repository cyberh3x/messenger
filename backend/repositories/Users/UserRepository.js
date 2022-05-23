const users = require("../../models/users/Users");

class UserRepository {
  constructor(model) {
    this.model = model;
  }
}

module.exports = new UserRepository(users);
