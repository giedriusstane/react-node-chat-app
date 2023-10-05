import express from "express";
const router = express.Router();
import registrationController from "../controllers/registrationController.js";



router.post("/registration", registrationController.userRegistration);

export default router;