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
    const workInfo = await PersonalInfoModel.find({
      personalInfoId: req.params.personalInfoId,
    }).populate("user");
    const currentToken = req.header("Authorization")[1];
    if (!currentToken) {
      return res.status(401).send({ err: "Token is expired" });
    }
    jwt.verify(currentToken, "secret-key", async (err, decoded) => {
      console.log(decoded.username); // bar
      if (decoded.username === workInfo.user.username) {
        await PersonalInfoModel.find({
          personalInfoId: req.params.personalInfoId,
        }).update(req.body);
        res.status(201).send({
          data: workInfo,
          message: "Working Infomation updated successfully!",
          success: true,
        });
      }
    });
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
