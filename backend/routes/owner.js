const express = require("express");

const {
  createRequest,
  createRestaurant,
  createEmployee,
  deleteEmployee,
  getOwnerRequests,
  getOwnerRestaurants,
  getAllEmployee,
  deleteRequest,
  updateRequest,
  deleteRestaurant,
} = require("../controllers/owner");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");

const ownerRouter = express.Router();
//get
ownerRouter.get(
  "/requests",
  authentication,
  authorization("2"),
  getOwnerRequests
);
ownerRouter.get(
  "/restaurants",
  authentication,
  authorization("2"),
  getOwnerRestaurants
);
ownerRouter.get(
  "/employees",
  authentication,
  authorization("2"),
  getAllEmployee
);
//post
ownerRouter.post("/request", authentication, authorization("2"), createRequest);
ownerRouter.post(
  "/restaurant",
  authentication,
  authorization("2"),
  createRestaurant
);
ownerRouter.post(
  "/employee/:restaurant_id",
  authentication,
  authorization("2"),
  createEmployee
);

//delete
ownerRouter.delete(
  "/employee",
  authentication,
  authorization("2"),
  deleteEmployee
);
ownerRouter.delete(
  "/request",
  authentication,
  authorization("2"),
  deleteRequest
);
ownerRouter.delete(
  "/restaurant",
  authentication,
  authorization("2"),
  deleteRestaurant
);

//put updateRequest
ownerRouter.put("/request", authentication, authorization("2"), updateRequest);

module.exports = ownerRouter;
