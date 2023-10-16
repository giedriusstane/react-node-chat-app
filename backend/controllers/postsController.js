import Post from "../models/postModel.js";
import User from "../models/userModel.js";

const createPost = async (req, res) => {
    const newErrorText = [];

    if (req.body.postTitle.length < 3) {
        newErrorText.push("Post title is too short.");
    }

    if (req.body.postTitle.length > 50) {
        newErrorText.push("Post title is too long.");
    }

    if (newErrorText.length === 0) {
        try {
            const sendersIdToCheck = req.body.sendersId;
            const existingSender = await User.findById(sendersIdToCheck);

            if (!existingSender) {
                newErrorText.push("The user trying to create the post does not exist.");
            }

            if (newErrorText.length === 0) {
                const newPost = new Post({
                    title: req.body.postTitle,
                    image: req.body.postImage,
                    sendersId: req.body.sendersId,
                });

                await newPost.save();
                console.log("Post created in MongoDB");
                res.status(201).json({ postIsCreated: true });
            } else {
                res.status(400).json({ error: newErrorText });
            }
        } catch (error) {
            console.error("Error checking if sender exists:", error);
            res.status(500).json({ error: "Error checking if sender exists" });
        }
    }
};

export default { createPost };
