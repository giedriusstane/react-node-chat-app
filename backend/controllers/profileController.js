import User from "../models/userModel.js";
import bcrypt from 'bcryptjs';


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

};




const updateProfile = async (req, res) => {
    try {
        const userId = req.userId;

        if (req.body.updatedPassword) {
            const hashedPassword = await bcrypt.hash(req.body.updatedPassword, 10);

            const user = await User.findOneAndUpdate(
                { _id: userId },
                {
                    pictureUrl: req.body.updatedPictureUrl,
                    password: hashedPassword,
                },
                { new: true }
            );

            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            console.log('User profile updated successfully');
            res.status(200).json({ message: 'User profile updated successfully' });
        } else {
            const user = await User.findOneAndUpdate(
                { _id: userId },
                { pictureUrl: req.body.updatedPictureUrl },
                { new: true }
            );

            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            console.log('User profile updated successfully');
            res.status(200).json({ message: 'User profile updated successfully' });
        }
    } catch (error) {
        console.error('Error updating user profile:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};





export default { userProfile, updateProfile };