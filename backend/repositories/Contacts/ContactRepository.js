const users = require("../../models/users/Users");

class ContactRepository {
  async get({ user }) {
    try {
      const contactList = await users
        .find({ _id: { $in: user.contacts } })
        .exec();
      return contactList;
    } catch (error) {
      return error;
    }
  }
}

module.exports = new ContactRepository(users);
