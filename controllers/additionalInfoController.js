const { verifyIfUserCanDelete } = require("../middlewares/authentication");
const AdditionalInfoModel = require("../models/additionalInfo");
const WorkInfoModel = require("../models/additionalInfo");

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
    const additionalInfo = await AdditionalInfoModel.create(req.body);
    res.status(201).send({
      data: additionalInfo,
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
    const additionalInfo = await AdditionalInfoModel.find({
      additionalInfoId: req.params.additionalInfoId,
    }).populate("user");
    const currentToken = req.header("Authorization")[1];
    if (!currentToken) {
      return res.status(401).send({ err: "Token is expired" });
    }
    jwt.verify(currentToken, "secret-key", async (err, decoded) => {
      console.log(decoded.username); // bar
      if (decoded.username === additionalInfo.user.username) {
        await WorkInfoModel.find({
          additionalInfoId: req.params.additionalInfoId,
        }).update(req.body);
        res.status(201).send({
          data: additionalInfo,
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

exports.deleteAdditionalInfo = async (req, res, next) => {
  try {
    const filter = { additionalInfoId: req.params.additionalInfoId };
    const additionalInfo = await AdditionalInfoModel.find({
      additionalInfoId: req.params.additionalInfoId,
    }).populate("user");
    verifyIfUserCanDelete(req, res, filter, additionalInfo, AdditionalInfoModel);
  } catch (e) {
    res.status(401).send({
      error: e,
      message: "Additional Infomation created unsuccessfully",
      success: false,
    });
  }
};
