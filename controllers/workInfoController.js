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
      error: e,
      message: "Working Infomation created unsuccessfully",
      success: false,
    });
  }
};
exports.updateWorkInfo = async (req, res, next) => {
  try {
    const workInfo = await WorkInfoModel.find({
      workInfoId: req.params.workInfoId,
    }).populate("user");
    const currentToken = req.header("auth-token");
    if (!currentToken) {
      return res.status(401).send({ err: "Token is expired" });
    }
    jwt.verify(currentToken, "secret-key", async (err, decoded) => {
      console.log(decoded.username); // bar
      if (decoded.username === workInfo.user.username) {
        await WorkInfoModel.find({
          workInfoId: req.params.workInfoId,
        }).update(req.body);
        res.status(201).send({
          data: workInfo,
          message: "Working Infomation updated successfully!",
          success: true,
        });
      }
    });
  } catch (e) {
    res.status(401).send({
      message: "Working Infomation updated unsuccessfully!",
      success: true,
    });
  }
};

exports.deleteWorkInfo = async (req, res, next) => {
  try {
    const workInfo = await WorkInfoModel.delete({
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
