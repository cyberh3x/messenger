const router = require("express").Router(),
  contactRepository = require("../repositories/Contacts/ContactRepository"),
  verifyToken = require("./middlewares/auth/verifyToken"),
  { CONTACTS } = require("../constants/routes");

router.get(
  CONTACTS,
  verifyToken,
  async (req, res) =>
    await contactRepository
      .get(req)
      .then((result) => res.status(result.status || 200).json(result))
      .catch((err) => res.status(err.status || 500).json(err))
);

module.exports = router;
