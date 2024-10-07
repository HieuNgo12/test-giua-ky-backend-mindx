const jwt = require("jsonwebtoken");

exports.verifyIfUser = (req, res, filter, data, Model) => {
  const currentToken = req.header("auth-token");
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
    }
  });
};
