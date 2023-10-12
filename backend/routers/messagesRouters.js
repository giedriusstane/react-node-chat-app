import express from "express";
const router = express.Router();
import messagesController from "../controllers/messagesController.js";
import authMiddleware from "../middlewares/authMiddleware.js";



router.post("/messages", authMiddleware.verifyToken, messagesController.sendMessage);
router.get("/messages", authMiddleware.verifyToken, messagesController.getAllMessages);


export default router;