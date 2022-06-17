
const connection = require("../models/db");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const register = async (req, res) => {
  
  const role_id = req.params.roleId;
  const { firstName, lastName, email, password ,gender} = req.body;

  const encryptedPassword = await bcrypt.hash(password, saltRounds);

  const query = `INSERT INTO users (firstName, lastName,  email, password,gender, role_id) VALUES (?,?,?,?,?,?)`;
  const data = [firstName, lastName, email, encryptedPassword, gender,role_id];
  connection.query(query, data, (err, result) => {
    
    if (err) {
      return res.status(409).json({
        success: false,
        message: "Email already taken",
        err,
      });
    }
    if (result) {
      const cartQuery = "INSERT INTO carts (user_id) values(?)";
      connection.query(cartQuery, [result.insertId], (err, res2) => {
        if (err) {
          return res.status(500).json({
            success: false,
            message: "Field in creating cart",
          });
        }
        const addressQuery = "INSERT INTO Address (user_id) values(?)";
        connection.query(addressQuery, [result.insertId], (err, re3) => {
          if (err) {
            return res.status(500).json({
              success: false,
              message: err,
            });
          }

          res.status(201).json({
            success: true,
            message: "Account Created Successfully",
            results: result,
          });
        });
      });
    }
  });
};

module.exports = {
  register,
};
