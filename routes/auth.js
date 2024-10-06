var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");
const UsersModel = require("../models/user");
const bcrypt = require("bcrypt");
/* GET home page. */
// router.get("/login",);
router.get("/logout", (req, res, next) => {});
router.get("/create", (req, res, next) => {});

module.exports = router;
