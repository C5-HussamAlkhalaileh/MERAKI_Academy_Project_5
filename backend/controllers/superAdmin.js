const connection = require("../models/db");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const createOwner = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const encryptedPassword = await bcrypt.hash(password, saltRounds);

  const query = `INSERT INTO users (firstName, lastName,  email, password, role_id) VALUES (?,?,?,?,?)`;
  const data = [firstName, lastName, email, encryptedPassword, 2];
  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(409).json({
        success: false,
        massage: "The email already exists",
        err,
      });
    }
    res.status(201).json({
      success: true,
      message: "Owner Created Successfully",
      results: result,
    });
  });
};
const deleteUser = async (req, res) => {
  const { id, name } = req.body;

  const query = `UPDATE users SET is_deleted=1 WHERE id=?`;

  connection.query(query, [id], (err, result) => {
    if (err) {
      return res.status(409).json({
        success: false,
        massage: "Server Error",
        err,
      });
    }
    res.status(200).json({
      success: true,
      message: "User Deleted Successfully",
      results: result,
    });
  });
};
const getAllRequests = (req, res) => {
  const query =
    "SELECT firstName,lastName,restaurantName,state, email, requests.id  FROM users INNER JOIN requests ON requests.owner_id =users.id AND  requests.state=? ";

  connection.query(query, ["In Progress"], (err, result) => {
  
    if (err) {
      return res.status(500).json({
        success: false,
        massage: "Server Error",
        err,
        requests: [],
      });
    }
    if (result.length) {
      res.status(200).json({
        success: true,
        message: "All Requests",
        requests: result,
      });
    } else {
      res.status(404).json({
        success: true,
        message: "No Request",
        requests: [],
      });
    }
  });
};

const getAllUsers = (req, res) => {
  const query =
    "SELECT * FROM  roles INNER JOIN users ON users.role_id=roles.id AND is_deleted =0";
  connection.query(query, [], (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        massage: "Server Error",
        err,
      });
    }
    if (result.length) {
      res.status(200).json({
        success: true,
        message: "All users",
        users: result,
      });
    } else {
      res.status(404).json({
        success: true,
        message: "No Request",
      });
    }
  });
};

const getAllOwners = (req, res) => {
  const query = "SELECT * FROM users WHERE is_deleted = 0 AND role_id = 2";
  connection.query(query, [], (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        massage: "Server Error",
        err,
      });
    }
    if (result.length) {
      res.status(200).json({
        success: true,
        message: "All users",
        owners: result,
      });
    } else {
      res.status(404).json({
        success: true,
        message: "No Request",
      });
    }
  });
};

const acceptRequest = (req, res) => {
  const { requestId, state } = req.body;
  const query = `UPDATE requests  SET state =? WHERE id=?`;
  connection.query(query, [state, requestId], (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        massage: "Server Error",
        err,
      });
    }

    res.status(200).json({
      success: true,
      massage: "Request State Change",
      result,
    });
  });
};

const getAllRestaurants = (req, res) => {
  const query =
    "SELECT email,firstName,lastName,name,orders,RS.id FROM users US INNER JOIN restaurants RS ON RS.is_deleted = 0 AND US.id=RS.owner_id";
  connection.query(query, [], (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        massage: "Server Error",
        err,
      });
    }
    if (result.length) {
      res.status(200).json({
        success: true,
        message: "All restaurants",
        restaurants: result,
      });
    } else {
      res.status(404).json({
        success: true,
        message: "No Request",
      });
    }
  });
};

const editUser = (req, res) => {
  const { firstName, lastName, email, password, role_id, gender, id } =
    req.body;
  const data = [firstName, lastName, email, password, role_id, gender, id];
  const query =
    "UPDATE users SET firstName=?,lastName=?,email=?,password=?,role_id=?,gender=? WHERE id=? ";

  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        massage: "Server Error",
        err,
      });
    }

    res.status(200).json({
      success: true,
      massage: "User Updated",
      result,
    });
  });
};
const deleteRestaurant = async (req, res) => {
  const { id } = req.body;

  const query = `UPDATE restaurants SET is_deleted=1 WHERE id=?`;

  connection.query(query, [id], (err, result) => {
    if (err) {
      return res.status(409).json({
        success: false,
        massage: "Server Error",
        err,
      });
    }
    res.status(200).json({
      success: true,
      message: "Restaurant  Deleted Successfully",
      results: result,
    });
  });
};

module.exports = {
  createOwner,
  deleteOwner: deleteUser,
  getAllRequests,
  acceptRequest,
  getAllUsers,
  getAllOwners,
  getAllRestaurants,
  editUser,
  deleteRestaurant,
};
