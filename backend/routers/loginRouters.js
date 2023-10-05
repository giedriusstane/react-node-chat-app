import express from "express";
const router = express.Router();
import loginController from "../controllers/loginController.js";



router.post("/login", loginController);

export default router;