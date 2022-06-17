const connection = require("../models/db");

const getAllRestaurants = (req, res) => {
  const query = `SELECT * FROM restaurants `;
  connection.query(query, (err, result) => {
    if (err) {
      res.status(500).json({
        success: false,
        massage: "server error",
        err: err,
      });
    }

    res.status(200).json({
      success: true,
      massage: "All the restaurants",
      result: result,
    });
  });
};
//! ...........END   getAllRestaurants .......................

const getRestaurantByName = (req, res) => {
  const restaurantName = req.params.name;
  const query = `SELECT * FROM restaurants WHERE name=?;`;
  const data = [restaurantName];
  connection.query(query, data, (err, result) => {
    if (err) {
      res.status(500).json({ err });
    }
    if (result.length) {
      res.status(200).json({
        success: true,
        massage: `the restaurant name is: ${restaurantName}`,
        result: result,
      });
    } else {
      res.status(404).json({
        success: false,
        massage: `the restaurant name is ${restaurantName} is not found now `,
      });
    }
  });
};
//! ...........END getRestaurantByName ....................

const getRestaurantById = (req, res) => {
  const restaurantid = req.params.id;
  const query = `SELECT * FROM restaurants WHERE Id=?;`;
  const data = [restaurantid];
  connection.query(query, data, (err, result) => {
    if (err) {
      res.status(500).json({ err });
    }
    if (result.length) {
      res.status(200).json({
        success: true,
        massage: `the restaurant name is: ${restaurantid}`,
        result: result,
      });
    } else {
      res.status(404).json({
        success: false,
        massage: `the restaurant name is ${restaurantid} is not found now `,
      });
    }
  });
};
//! ...........END getRestaurantById ....................

const addMealToCart = (req, res) => {
  const cart_id = req.token.cartId;
  const mealId = req.params.meal_id;

  const query = `INSERT INTO cartItems(quantity,subTotal,cart_id,meal_id) VALUES (?,?,?,?);`;
  const data = ["2", "85", cart_id, mealId];
  connection.query(query, data, (err, result) => {
    if (err) {
      res.status(500).json({
        success: false,
        massage: "Server error",
        err: err,
      });
    }
    res.status(200).json({
      success: true,
      massage: "add meal to cart",
      result: result,
    });
  });
};
//! ..................... End   getMealbyResturant ...............

const getMealByRestaurant = (req, res) => {
  const restaurant_id = req.params.restaurant_id;

  const query = `SELECT * FROM meals WHERE restaurant_id=? and   is_deleted=0;`;

  const data = [restaurant_id];
  connection.query(query, data, (err, resultMeals) => {
    if (err) {
      res.status(500).json({
        success: false,
        massage: "Server Error",
        err: err,
      });
    }

    if (!resultMeals.length) {
      res.status(404).json({
        success: false,
        massage: "The meal is Not Found",
      });
    } else {
      const categories = [];
      resultMeals.forEach((ele) => {
        if (!categories.includes(ele.category)) {
          categories.push(ele.category);
        }
      });
      res.status(200).json({
        success: true,
        massage: "All Meals",
        result: resultMeals,
        categories,
      });
    }
  });
};

//! ...End addMeealtocart..........

const deleteMealFromCart = (req, res) => {
  const cart_id = req.token.cartId;
  const mealId = req.params.meal_id;

  const query = `DELETE FROM cartItems WHERE cart_id=? AND meal_id=?;`;

  const data = [cart_id, mealId];

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
//! ........END deleteMealfromCart.....

const senOrder = (req, res) => {
  const user_id = req.params.userId;
  const { state, receipt, resturantId, mealarray: mealArray, Quntity } = req.body;
  const query = `INSERT INTO orders(quantity,state,receipt,restaurant_id,user_id) VALUES (?,?,?,?,?);`;
  const data = [Quntity, state, receipt, resturantId, user_id];
  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        massage: "Server error",
        err: err,
      });
    }
    if (result) {
      mealArray.map((element, index) => {
        let quantity = element.price / element.priceOne;
        let mealId = element.id;
        const orderMeal = `INSERT INTO orders_meals (quantity,order_id,meal_id) VALUES (?,?,?)`;
        const data = [quantity, result.insertId, mealId];
        connection.query(orderMeal, data, (err, re3) => {
          if (err) {
            return res.status(500).json({
              success: false,
              message: err,
            });
          }
        });
      });
    }
    res.status(200).json({
      success: true,
      massage: `Succeeded to sent meal `,
      result: result,
    });
  });
};

//! ........END deleteMealfromCart.....
const UpdateAdress = (req, res) => {
  const UserId = req.params.id;
  const { street, city, notes, buldingNumber } = req.body;
  const query =
    "update address SET street=?,city=?,notes=?,buldingNumber =?WHERE user_id=?;";
  const data = [street, city, notes, buldingNumber, UserId];
  connection.query(query, data, (err, result) => {
    if (err) {
      return res.json({
        success: false,
        message: `The adress is not Found`,
        err: err,
      });
    }

    res.status(200).json({
      success: true,
      message: `Adress updated`,
      articles: result,
    });
  });
};
//! ........END  UpdateAdress .....
const getAdressByUserId = (req, res) => {
  const userId = req.params.id;
  const query = `SELECT * FROM address WHERE user_id=?;`;
  const data = [userId];
  connection.query(query, data, (err, result) => {
    if (err) {
      res.status(500).json({ err });
    }

    if (result.length) {
      res.status(200).json({
        success: true,
        massage: `the adress user is: ${userId}`,
        result: result,
      });
    } else {
      res.status(404).json({
        success: false,
        massage: `the adress name is ${userId} is not found now `,
      });
    }
  });
};

//! ........END getAdressByUserId  .....
const getSortRestuarnts = (req, res) => {
  const restaurantCategory = req.params.category;
  const query = `SELECT * FROM restaurants WHERE rest_category=?;`;
  const data = [restaurantCategory];
  connection.query(query, data, (err, result) => {
    if (err) {
      res.status(500).json({ err });
    }
    if (result.length) {
      res.status(200).json({
        success: true,
        massage: `the restaurant name is: ${restaurantCategory}`,
        result: result,
      });
    } else {
      res.status(404).json({
        success: false,
        massage: `the restaurant name is ${restaurantCategory} is not found now `,
      });
    }
  });
};

module.exports = {
  getAllRestaurants,
  getRestaurantByName,
  getRestaurantById,
  getMealByRestaurant,
  addMealToCart,
  deleteMealFromCart,
  senOrder,
  UpdateAdress,
  getAdressByUserId,
  getSortRestuarnts,
};
