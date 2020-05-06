const jwt = require("jsonwebtoken");
module.exports.authenticateJWT = (req, res, next) => {
  const authHeader = req.body.user.token;

  if (authHeader) {
    const token = authHeader;
    console.log(authHeader);

    jwt.verify(token, process.env.SECRET_TOKEN, (err, user) => {
      if (err) {
        return res.json({
          success: false,
          status: 403,
          msg: "Authentication Failed",
        });
      }

      req.user = user;
      next();
    });
  } else {
    res.json({
      success: false,
      status: 401,
      msg: "Authentication Failed",
    });
  }
};
