import express from "express";
const router = express.Router();
import messagesController from "../controllers/messagesController.js";
import authMiddleware from "../middlewares/authMiddleware.js";



router.post("/users", authMiddleware.verifyToken, messagesController.sendMessage);

export default router;