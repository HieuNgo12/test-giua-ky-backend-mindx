var express = require("express");
var router = express.Router();
const {
  deleteWorkProcess,
  updateWorkProcess,
  createWorkProcess,
  getWorkProcess,
} = require("../controllers/workProcessController");
/* GET home page. */
router.get("/workProcess", getWorkProcess);
router.post("/workProcess", createWorkProcess);
router.put("/workProcess/:workProcessId", updateWorkProcess);
router.delete("/workProcess/:workProcessId", deleteWorkProcess);

module.exports = router;
