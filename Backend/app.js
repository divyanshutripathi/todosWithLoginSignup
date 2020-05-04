const express = require("express");
const socketIo = require("socket.io");

const cred = require("./config/cred");
const cors = require("cors");

const mysql = require("mysql");

const app = express();
const usersRouter = require("./routes/users");
const todoRouter = require("./routes/todo");
app.use(
  express.json({
    extended: true,
  })
);
app.use(cors());
app.use(express.static(__dirname + "/public"));
app.use("/user", usersRouter);
app.use("/todo", todoRouter);

const port = process.env.PORT || 5000;

const server = app.listen(port, () => {
  console.log("server started on port : ", port);
});
