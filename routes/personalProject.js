var express = require("express");
var router = express.Router();
const {
  deletePersonalProject,
  updatePersonalProject,
  createPersonalProject,
  getPersonalProject,
} = require("../controllers/personalProjectController");
/* GET home page. */
router.get("/personalProject", getPersonalProject);
router.post("/personalProject", createPersonalProject);
router.put("/personalProject/:personalProjectId", updatePersonalProject);
router.delete("/personalProject/:personalProjectId", deletePersonalProject);

module.exports = router;
