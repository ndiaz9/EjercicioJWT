var express = require("express");
var router = express.Router();
let jwt = require("jsonwebtoken");
let config = require("../config");
let CryptoJS = require("crypto-js");
const login = require("../controllers/login");

router.post("/", function (req, res, next) {
  let username = req.body.username;
  let password = req.body.password;

  if (username && password) {
    login.getUser(username, (result) => {
      console.log(result);
      if (result) {
        if (
          username === result.username &&
          CryptoJS.SHA256(password).toString() === result.password
        ) {
          let token = jwt.sign({ username: username }, config.secret, {
            expiresIn: "24H",
          });
          login.addToken(
            {
              idUser: result._id.toString(),
              token: token,
            },
            (result) => {
              console.log(result);
              res.send({
                succcess: true,
                message: "Authentication successful.",
                token: token,
              });
            }
          );
        } else {
          res.send({
            success: false,
            message: "Username or password not valid.",
          });
        }
      } else {
        return res.status(404).send("Username not found");
      }
    });
  } else {
    res.send({
      success: false,
      message: "Username or password not provided.",
    });
  }
});

module.exports = router;
