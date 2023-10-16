import mongoose from "mongoose";



const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    image: {
        type: String,
        required: true
    },

    sendersId: {
        type: String,
        required: true
    },

    likes: {
        numberOfLikes: {
            type: Number,
            default: 0
        },

        sendersId: {
            type: String,
        }


    },

    comments: {
        commentText: {
            type: [],


        },

        sendersId: {
            type: String
        }

    }


});


const Post = mongoose.model("Post", postSchema);
export default Post;