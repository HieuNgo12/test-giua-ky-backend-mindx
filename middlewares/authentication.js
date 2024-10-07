const jwt = require("jsonwebtoken");

exports.verifyIfUser = (req, res, filter, data, Model) => {
  const currentToken = req.header("Authorization")[1];
  if (!currentToken) {
    return res.status(401).send({ err: "Token is expired" });
  }
  jwt.verify(currentToken, "secret-key", async (err, decoded) => {
    if (decoded.username === data.user.username) {
      await Model.findOneAndUpdate(filter, req.body);
      res.status(201).send({
        data: workInfo,
        message: "Working Infomation updated successfully!",
        success: true,
      });
    } else {
        res.status(401).send({
            message: "Must login to Profile User in order to update!",
            success: false,
          });
    }
  });
};


exports.verifyIfUserCanDelete = (req, res, filter, data, Model) => {
    const currentToken = req.header("Authorization")[1];
    if (!currentToken) {
      return res.status(401).send({ err: "Token is expired" });
    }
    jwt.verify(currentToken, "secret-key", async (err, decoded) => {
      if (decoded.username === data.user.username) {
        await Model.deleteOne(filter);
        res.status(201).send({
          data: workInfo,
          message: "Working Infomation updated successfully!",
          success: true,
        });
      } else {
          res.status(401).send({
              message: "Must login to Profile User in order to update!",
              success: false,
            });
      }
    });
  };
  