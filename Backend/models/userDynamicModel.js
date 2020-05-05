const sql = require("./db.js");

module.exports.addUser = async function (user, result) {
  query = {
    userId: user.userId,
    password: user.password,
  };
  sql.query("INSERT INTO userDynamic SET ?", query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err);
      return;
    }
    result(null, res[0]);
  });
};

module.exports.getbyEmail = async function (email) {
  query = `
  SELECT userStatic.name,userStatic.userId,
  userDynamic.password
  FROM userStatic ,userDynamic
  WHERE  userStatic = ${email} AND userStatic.userId =userDynamic.userId;`;
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      return err;
    }
    return res;
  });
};

module.exports;
