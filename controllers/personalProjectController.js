const PersonalProject = require("../models/personalProject");
const WorkInfoModel = require("../models/workInfo");

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

exports.createWorkInfo = async (req, res, next) => {
  try {
    const workInfo = await PersonalProject.create(req.body);
    res.status(201).send({
      data: workInfo,
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
exports.updateWorkInfo = async (req, res, next) => {
  try {
    const filter = {
      workInfoId: req.params.workInfoId,
    };
    const personalInfo = await WorkInfoModel.find(filter).populate("user");
    verifyIfUser(req, res, filter, personalInfo, PersonalInfoModel);
  } catch (e) {
    res.status(401).send({
      message: "Working Infomation updated unsuccessfully!",
      success: true,
    });
  }
};

exports.deleteWorkInfo = async (req, res, next) => {
  try {
    const workInfo = await PersonalProject.delete({
      workInfoId: req.params.workInfoId,
    });
    res.status(201).send({
      data: workInfo,
      message: "Working Infomation deleted successfully!",
      success: true,
    });
  } catch (e) {
    res.status(401).send({
      message: "Working Infomation deleted unsuccessfully!",
      success: true,
    });
  }
};
