const connection = require("../models/db");

const createMeal = (req, res) => {
  const { name, imgUrl, category, price, restaurant_id } = req.body;
  const query = `INSERT INTO meals (name,imgUrl,category,price,restaurant_id) VALUES (?,?,?,?,?);`;
  const data = [name, imgUrl, category, price, restaurant_id];

  connection.query(query, data, (err, result) => {
    if (err) {
      res.status(500).json({
        success: false,
        massage: "Server error",
        err: err,
      });
    } else {
      res.status(200).json({
        success: true,
        massage: "creat meal to  ",
        result: result,
      });
    }
  });
};
//!.......END CreatMeal ............

const deleteMealFromRestaurant = (req, res) => {
  const mealId = req.params.meal_id;

  const query = `UPDATE meals SET is_deleted=1 WHERE id=?`;

  const data = [mealId];

  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        massage: "Server Error",
        err: err,
      });
    }

    ///...........
    if (!result.affectedRows) {
      return res.status(404).json({
        success: false,
        massage: `The meal: ${mealId} is not found`,
        err: err,
      });
    } else {
      res.status(200).json({
        success: true,
        massage: `Succeeded to delete meal with id: ${mealId}`,
        result: result,
      });
    }
  });
};
//!.......END    deleteMealfromResturant, ............

const updateMeal = (req, res) => {
  const mealId = req.params.mealId;
  const { name, imgUrl, category, price, restaurant_id } = req.body;
  const query = `UPDATE meals SET name=?,imgUrl=?,category=?,price=? ,restaurant_id=? WHERE id=?;`;

  const data = [name, imgUrl, category, Number(price), restaurant_id, mealId];
  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        massage: "Server Error",
        err: err,
      });
    }

    ///...........
    if (!result.affectedRows) {
      return res.status(404).json({
        success: false,
        massage: `The meal: ${id} is not found`,
        err: err,
      });
    } else {
      res.status(200).json({
        success: true,
        massage: `Meal Updated`,
        result: result,
      });
    }
  });
};
const updateOrderState = (req, res) => {
  const orderId = req.params.orderId;
  const { state } = req.body;
  const query = `UPDATE orders SET state=? WHERE id=?;`;

  const data = [state, orderId];
  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        massage: "Server Error",
        err: err,
      });
    }
    if (!result.affectedRows) {
      return res.status(404).json({
        success: false,
        massage: `The order is not found`,
        err: err,
      });
    } else {
      res.status(200).json({
        success: true,
        massage: `Order Updated`,
        result: result,
      });
    }
  });
};
const deleteOrder = (req, res) => {
  const orderId = req.params.orderId;
  const query = `UPDATE orders SET is_deleted=1 WHERE id=?;`;

  const data = [orderId];
  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        massage: "Server Error",
        err: err,
      });
    }
    if (!result.affectedRows) {
      return res.status(404).json({
        success: false,
        massage: `The order is not found`,
        err: err,
      });
    } else {
      res.status(200).json({
        success: true,
        massage: `Order Updated`,
        result: result,
      });
    }
  });
};

//!.......END updateMeal   ............

const getAllOrder = (req, res) => {
  const restaurant_id = req.params.id;
  const query = `SELECT OS.id,email,state,receipt,quantity,MS.name,MS.price,AD.city,AD.notes,AD.street,AD.buldingNumber FROM orders OS INNER JOIN address AD INNER JOIN  restaurants RS INNER JOIN users US INNER JOIN orders_meals OM INNER JOIN meals MS ON  AD.user_id= OS.user_id AND OS.user_id = US.id AND OS.restaurant_id = ?  AND  OS.restaurant_id = RS.id AND OM.order_id = OS.id AND MS.id = OM.meal_id AND OM.id AND OS.is_deleted=0; 
  `;
  const data = [restaurant_id];

  connection.query(query, data, (err, orders) => {
    if (err) {
      res.status(500).json({ err });
    }
    if (orders.length) {
      res.status(200).json({
        success: true,
        massage: `the restaurant name is: ${restaurant_id}`,
        orders,
      });
    } else {
      res.status(404).json({
        success: false,
        massage: `the restaurant name is ${restaurant_id} is not found now `,
        orders: [],
      });
    }
  });
};

const getAllMeals = (req, res) => {
  const restaurant_id = req.params.restaurant_id;
  const query = `SELECT imgUrl,category,price,RS.name,Ms.name,MS.id FROM meals MS  INNER JOIN restaurants RS ON MS.restaurant_id = ? And MS.restaurant_id = RS.id  AND MS.is_deleted=0`;
  connection.query(query, [restaurant_id], (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        massage: "server error",
        err: err,
        meals: [],
      });
    }
    res.status(200).json({
      success: true,
      massage: "All the Meals",
      meals: result,
    });
  });
};

const getEmployeeRestaurant = (req, res) => {
  const Employee_id = req.token.userId;
  const query =
    "SELECT  EM.restaurant_id,RS.name,RS.id  FROM employees EM INNER JOIN restaurants RS ON  EM.user_id=? AND RS.id=EM.restaurant_id ";
  connection.query(query, [Employee_id], (err, restaurants) => {
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

module.exports = {
  createMeal,
  deleteMealFromRestaurant,
  updateMeal,
  getAllOrder,
  getAllMeals,
  updateOrderState,
  deleteOrder,
  getEmployeeRestaurant,
};
