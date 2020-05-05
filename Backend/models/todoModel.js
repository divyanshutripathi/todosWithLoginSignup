const sql = require("./db.js");

module.exports.addTodo = async function (todo, result) {
  query = {
    todoId: todo.todoId,
    userId: todo.userId,
    todoTitle: todo.title,
    todoStatus: todo.status,
    deleted: false,
  };
  sql.query("INSERT INTO todos SET ?", query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err);
      return;
    }
    result(null, res[0]);
  });
};

module.exports.getTodoByUserId = async function (userId, result) {
  query = `
    SELECT *
    FROM todos
    WHERE  todos.userId = ? AND ?? != ?`;
  sql.query(query, [userId, "todos.deleted", true], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err);
      return;
    }
    result(null, res);
  });
};

module.exports.getTodoById = async function (todoId, result) {
  query = `
  SELECT todos.todoId
  FROM todos
  WHERE  todos.todoId = ? AND ?? != ?`;
  sql.query(query, [todoId, "todos.deleted", true], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err);
      return;
    }
    result(null, res);
  });
};

module.exports.updateTodoById = async function (todoData, result) {
  query = `UPDATE todos SET todoStatus = ? WHERE todoId = ?`;
  sql.query(query, [todoData.status, todoData.todoId], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err);
      return;
    }
    result(null, res[0]);
  });
};

module.exports.deleteTodoById = async function (todoId, result) {
  query = `UPDATE todos SET deleted = ? WHERE todoId = ?`;
  sql.query(query, [true, todoId], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err);
      return;
    }
    result(null, res[0]);
  });
};

module.exports;
