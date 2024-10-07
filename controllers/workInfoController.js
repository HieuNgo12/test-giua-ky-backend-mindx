const WorkInfoModel = require("../models/workInfo");

exports.getWorkInfo = async (req, res, next) => {
  try {
    WorkInfoModel.find({}).then((data) =>
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
exports.updateWorkInfo = async (req, res, next) => {
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

exports.deleteWorkInfo = async (req, res, next) => {
  try {
    const filter = {
      workInfoId: req.params.workInfoId,
    }
    const workProcess = await WorkInfoModel.find(filter).populate("user");

    verifyIfUserCanDelete(req, res, filter, workProcess, WorkInfoModel);

  } catch (e) {
    res.status(401).send({
      message: "Working Infomation deleted unsuccessfully!",
      success: true,
    });
  }
};
