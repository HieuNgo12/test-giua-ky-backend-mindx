var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user");
const bcrypt = require("bcrypt");
/* GET home page. */
router.get("/login", async (req, res, next) => {
  const { email, password } = req.body;
  const currentUser = await UserModel.findOne({ email });
  if (!currentUser) throw new Error("Sai tài khoản hoặc mật khẩu");

  const hashingPasswordLogin = bcrypt.hashSync(password, currentUser.salt);
  if (hashingPasswordLogin !== currentUser.password)
    throw new Error("Sai tài khoản hoặc mật khẩu");

  res.status(201).send({
    message: "Login successfully!",
    email,
  });
});
router.get("/logout", async (req, res, next) => {
  try {
    const authHeader = req.headers["cookie"]; // get the session cookie from request header
    if (!authHeader) return res.sendStatus(204); // No content
    const cookie = authHeader.split("=")[1]; // If there is, split the cookie string to get the actual jwt token
    const accessToken = cookie.split(";")[0];

    // Also clear request cookie on client
    res.setHeader("Clear-Site-Data", '"cookies"');
    res.status(200).json({ message: "You are logged out!" });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
  res.end();
});
router.post("/create", async (req, res, next) => {
  try {
    let { username, email, password } = req.body;
    // Validate dữ liệu
    if (!email) {
      return res.status(400).send("Email is required");
    } else {
      email = email.trim();
    }

    if (!username) {
      return res.status(400).send("Username is required");
    } else {
      username = username.trim();
    }

    if (!password) {
      return res.status(400).send("Password is required");
    } else {
      password = password.trim();
    }

    const isExistUser = await UserModel.findOne({ email: email }).exec();

    if (isExistUser) {
      return res.status(400).send("Email already exists");
    }

    bcrypt.hash(password, saltRounds, async function (err, hashedPassword) {
      if (err) res.send("Have error when create account " + err.message);
      // Store hash in your password DB.

      const newUser = {
        username: username,
        email: email,
        password: hashedPassword,
      };

      await UserModel.create(newUser);

      res.status(200).send("ok");
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = router;
