import express from "express";
const router = express.Router();
import profileController from "../controllers/profileController.js";
import authMiddleware from "../middlewares/authMiddleware.js";



router.get("/profile", authMiddleware.verifyToken, profileController.userProfile);


export default router;