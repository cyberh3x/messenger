const { idIsValid } = require("../../../utils/db");

const validateUserId = (req, res, next) => {
  if (
    ("id" in req.params || "id" in req.body) &&
    idIsValid(req.body.id ?? req.params.id)
  )
    next();
  else
    res.status(422).json({
      message: "User ID is not valid.",
      status: 422,
    });
};

module.exports = validateUserId;
