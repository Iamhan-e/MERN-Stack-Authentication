import mongoose from 'mongoose'


const connectDb = async () => {
    const uri = `${process.env.MONGODB_URI}/mern-auth`;
    console.log("Attempting to connect to MongoDB URI:", uri);
    try {
        await mongoose.connect(uri);
        console.log("database connected");
    } catch (error) {
        console.error("Database connection error:", error);
    }
}

export default connectDb;