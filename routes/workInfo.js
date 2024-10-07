var express = require("express");
var router = express.Router();
const {
  deleteWorkInfo,
  updateWorkInfo,
  createWorkInfo,
  getWorkInfo,
} = require("../controllers/workInfoController");
/* GET home page. */
router.get("/workInfo", getWorkInfo);
router.post("/workInfo", createWorkInfo);
router.put("/workInfo/:workInfoId", updateWorkInfo);
router.delete("/workInfo/:workInfoId", deleteWorkInfo);

module.exports = router;
