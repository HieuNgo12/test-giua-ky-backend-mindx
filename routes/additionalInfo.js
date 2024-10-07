var express = require("express");
var router = express.Router();
const {
  deleteAdditionalInfo,
  updateAdditionalInfo,
  createAdditionalInfo,
  getAdditionalInfo,
} = require("../controllers/additionalInfoController");
/* GET home page. */
router.get("/additionalInfo", getAdditionalInfo);
router.post("/additionalInfo", createAdditionalInfo);
router.put("/additionalInfo/:additionalInfoId", updateAdditionalInfo);
router.delete("/additionalInfo/:additionalInfoId", deleteAdditionalInfo);

module.exports = router;
