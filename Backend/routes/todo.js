var express = require("express");
const shortid = require("shortid");
var router = express.Router();
const USER_STATIC = require("../models/userStaticModel");
const TODO = require("../models/todoModel");
const { authenticateJWT } = require("../authenticator/jwtAuthenticator");

router.post("/addTodo", authenticateJWT, async (req, res) => {
  if (!req.body.user.title || !req.body.user.email || !req.body.user.status) {
    res.json({
      success: false,
      msg: "Insufficient data!",
    });
  } else {
    try {
      USER_STATIC.getbyEmail(req.body.user.email, (err, existingEmail) => {
        if (!existingEmail) {
          res.json({
            success: false,
            msg: "user does not exist",
          });
        } else {
          const todoId = shortid.generate();
          todoDetails = {
            userId: existingEmail.userId,
            todoId,
            title: req.body.user.title,
            status: req.body.user.status,
          };
          TODO.addTodo(todoDetails, (err, todoResData) => {
            if (err) {
              res.json({
                success: false,
                msg: err,
              });
            }
            res.json({
              success: true,
              msg: "todo added successfully",
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

router.post("/getTodos", authenticateJWT, (req, res) => {
  if (!req.body.user.email) {
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
          TODO.getTodoByUserId(resUser.userId, (err, resTodo) => {
            if (err) {
              res.json({
                success: false,
                msg: err,
              });
            } else {
              res.json({
                success: true,
                msg: resTodo,
              });
            }
          });
        }
      }
    });
  }
});

router.post("/updateTodo", authenticateJWT, (req, res) => {
  if (!req.body.user.email || !req.body.user.todoId || !req.body.user.status) {
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
          TODO.getTodoById(req.body.user.todoId, (err, resUser) => {
            if (resUser) {
              updatedTodo = {
                todoId: req.body.user.todoId,
                status: req.body.user.status,
              };
              TODO.updateTodoById(updatedTodo, (err, resUserUpdated) => {
                if (err) {
                  res.json({
                    success: false,
                    msg: err,
                  });
                }
                res.json({
                  success: true,
                  msg: "todo updated successfully",
                });
              });
            } else {
              res.json({
                success: false,
                msg: "failed to update",
              });
            }
          });
        }
      }
    });
  }
});

router.post("/deleteTodo", authenticateJWT, (req, res) => {
  if (!req.body.user.email || !req.body.user.todoId || !req.body.user.deleted) {
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
          TODO.getTodoById(req.body.user.todoId, (err, resTodo) => {
            if (resTodo && resTodo.userId === resUser.userId) {
              TODO.deleteTodoById(req.body.user.todoId, (err) => {
                if (err) {
                  res.json({
                    success: false,
                    msg: err,
                  });
                }
                res.json({
                  success: true,
                  msg: "todo deleted successfully",
                });
              });
            } else {
              res.json({
                success: false,
                msg: "failed to delete",
              });
            }
          });
        }
      }
    });
  }
});
module.exports = router;
