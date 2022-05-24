const router = require("express").Router(),
  contactRepository = require("../repositories/Contacts/ContactRepository"),
  verifyToken = require("./middlewares/auth/verifyToken"),
  validateUserId = require("./middlewares/users/validateUserId"),
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

router.get(
  `${CONTACTS}/:id`,
  [verifyToken, validateUserId],
  async (req, res) =>
    await contactRepository
      .show(req)
      .then((result) => res.status(result.status || 200).json(result))
      .catch((err) => res.status(err.status || 500).json(err))
);

router.post(
  `${CONTACTS}`,
  verifyToken,
  async (req, res) =>
    await contactRepository
      .create(req)
      .then((result) => res.status(result.status || 200).json(result))
      .catch((err) => res.status(err.status || 500).json(err))
);

router.delete(
  CONTACTS,
  [verifyToken, validateUserId],
  async (req, res) =>
    await contactRepository
      .destory(req)
      .then((result) => res.status(result.status || 200).json(result))
      .catch((err) => res.status(err.status || 500).json(err))
);

module.exports = router;
