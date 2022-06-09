const jwt = require("jsonwebtoken"),
  usersModel = require("../../../models/users/Users"),
  { TOKEN_KEY } = require("../../../constants");

const verifyToken = (req, res, next) => {
  const unauthorizedStatus = 401,
    errorMessage = {
      message: "Unauthorized.",
      error: unauthorizedStatus,
    },
    clearCookie = () => res.clearCookie(TOKEN_KEY);
  let token = req.cookies?.token ?? null;
  if (token) {
    token = `Bearer ${token}`;
    jwt.verify(token.split(" ")[1], process.env.JWT_SEC, async (err, user) => {
      if (err) {
        clearCookie();
        res.status(unauthorizedStatus).json(errorMessage);
      }
      req.user = await usersModel.findById(user?._id).exec();
      next();
    });
  } else {
    delete req.user;
    clearCookie();
    res.status(unauthorizedStatus).json(errorMessage);
  }
};

module.exports = verifyToken;
