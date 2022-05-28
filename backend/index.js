if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express"),
  app = express(),
  mongoose = require("mongoose"),
  authRoutes = require("./routes/auth"),
  userRoutes = require("./routes/user"),
  createError = require("http-errors"),
  path = require("path"),
  cookieParser = require("cookie-parser"),
  logger = require("morgan"),
  cors = require("cors"),
  socket = require("./socket"),
  { API, AUTH, USER } = require("./constants/routes"),
  { _ENV } = require("./constants");

mongoose
  .connect(_ENV.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connection successfully!"))
  .catch((error) => console.log(error));

app.use(
  cors({ credentials: true, origin: _ENV.CLIENT_URL }),
  function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", _ENV.CLIENT_URL);
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
  }
);
app.use(logger("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(`${API}${AUTH}`, authRoutes);
app.use(`${API}${USER}`, userRoutes);
app.use((req, res, next) => {
  next(createError(404));
});
app.use((err, req, res) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

app.listen(_ENV.PORT || 5000, () => {
  console.log("Backend server is running!");
});
