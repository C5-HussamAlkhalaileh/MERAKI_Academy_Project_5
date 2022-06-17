const connection = require("../models/db");


const deleteMealById = (req, res) => {
  const mealId = req.params.mealId;
 
  const query = "DELETE FROM meals WHERE id=?;;";
  connection.query(query, [mealId], (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Server Error",
        err: err.message,
      });
    }

    res.status(200).json({
      success: true,
      message: "Item Deleted",

    });
  });
};

const updateMealById = (req, res) => {
  const mealId = req.params.mealId;
  const { name, category, imgUrl, price, size } = req.body;
  const query = "UPDATE meals SET name=? ,imgUrl=? ,category=?,price=?, size=? form meals where id=?";
  connection.query(query, [name, category, imgUrl, price, size, mealId], (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Server Error",
        err: err.message,
      });
    }

    res.status(403).json({
      success: false,
      message: "Item Updated",
      err: err.message,
    });
  });
};

const createNewMeal = (req, res) => {


  const { name, imgUrl, category, price, size } = req.body

  const query = `INSERT INTO meals (name, imgUrl,category,price) VALUES (?,?,?,?);`;
  const data = [name, imgUrl, category, price, size];

  connection.query(query, data, (err, result) => {
    if (err) {
      res.status(500).json({
        success: false,
        massage: "Server error",
        err: err,
      });
    }
    res.status(201).json({
      success: true,
      massage: "Meal created",
      meals: result,
    });
  });
};

//!........................................

const getAllMeals = (req, res) => {

  const query = `SELECT * FROM meals WHERE is_deleted=0;`;
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
      massage: "All the Meals",
      meals: result,
    });
  });

};
//!....................................



const getMealByName = (req, res) => {
  const Name = req.params.name;

  const query = `SELECT * FROM meals WHERE name=? AND is_deleted=0;`;
  const data = [Name];
  connection.query(query, data, (err, result) => {
    if (err) {
      return res.json({
        success: false,
        message: `The name => ${Name} has no meals`,

      });
    }

    res.status(200).json({
      success: true,
      message: `All the meals for the name → ${Name}`,
      meals: result
    });
  });



};
//!..............................

const sortBycategory = (req, res) => {

  const category = req.params.category;

  const query = `SELECT * FROM meals WHERE category=? AND is_deleted=0;`;
  const data = [category];
  connection.query(query, data, (err, result) => {
    if (err) {
      return res.json({
        success: false,
        message: `The name => ${category} has no meals`,

      }); 
    }

    res.status(200).json({
      success: true,
      message: `All the meals for the  name → ${category}`,
      meals: result
    });
  });



}

module.exports = {
  createNewMeal, getAllMeals, deleteMealById, updateMealById, getMealByName, sortBycategory
};


