import dotenv from "dotenv";
dotenv.config();
import colors from "colors"
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import registrationRouters from "./routers/registrationRouters.js";
import loginRouters from "./routers/loginRouters.js";
import profileRouters from "./routers/profileRouters.js";
import allUsersRouters from "./routers/allUsersRouters.js";
import messagesRouters from "./routers/messagesRouters.js";
import postsRouters from "./routers/postsRouters.js";

const PORT = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json());


connectDB();

app.use("/", registrationRouters);
app.use("/", loginRouters);
app.use("/", profileRouters);
app.use("/", allUsersRouters);
app.use("/", messagesRouters);
app.use("/", postsRouters);


app.listen(PORT, () => {
     console.log(`Express server running on port ${PORT}...`.yellow.bold);
});


