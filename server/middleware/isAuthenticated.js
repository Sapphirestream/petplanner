require("dotenv").config();

const jwt = require("jsonwebtoken");
const { SECRET } = process.env;

exports.isAuthenticated = (req, res, next) => {
  const headerToken = req.get("Authorization");

  //if there is no token
  if (!headerToken) {
    res.status(401).send("Error in Auth Middleware");
  }

  let token;

  //decrypt token
  try {
    token = jwt.verify(headerToken, SECRET);
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }

  //if user is not logged in
  if (!token) {
    const error = new Error("Not Authenticated");
    error.statusCode = 401;
    throw error;
  }

  //runs next code
  next();
};
