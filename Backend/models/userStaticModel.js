const sql = require("./db.js");

module.exports.addUser = async function (user, result) {
  query = {
    userId: user.userId,
    email: user.email,
    name: user.name,
    active: true,
  };
  sql.query("INSERT INTO userStatic SET ?", query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err);
      return;
    }

    console.log("user inserted: ", res);
    result(null, res[0]);
  });
};

module.exports.getbyEmail = async function (email, result) {
  query = `
  SELECT userStatic.name,userStatic.userId,
  userDynamic.password
  FROM userStatic ,userDynamic
  WHERE  userStatic.email = ? AND ?? =??;`;
  sql.query(
    query,
    [email, "userStatic.userId", "userDynamic.userId"],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err);
        return;
      }

      console.log("user: ", res);
      result(null, res[0]);
    }
  );
};

module.exports;
