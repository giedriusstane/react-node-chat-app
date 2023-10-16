import express from "express";
const router = express.Router();
import postsController from "../controllers/postsController.js";
import authMiddleware from "../middlewares/authMiddleware.js";



router.post("/posts", authMiddleware.verifyToken, postsController.createPost);



export default router;