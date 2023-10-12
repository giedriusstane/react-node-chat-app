import express from "express";
const router = express.Router();
import profileController from "../controllers/profileController.js";
import authMiddleware from "../middlewares/authMiddleware.js";



router.get("/profile", authMiddleware.verifyToken, profileController.userProfile);
router.post("/updateProfile", authMiddleware.verifyToken, profileController.updateProfile);


export default router;