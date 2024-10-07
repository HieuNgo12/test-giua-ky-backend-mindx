const PersonalInfoModel = require("../models/personalInfo");

exports.getPersonalInfo = (req, res, next) => {
  try {
    AdditionalInfoModel.find({}).then((data) =>
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
    const workInfo = await WorkInfoModel.create(req.body);
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
exports.updatePersonalInfo = async (req, res, next) => {
  try {
    const filter = {
      personalProjectId: req.params.personalProjectId,
    };
    const personalInfo = await PersonalInfoModel.find(filter).populate("user");
    verifyIfUser(req, res, filter, personalInfo, PersonalInfoModel);
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

exports.deletePersonalInfo = async (req, res, next) => {
  try {
    const workInfo = await WorkInfoModel.deleteOne(req.params.personalInfoId);
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
