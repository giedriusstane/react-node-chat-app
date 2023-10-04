import mongoose from 'mongoose';



const connectDB = async () => {
    try {
        const connected = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected: ${connected.connection.host}`);
    } catch (error) {
        console.log(`Error mongoDB - ${error.message}`);
    }
};


export default connectDB;