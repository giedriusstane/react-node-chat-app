import mongoose from "mongoose";



const messageSchema = mongoose.Schema({
    messageText: {
        type: String,
        required: true,
    },

    sendersId: {
        type: String,
        required: true,
    },

    receiversId: {
        type: String,
        required: true
    }
});


const Message = mongoose.model("Message", messageSchema);
export default Message;