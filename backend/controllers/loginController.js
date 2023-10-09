import User from "../models/userModel.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


const userLogin = async (req, res) => {

    try {
        const usernameToCheck = req.body.username;
        const passwordToCheck = req.body.password;

        const existingUser = await User.findOne({ username: usernameToCheck });

        if (!existingUser) {
            return res.status(404).json({ error: "User not found" });
        }


        const isPasswordValid = await bcrypt.compare(passwordToCheck, existingUser.password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid password" });
        }

        const token = jwt.sign({ userId: existingUser._id }, process.env.JWT_SECRET_KEY, { expiresIn: "3h" });

        res.status(200).json({ token: token });

    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ error: "Internal server error" });

    }

};


export default { userLogin };