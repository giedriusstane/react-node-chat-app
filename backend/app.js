import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT;
const app = express();



app.get("/", (req, res) => {
    res.send("veikia");
});



app.listen(port, console.log(`Server running on port 3000`));









