const jwt = require("jsonwebtoken");
const { TOKEN_KEY } = require("../../../constants");

const verifyToken = (req, res, next) => {
  const unauthorizedStatus = 401,
    errorMessage = {
      message: "Unauthorized.",
      error: unauthorizedStatus,
    };
  let token = req.cookies[TOKEN_KEY] ?? null;
  if (token) {
    token = `Bearer ${token}`;
    console.log(token);
    jwt.verify(token.split(" ")[1], process.env.JWT_SEC, (err, user) => {
      if (err) res.status(unauthorizedStatus).json(errorMessage);
      req.user = user;
      next();
    });
  } else {
    res.clearCookie(TOKEN_KEY);
    res.status(unauthorizedStatus).json(errorMessage);
  }
};

module.exports = verifyToken;
