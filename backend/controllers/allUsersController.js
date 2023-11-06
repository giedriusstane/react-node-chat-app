import User from "../models/userModel.js";



const showAllUsers = async (req, res) => {
    try {
        let userId = req.userId;
        let allUsersDataFromDB = await User.find({}).select("-password");
        if (!allUsersDataFromDB) {
            return res.status(404).json({ error: 'Users not found' });
        }
        res.status(200).json({ usersData: allUsersDataFromDB, currentUserId: userId });

    } catch (error) {
        console.error('Error fetching users data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};



export default { showAllUsers };