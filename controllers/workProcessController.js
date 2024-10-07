const WorkInfoModel = require("../models/workProcess");
const WorkProcessModel = require("../models/workProcess");

exports.getWorkProcess = async (req, res, next) => {
  try {
    WorkProcessModel.find({}).then((data) =>
      res.status(200).send({
        data: data,
        message: "Working Process found successfully!",
        success: true,
      })
    );
  } catch (e) {
    res.status(401).send({
      error: e.message,
      message: "Working Process found successfully!",
      success: false,
    });
  }
};

exports.createWorkProcess = async (req, res, next) => {
  try {
    const workProcess = await WorkInfoModel.create(req.body);
    res.status(201).send({
      data: workProcess,
      message: "Working Process created successfully!",
      success: true,
    });
  } catch (e) {
    res.status(401).send({
      error: e.message,
      message: "Working Process created unsuccessfully",
      success: false,
    });
  }
};
exports.updateWorkProcess = async (req, res, next) => {
  try {
    const filter = {
      workProcessId: req.params.workProcessId,
    };
    const workProcess = await WorkInfoModel.find(filter).populate("user");
    verifyIfUser(req, res, filter, workProcess, WorkInfoModel);
  } catch (e) {
    res.status(401).send({
      message: "Working Process updated unsuccessfully!",
      success: true,
    });
  }
};

exports.deleteWorkProcess = async (req, res, next) => {
  try {
    const filter = {
      workProcessId: req.params.workProcessId,
    };
    const workProcess = await WorkProcessModel.find(filter).populate("user");

    verifyIfUserCanDelete(req, res, filter, workProcess, WorkProcessModel);

  } catch (e) {
    res.status(401).send({
      message: "Working Process deleted unsuccessfully!",
      success: true,
    });
  }
};
