/**
 * Author: Sam Heutmaker [samheutmaker@gmail.com]
 */

const jwt = require("jsonwebtoken");
const {
  JWT_SECRET
} = require('./../env');

const extractBearerToken = (req) => {
  let token = req.headers.token || "";
  return token;
};

const authenticate = (req, res, next) => {
  const token = extractBearerToken(req);

  if (!token) {
    return next();
  }

  jwt.verify(token, JWT_SECRET, (error, data) => {
    if (error) {
      console.error(error);
      
    } else if (data && data._id) {
      req.researcher = {
        _id: data._id.toString(),
      };
    } else {
      res.status(401);
    }

    next();
  });
}

module.exports = authenticate;