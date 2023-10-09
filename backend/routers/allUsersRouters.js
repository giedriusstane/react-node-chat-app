import express from "express";
const router = express.Router();
import allUsersController from "../controllers/allUsersController.js";
import authMiddleware from "../middlewares/authMiddleware.js";



router.get("/users", authMiddleware.verifyToken, allUsersController.showAllUsers);

export default router;