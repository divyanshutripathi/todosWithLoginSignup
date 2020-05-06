var express = require("express");
const jwt = require("jsonwebtoken");

const { v4: uuidv4 } = require("uuid");
var router = express.Router();
const USER_STATIC = require("../models/userStaticModel");
const USER_DYNAMIC = require("../models/userDynamicModel");
const { authenticateJWT } = require("../authenticator/jwtAuthenticator");

router.post("/addUser", authenticateJWT, async (req, res) => {
  if (
    !req.body.user.username ||
    !req.body.user.email ||
    !req.body.user.password
  ) {
    res.json({
      success: false,
      msg: "Insufficient data!",
    });
  } else {
    try {
      USER_STATIC.getbyEmail(req.body.user.email, (err, existingEmail) => {
        if (existingEmail) {
          res.json({
            success: false,
            msg: "user already exist",
          });
        } else {
          const userId = uuidv4();
          userDetailsStatic = {
            userId,
            name: req.body.user.username,
            email: req.body.user.email,
          };
          userDetailsDynamic = {
            userId,
            password: req.body.user.password,
          };
          USER_STATIC.addUser(userDetailsStatic, (err, staticResData) => {
            if (err) {
              res.json({
                success: false,
                msg: err,
              });
            }
            USER_DYNAMIC.addUser(userDetailsDynamic, (err, dynamicResData) => {
              if (err) {
                res.json({
                  success: false,
                  msg: err,
                });
              }
              res.json({
                success: true,
                msg: "user added successfully",
              });
            });
          });
        }
      });
    } catch (err) {
      console.log("error : ", err);
      res.json({
        success: false,
        msg: err,
      });
    }
  }
});

router.post("/login", (req, res) => {
  if (!req.body.user.email || !req.body.user.password) {
    res.json({
      success: false,
      msg: "Insufficient Data",
    });
  } else {
    USER_STATIC.getbyEmail(req.body.user.email, (err, resUser) => {
      if (err) {
        res.json({
          success: false,
          msg: err,
        });
      } else {
        if (!resUser) {
          res.json({
            success: false,
            msg: "user does not exist",
          });
        } else {
          if (resUser.password == req.body.user.password) {
            const accessToken = jwt.sign(
              { username: resUser.email },
              process.env.SECRET_TOKEN
            );

            res.json({
              success: true,
              msg: accessToken,
            });
          } else {
            res.json({
              success: false,
              msg: "password incorrect",
            });
          }
        }
      }
    });
  }
});

module.exports = router;
