import mongoose from 'mongoose';

const connectDb = async () => {
  // Ensure your .env has: MONGODB_URI=mongodb+srv://user:pass@cluster0.mongodb.net
  const uri = `${process.env.MONGODB_URI}/mern-auth`;
  console.log("Attempting to connect to MongoDB URI:", uri);

  try {
    await mongoose.connect(uri);
    console.log("✅ Database connected successfully");
  } catch (error) {
    console.error("❌ Database connection error:", error.message);
    throw error; // rethrow so server.js knows it failed
  }
};

export default connectDb;
