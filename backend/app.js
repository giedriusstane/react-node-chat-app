import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";


const port = process.env.PORT;
const app = express();
app.use(cors());
app.use(express.json());





app.get("/", (req, res) => {
    res.send("veikia");
});

app.post("/registration", (req, res) => {
    console.log(req.body);
    res.json({ registration: "ok" });
})



app.listen(port, console.log(`Server running on port 3000`));









