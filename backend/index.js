const express = require("express"),
  app = express(),
  mongoose = require("mongoose"),
  dotenv = require("dotenv");

dotenv.config();

const _env = process.env;

mongoose
  .connect(_env.MONGO_URL)
  .then(() => console.log("DB Connection successfully!"))
  .catch((error) => console.log(error));

app.use(express.json());

app.listen(_env.PORT || 5000, () => {
  console.log("Backend server is running!");
});
