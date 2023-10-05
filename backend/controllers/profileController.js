import User from "../models/userModel.js";


const userProfile = async (req, res) => {
    try {
        const userId = req.userId;
        userDataFromDB = await User.findById(userId);

        if (!userDataFromDB) {
            return res.status(404).json({ error: 'User not found' });
        }

        const userData = {
            username: userDataFromDB.username,

        }

        res.json({ message: `Welcome to the profile page!`, userData });

    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ error: 'Internal server error' });

    }


}



export default { userProfile };