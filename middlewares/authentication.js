const jwt = require("jsonwebtoken");

exports.verifyIfUser = (username) => 
{
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).send({ err: "Token is expired" });
  }
  try {
    jwt.verify(token, 'secret-token');

  } catch (err) {
  }
}

