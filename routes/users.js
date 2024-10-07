var express = require("express");
var router = express.Router();
const { createUser, logout, login } = require("../controllers/usersController");
/* GET home page. */
router.get("/login", login);
router.get("/logout", logout);
router.post("/create", createUser);

module.exports = router;
