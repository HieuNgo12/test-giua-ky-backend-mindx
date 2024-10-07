const { verifyIfUserCanDelete } = require("../middlewares/authentication");
const PersonalInfoModel = require("../models/personalInfo");

exports.getPersonalInfo = (req, res, next) => {
  try {
    PersonalInfoModel.find({}).then((data) =>
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

exports.createPersonalInfo = async (req, res, next) => {
  try {
    const personalInfo = await PersonalInfoModel.create(req.body);
    res.status(201).send({
      data: personalInfo,
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
exports.updatePersonalInfo = async (req, res, next) => {
  try {
    const filter = {
      personalInfoId: req.params.personalInfoId,
    };
    const personalInfo = await PersonalInfoModel.find(filter).populate("user");
    verifyIfUser(req, res, filter, personalInfo, PersonalInfoModel);
    res.status(201).send({
      data: personalInfo,
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

exports.deletePersonalInfo = async (req, res, next) => {
  try {
    const filter = { personalInfoId: req.params.personalInfoId };
    const personalInfo = await PersonalInfoModel.find(filter).populate("user");

    verifyIfUserCanDelete(req, res, filter, personalInfo, PersonalInfoModel);
  } catch (e) {
    res.status(401).send({
      error: e,
      message: "Working Infomation created unsuccessfully",
      success: false,
    });
  }
};
