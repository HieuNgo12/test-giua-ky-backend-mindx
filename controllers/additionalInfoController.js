const AdditionalInfoModel = require("../models/additionalInfo");
const WorkInfoModel = require("../models/workInfo");

exports.getAdditionalInfo = (req, res, next) => {
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

exports.createAdditionalInfo = async (req, res, next) => {
  try {
    const workInfo = await AdditionalInfoModel.create(req.body);
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
exports.updateAdditionalInfo = async (req, res, next) => {
    try {
    const workInfo = await AdditionalInfoModel.find({
      additionalInfoId: req.params.additionalInfoId,
    }).populate("user");
    const currentToken = req.header("Authorization")[1];
    if (!currentToken) {
      return res.status(401).send({ err: "Token is expired" });
    }
    jwt.verify(
      currentToken,
      "secret-key",
      async (err, decoded) => {
        console.log(decoded.username); // bar
        if (decoded.username === workInfo.user.username) {
          await WorkInfoModel.find({
            additionalInfoId: req.params.additionalInfoId,
          }).update(req.body);
          res.status(201).send({
            data: workInfo,
            message: "Working Infomation updated successfully!",
            success: true,
          });
        }
      }
    );
  } catch (e) {
    res.status(401).send({
      message: "Working Infomation updated unsuccessfully!",
      success: true,
    });
  }
};

exports.deleteAdditionalInfo = async (req, res, next) => {
    try {

        const workInfo = await AdditionalInfoModel.deleteOne({additionalInfoId: req.params.additionalInfoId});
        res.status(201).send({
          data: workInfo,
          message: "Additional Infomation deleted successfully!",
          success: true,
        });
      } catch (e) {
        res.status(401).send({
          error: e,
          message: "Additional Infomation created unsuccessfully",
          success: false,
        });
      }
};
