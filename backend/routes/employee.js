const express = require("express");

const {
  createMeal,
  deleteMealFromRestaurant,
  updateMeal,
  getAllOrder,
  getAllMeals,
  updateOrderState,
  getEmployeeRestaurant,
  deleteOrder,
  s
 
} = require("../controllers/employee");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");

//!..........Create employee router........................
const employeeRouter = express.Router();

//!.......... Router  .................

//post
employeeRouter.post("/", authentication, authorization("3"), createMeal);

//delete
employeeRouter.delete(
  "/:meal_id",
  authentication,
  authorization("3"),
  deleteMealFromRestaurant
);

//update
employeeRouter.put("/:mealId", authentication, authorization("3"), updateMeal);
employeeRouter.put(
  "/order/:orderId",
  authentication,
  authorization("3"),
  updateOrderState
);

employeeRouter.put("/:mealId", authentication, authorization("3"), updateMeal);
employeeRouter.put(
  "/order/delete/:orderId",
  authentication,
  authorization("3"),
  deleteOrder
);
//deleteOrder
//get
employeeRouter.get("/:id", authentication, authorization("3"), getAllOrder);
employeeRouter.get(
  "/meals/:restaurant_id",
  authentication,
  authorization("3"),
  getAllMeals
);
employeeRouter.get(
  "/get/restaurant/",
  authentication,
  authorization("3"),
  getEmployeeRestaurant
);

//getEmployeeRestaurant
module.exports = employeeRouter;
