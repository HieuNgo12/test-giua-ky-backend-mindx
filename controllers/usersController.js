const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const UserModel = require("../models/user");

exports.login = async (req, res, next) => {
  // const { email, password } = req.body;
  try {
    const password = req.body.password;
    let email = req.body.email;
    let username = req.body.username;
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
    console.log(currentUser);
    if (!currentUser) throw new Error("Wrong username or password!");
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);

    bcrypt.compare(password, currentUser.password).then(function (result) {
      // result == true

      if (result && currentUser) {
        const userData = {
          id: currentUser.id,
          email: currentUser.email,
        };

        const token = jwt.sign(userData, "secret-key", { expiresIn: "1h" });

        res.cookie("auth_token", token, {
          httpOnly: true, // Cookie chỉ được truy cập qua HTTP(S), không thể truy cập qua JavaScript
          secure: process.env.NODE_ENV === "production", // Cookie chỉ hoạt động trên HTTPS khi ở production
          maxAge: 3600000, // Cookie hết hạn sau 1 giờ (1h * 60m * 60s * 1000ms)
        });

        return res.status(200).send({
          data: token,
          message: "Login successful!",
          success: true,
        });
      } else {
        res.status(403).send({
          message: "Password is incorrect",
          data: null,
          success: false,
        });
      }
    });
    console.log(hashingPasswordLogin);
    if (hashingPasswordLogin !== currentUser.password)
      res.status(401).send({
        message: "Failed to Log In! Wrong username or password",
      });

    const token = jwt.sign(currentUser, "secret-key", { expiresIn: "1h" });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 3600000,
    });

    req.headers.authorization = `Bearer + ${token}`;

    res.status(201).send({
      data: token,
      message: "Login successfully!",
      email,
    });
  } catch (e) {
    // res.status(401).send({
    //   message: e.error,
    //   data: null,
    // });
  }
};

exports.createUser = async (req, res, next) => {
  try {
    let { username, email, password } = req.body;
    console.log(username, email, password);
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
    const saltRounds = 10;

    bcrypt.hash(password, saltRounds, async function (err, hashedPassword) {
      if (err) res.send("Have error when create account " + err.message);
      // Store hash in your password DB.

      const newUser = {
        username: username,
        email: email,
        password: hashedPassword,
      };

      const user = await UserModel.create(newUser);

      res.status(200).send({
        message: "User Created Successfully",
        data: user,
        success: false,
      });
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
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
    req.headers.authorization = "";
    res.status(200).json({ message: "You are logged out!" });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
  res.end();
};
