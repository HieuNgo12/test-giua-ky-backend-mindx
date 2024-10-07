var express = require("express");
var router = express.Router();
const { createUser, logout, login } = require("../controllers/usersController");
/* GET home page. */
router.post("/login", login);
router.post("/logout", logout);
router.post("/create", createUser);

module.exports = router;
