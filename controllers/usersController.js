const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const UserModel = require("../models/user");

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
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
  const currentUser = await UserModel.findOne({ email });
  if (!currentUser) throw new Error("Wrong username or password!");

  const hashingPasswordLogin = bcrypt.hashSync(password, currentUser.salt);
  if (hashingPasswordLogin !== currentUser.password)
    throw new Error("Wrong username or password!");

  res.status(201).send({
    message: "Login successfully!",
    email,
  });
};

exports.createUser = (req, res, next) => {
  async (req, res, next) => {
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
  };
};

exports.updateUser = (req, res, next) => {
  async (req, res, next) => {
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
  };
};

exports.logout = async (req, res, next) => {
  try {
    const authHeader = req.headers["cookie"];
    if (!authHeader) return res.sendStatus(204);
    const cookie = authHeader.split("=")[1];
    const accessToken = cookie.split(";")[0];
    res.setHeader("Clear-Site-Data", '"cookies"');
    res.status(200).json({ message: "You are logged out!" });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
  res.end();
};
