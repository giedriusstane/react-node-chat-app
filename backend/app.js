import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import registrationRouters from "./routers/registrationRouters.js";
import loginRouters from "./routers/loginRouters.js";
import profileRouters from "./routers/profileRouters.js";
import allUsersRouters from "./routers/allUsersRouters.js";
import messagesRouters from "./routers/messagesRouters.js";




const port = process.env.PORT;
const app = express();
app.use(cors());
app.use(express.json());


connectDB();


app.use("/", registrationRouters);
app.use("/", loginRouters);
app.use("/", profileRouters);
app.use("/", allUsersRouters);
app.use("/", messagesRouters)





app.listen(port, console.log(`Server running on port ${port}`));









