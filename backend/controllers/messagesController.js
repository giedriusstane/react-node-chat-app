import Message from "../models/messageModel.js";
import User from "../models/userModel.js";


const sendMessage = async (req, res) => {

    const newErrorText = [];

    if (req.body.msgText.length < 3) {
        newErrorText.push("Message is too short.");

    }

    if (req.body.msgText.length > 1000) {
        newErrorText.push("Message is too long.");

    }



    if (newErrorText.length === 0) {
        try {
            const sendersIdToCheck = req.body.sendersId;
            const existingSender = await User.findById(sendersIdToCheck);

            if (!existingSender) {
                newErrorText.push("The user trying to send the message does not exist.");
            }

            const receiversIdToCheck = req.body.receiversId;
            const existingReceiver = await User.findById(receiversIdToCheck);

            if (!existingReceiver) {
                newErrorText.push("The user trying to receive the message does not exist.");
            }


            if (newErrorText.length === 0) {

                const newMessage = new Message({
                    messageText: req.body.msgText,
                    sendersId: req.body.sendersId,
                    receiversId: req.body.receiversId
                });


                await newMessage.save();
                console.log("Message saved to MongoDB");
                res.status(201).json({ messageIsSent: true });
            } else {
                res.status(400).json({ error: newErrorText });

            }

        } catch (error) {
            console.error("Error checking if (sender-receiver) exists:", error);
            res.status(500).json({ error: "Error checking if (sender-receiver) exists" });
        }
    }


};


export default { sendMessage };