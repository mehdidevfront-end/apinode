const jwt = require("jsonwebtoken");

require("dotenv").config();
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);

    const userContune = {
      userId: decodedToken.userId,
      name: decodedToken.name,
      role: decodedToken.role,
    };
    if (decodedToken) {
      req.auth = {
        userContune: userContune,
      };

      next();
    } else {
      res.status(401).json({ error: "erro de role" });
    }
  } catch (error) {
    res.status(401).json({ error });
  }
};