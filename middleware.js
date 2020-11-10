const jwt = require("jsonwebtoken");
const config = require("./config.js");
const login = require("./controllers/login");

const checkToken = (req, res, next) => {
  let token = req.headers["x-access-token"] || req.headers["authorization"];

  if (token) {
    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length);
      jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
          return res.json({
            success: false,
            message: "Token is not valid.",
          });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    }
  } else {
    res.send({
      success: false,
      message: "Auth token was not provided.",
    });
  }
};

const checkRole = (req, res, next) => {
  let token = req.headers["x-access-token"] || req.headers["authorization"];
  token = token.slice(7, token.length);
  login.getUserID(token, (result) => {
    console.log(result);
    if (result) {
      login.getRolesUser(result.idUser, (resultRolesUser) => {
        console.log(resultRolesUser);
        if (resultRolesUser) {
          login.getRole(resultRolesUser.idRole, (resultRole) => {
            console.log(resultRole);
            if (resultRole) {
              let reqType = req.method;
              if (
                (reqType == "GET" && resultRole.get == false) ||
                (reqType == "PUT" && resultRole.update == false) ||
                (reqType == "POST" && resultRole.create == false) ||
                (reqType == "DELETE" && resultRole.delete == false)
              ) {
                return res
                  .status(404)
                  .send("You are not allowed to perform this operation.");
              } else {
                next();
              }
            } else {
              return res.status(404).send("Assigned role does not exist.");
            }
          });
        } else {
          return res.status(404).send("User has no defined role.");
        }
      });
    } else {
      return res.status(404).send("User not found with provided token.");
    }
  });
};

module.exports = {
  checkToken,
  checkRole,
};
