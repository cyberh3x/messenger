const router = require("express").Router(),
  loginRepository = require("../repositories/Users/Auth/LoginRepository"),
  registerRepository = require("../repositories/Users/Auth/RegisterRepository"),
  logoutRepository = require("../repositories/Users/Auth/LogoutRepository"),
  verifyToken = require("./middlewares/auth/verifyToken"),
  { LOGIN, REGISTER, IDENTITY, LOGOUT } = require("../constants/routes");

router.post(
  LOGIN,
  async (req, res) =>
    await loginRepository
      .login(req.body, res)
      .then((result) => res.status(result.status).json(result))
      .catch((err) => res.status(err.status).json(err))
);

router.post(
  REGISTER,
  async (req, res) =>
    await registerRepository
      .register(req.body)
      .then((result) => res.status(result.status).json(result))
      .catch((err) => res.status(err.status).json(err))
);

router.get(IDENTITY, verifyToken, (req, res) => res.status(200).json(req.user));

router.put(
  LOGOUT,
  verifyToken,
  async (req, res) =>
    await logoutRepository
      .logout(req, res)
      .then((result) => res.status(result.status).json(result))
      .catch((error) => res.status(error.status).json(error))
);

module.exports = router;
