const connection = require("../models/db");

const authorization = (string) => {
  return function (req, res, next) {
    const user_id = req.token.userId;
    const data = [user_id];
    const query = `SELECT * FROM users U WHERE U.id = (?)`;
    connection.query(query, data, (err, result) => {
      if (string >= req.token.roleId) {
        next();
      } else {
        res.status(400).json({ message: "unauthorized" });
      }
    });
  };
};

module.exports = authorization;
