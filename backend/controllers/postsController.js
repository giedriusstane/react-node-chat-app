import Post from "../models/postModel.js";
import User from "../models/userModel.js";

const createPost = async (req, res) => {
    const newErrorText = [];

    if (req.body.postTitle.length < 3) {
        newErrorText.push("Post title is too short.");
    }

    if (req.body.postTitle.length > 16) {
        newErrorText.push("Post title is too long.");
    }


    if (!req.body.postImage.startsWith("http")) {
        newErrorText.push("Bad image url.");
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




const getAllPosts = async (req, res) => {
    try {
        const allPosts = await Post.find();
        if (!allPosts) {
            return console.log("No posts found");
        } else {
            const io = req.app.get('io');
            res.status(200).json({ postsData: allPosts });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error })
    }
};



const updatePost = async (req, res) => {
    try {
        const postId = req.body.postId;
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }


        if (!post.likes.sendersId.includes(req.userId)
            && post.sendersId !== req.userId
            && req.body.likeUpdate === true) {
            post.likes.numberOfLikes++;
            post.likes.sendersId.push(req.userId);
        }


        if (req.body.comment === true) {

            const newErrorText = [];

            if (req.body.commentText.length < 3) {
                newErrorText.push("Comment  is too short.");
            }

            if (req.body.commentText.length > 300) {
                newErrorText.push("Comment  is too long.");
            }

            if (newErrorText.length === 0) {
                post.comments.commentText.push([req.body.commentText, req.userId])

            } else {
                return res.status(404).json({ error: newErrorText });
            }

        }



        const updatedPost = await post.save();

        console.log("Post updated successfully");
        res.status(200).json({ message: 'Post updated successfully', updatedPost });

    } catch (error) {
        console.error('Error updating post:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export default { createPost, getAllPosts, updatePost };
