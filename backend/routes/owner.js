const express = require("express");

const { createRequest, createRestaurant } = require("../controllers/owner");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");

const ownerRouter = express.Router();
//post
ownerRouter.post("/request", authentication, authorization("2"), createRequest);
ownerRouter.post("/restaurant", authentication, authorization("2"), createRestaurant);



module.exports = ownerRouter;
