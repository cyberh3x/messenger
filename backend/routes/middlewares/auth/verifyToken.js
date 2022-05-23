const jwt = require("jsonwebtoken"),
  usersModel = require("../../../models/users/Users"),
  { TOKEN_KEY } = require("../../../constants");

const verifyToken = (req, res, next) => {
  const unauthorizedStatus = 401,
    errorMessage = {
      message: "Unauthorized.",
      error: unauthorizedStatus,
    };
  let token = req.cookies[TOKEN_KEY] ?? null;
  if (token) {
    token = `Bearer ${token}`;
    jwt.verify(token.split(" ")[1], process.env.JWT_SEC, async (err, user) => {
      if (err) res.status(unauthorizedStatus).json(errorMessage);
      req.user = await usersModel.findById(user._id).exec();
      next();
    });
  } else {
    res.clearCookie(TOKEN_KEY);
    res.status(unauthorizedStatus).json(errorMessage);
  }
};

module.exports = verifyToken;
