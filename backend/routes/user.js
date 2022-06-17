const express = require("express");

//controllers

const {
  getAllRestaurants,
  getRestaurantByName,
  getMealByRestaurant,
  addMealToCart,
  deleteMealFromCart,
  getRestaurantById,
  senOrder,
  UpdateAdress,
  getAdressByUserId,
  getSortRestuarnts
} = require("../controllers/user");





// Middleware
const authentication = require("../middlewares/authentication");

//!..........Create user router........................

const userRouter = express.Router();

//!.......... Router EndPoint .................

//todo  get method
// get 
userRouter.get("/", getAllRestaurants);

// get (params)
userRouter.get("/name/:name", getRestaurantByName);

// get (params)
userRouter.get("/category/:category", getSortRestuarnts);


// get (  params )
userRouter.get("/:restaurant_id",getMealByRestaurant);

// get ( params )
userRouter.get("/id/:id", getRestaurantById);

// get (params)
userRouter.get("/address/:id", getAdressByUserId );

//...........................................................
//todo  post method
// post ( params methods)
userRouter.post("/:meal_id",authentication,addMealToCart);

// get ( Double params methods)

userRouter.get("/res/:restaurant_id",  getMealByRestaurant)






//post 
userRouter.post("/sent/:userId",senOrder);



//delete (params methods)
userRouter.delete("/delete/:meal_id",authentication,deleteMealFromCart);


//Update (params methods)
userRouter.put("/:id",UpdateAdress);



//todo  exports router
module.exports = userRouter;
