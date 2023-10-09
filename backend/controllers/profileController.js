import User from "../models/userModel.js";


const userProfile = async (req, res) => {
    try {
        let userId = req.userId;
        let userDataFromDB = await User.findById(userId).select("-password");

        if (!userDataFromDB) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ message: `Welcome`, userData: userDataFromDB });

    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ error: 'Internal server error' });

    }


}



export default { userProfile };