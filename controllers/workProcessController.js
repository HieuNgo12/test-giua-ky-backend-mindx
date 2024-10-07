const WorkInfoModel = require("../models/workInfo");
const WorkProcessModel = require("../models/workProcess");

exports.getWorkProcess = async (req, res, next) => {
  try {
    WorkProcessModel.find({}).then((data) =>
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

exports.createWorkProcess = async (req, res, next) => {
  try {
    const workInfo = await WorkInfoModel.create(req.body);
    res.status(201).send({
      data: workInfo,
      message: "Working Infomation created successfully!",
      success: true,
    });
  } catch (e) {
    res.status(401).send({
      error: e.message,
      message: "Working Infomation created unsuccessfully",
      success: false,
    });
  }
};
exports.updateWorkProcess = async (req, res, next) => {
  try {
    const filter = {
        workInfoId: req.params.workInfoId,
      }
    const workInfo = await WorkInfoModel.find(filter).populate("user");
    verifyIfUser(req, res, filter, workInfo, WorkInfoModel);
  } catch (e) {
    res.status(401).send({
      message: "Working Infomation updated unsuccessfully!",
      success: true,
    });
  }
};

exports.deleteWorkProcess = async (req, res, next) => {
  try {
    const workInfo = await WorkInfoModel.deleteOne({
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
