const connection = require("../models/db");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const createRequest = async (req, res) => {
  const ownerId = req.token.userId;
  const { restaurantName } = req.body;
  const query = `INSERT INTO requests (restaurantName,owner_Id,state) VALUES (?,?,?)`;
  const data = [restaurantName, ownerId, "In Progress"];
  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        massage: "Server Error",
        err,
      });
    }
    res.status(201).json({
      success: true,
      message: "request Created Successfully",
      results: result,
    });
  });
};

const createRestaurant = async (req, res) => {
  const ownerId = req.token.userId;
  const { location, lat, lng, name, Logo, rest_category } = req.body;
  const query = `INSERT INTO restaurants  ( location, lat, lng, name, Logo, backImg ,rest_category,owner_id) VALUES (?,?,?,?,?,?,?,?)`;
  const data = [location, lat, lng, name, Logo, Logo, rest_category, ownerId];

  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        massage: "Server Error",
        err,
      });
    }
    res.status(201).json({
      success: true,
      message: "Restaurant Created Successfully",
      results: result,
    });
  });
};
const createEmployee = async (req, res) => {
  const restaurant_id = req.params.restaurant_id;
  const {
    firstName,
    lastName,
    email,
    password,
    gender,
    shift,
    salary,
    weeklyHours,
  } = req.body;
  const encryptedPassword = await bcrypt.hash(password, saltRounds);
  const query = `INSERT INTO users (firstName, lastName,  email, password,gender, role_id) VALUES (?,?,?,?,?,?)`;

  const data = [firstName, lastName, email, encryptedPassword, gender, 3];
  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(409).json({
        success: false,
        message: "Email already taken",
        err,
      });
    }
    const query = `INSERT INTO employees (shift, salary, weeklyHours,restaurant_id,user_id) VALUES (?,?,?,?,?)`;
    const data = [shift, salary, weeklyHours, restaurant_id, result.insertId];
    connection.query(query, data, (err, employeeResult) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Email already taken",
          err: err.message,
        });
      }
      res.status(201).json({
        success: true,
        message: "Employee Created Successfully",
        userResult: result,
        employeeResult,
      });
    });
  });
};
const deleteEmployee = (req, res) => {
  const { employeeId } = req.body;

  const query = `UPDATE users SET is_deleted =1 WHERE id=?`;

  connection.query(query, [employeeId], (err, result) => {
    if (err) {
      return res.status(409).json({
        success: false,
        massage: "Server Error",
        err,
      });
    }

    res.status(200).json({
      success: true,
      message: "Owner Deleted Successfully",
      results: result,
    });
  });
};

const deleteRequest = (req, res) => {
  const { requestId } = req.body;

  const query = `DELETE FROM requests WHERE id=?`;

  connection.query(query, [requestId], (err, result) => {
    if (err) {
      return res.status(409).json({
        success: false,
        massage: "Server Error",
        err,
      });
    }

    res.status(200).json({
      success: true,
      message: "Owner Deleted Successfully",
      results: result,
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
const updateRequest = (req, res) => {
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
const getAllEmployee = (req, res) => {
  const owner_id = req.token.userId;
  const query =
    "SELECT US.id,firstName,lastName,name,email,salary,weeklyHours,shift,role FROM users US INNER JOIN employees EM INNER JOIN roles RS INNER JOIN restaurants RST ON  US.id=EM.user_id AND RST.id = EM.restaurant_id AND US.role_id=RS.id AND RST.owner_id=?";

  connection.query(query, [owner_id], (err, users) => {
    if (err) {
      return res.status(500).json({
        success: false,
        massage: "Server Error",
        err,
      });
    }
    if (users.length) {
      res.status(200).json({
        success: true,
        message: "All Restaurants",
        users,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Not Found",
        users: [],
      });
    }
  });
};
const getOwnerRestaurants = (req, res) => {
  const owner_id = req.token.userId;

  const query =
    "SELECT  email,firstName,lastName,name,orders,RS.id  FROM restaurants RS INNER JOIN users US ON US.id = ? AND RS.owner_id=? AND RS.is_deleted=0";
  connection.query(query, [owner_id, owner_id], (err, restaurants) => {
    if (err) {
      return res.status(500).json({
        success: false,
        massage: "Server Error",
        err,
      });
    }
    if (restaurants.length) {
      res.status(200).json({
        success: true,
        message: "All Restaurants",
        restaurants,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Not Found",
        restaurants: [],
      });
    }
  });
};
const getOwnerRequests = (req, res) => {
  const owner_id = req.token.userId;
  const query =
    "SELECT firstName,lastName,restaurantName,state, email, requests.id  FROM users INNER JOIN requests ON requests.owner_id =? AND users.id=?";
  connection.query(query, [owner_id, owner_id], (err, requests) => {
    if (err) {
      return res.status(500).json({
        success: false,
        massage: "Server Error",
        err,
      });
    }
    if (requests.length) {
      res.status(200).json({
        success: true,
        message: "All Requests",
        requests: requests,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Not Found",
        requests: [],
      });
    }
  });
};
module.exports = {
  createRequest,
  createRestaurant,
  createEmployee,
  deleteEmployee,
  getOwnerRequests,
  getOwnerRestaurants,
  deleteRequest,
  updateRequest,
  deleteRestaurant,
  getAllEmployee,
};
