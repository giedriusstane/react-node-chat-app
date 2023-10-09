import User from "../models/userModel.js";
import bcrypt from 'bcryptjs';

const userRegistration = async (req, res) => {
    console.log(req.body.username);

    const newErrorText = [];

    if (req.body.username.length < 4) {
        newErrorText.push("Username must be at least 4 characters long.");
    }

    if (req.body.username.length > 20) {
        newErrorText.push("Username must be less than 20 characters long.");
    }

    if (req.body.password_1.length < 4) {
        newErrorText.push("Password must be at least 4 characters long.");
    }

    if (req.body.password_1.length > 20) {
        newErrorText.push("Password must be less than 20 characters long.");
    }

    if (/[A-Z]/.test(req.body.password_1) === false) {
        newErrorText.push("Password must include an uppercase letter.");
    }

    if (req.body.password_1 !== req.body.password_2) {
        newErrorText.push("Password must match.");
    }




    if (newErrorText.length === 0) {

        try {
            const usernameToCheck = req.body.username;
            const existingUser = await User.findOne({ username: usernameToCheck });

            if (existingUser) {
                newErrorText.push("User already exists.");
            }

            if (newErrorText.length === 0) {

                const hashedPassword = await bcrypt.hash(req.body.password_1, 10);
                const newUser = new User({
                    username: req.body.username,
                    password: hashedPassword,
                });

                await newUser.save();
                console.log("User saved to MongoDB");
                res.status(201).json({ registration: "ok" });
            } else {
                res.status(400).json({ error: newErrorText });
            }
        } catch (err) {
            console.error("Error checking if user exists or saving user:", err);
            res.status(500).json({ error: "Error checking if user exists or saving user." });
        }
    } else {

        res.status(400).json({ error: newErrorText });
    }

};

export default { userRegistration };
