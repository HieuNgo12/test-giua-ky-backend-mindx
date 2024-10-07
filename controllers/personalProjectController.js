const PersonalProject = require("../models/personalProject");

exports.getPersonalProject = async (req, res, next) => {
  try {
    PersonalProject.find({}).then((data) =>
      res.status(200).send({
        data: data,
        message: "Working Infomation found successfully!",
        success: true,
      })
    );
  } catch (e) {
    res.status(401).send({
      error: e.message,
      message: "Working Infomation found successfully!",
      success: false,
    });
  }
};

exports.createPersonalProject = async (req, res, next) => {
  try {
    const personalProject = await PersonalProject.create(req.body);
    res.status(201).send({
      data: personalProject,
      message: "Working Infomation created successfully!",
      success: true,
    });
  } catch (e) {
    res.status(401).send({
      error: e,
      message: "Working Infomation created unsuccessfully",
      success: false,
    });
  }
};
exports.updatePersonalProject = async (req, res, next) => {
  try {
    const filter = {
      personalProjectId: req.params.personalProjectId,
    };
    const personalInfo = await PersonalProject.find(filter).populate(
      "user"
    );
    verifyIfUser(req, res, filter, personalInfo, PersonalProject);
  } catch (e) {
    res.status(401).send({
      message: "Working Infomation updated unsuccessfully!",
      success: true,
    });
  }
};

exports.deletePersonalProject = async (req, res, next) => {
  try {
    const filter = {
      workInfoId: req.params.workInfoId,
    };
    const personalProject = await PersonalProjectModel.find(filter).populate(
        "user"
      );
    verifyIfUserCanDelete(req, res, filter, personalProject, PersonalProject);


  } catch (e) {
    res.status(401).send({
      message: "Working Infomation deleted unsuccessfully!",
      success: true,
    });
  }
};
