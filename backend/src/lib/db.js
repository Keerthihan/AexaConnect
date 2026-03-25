import mongoose from "mongoose";

const connectDB = async () => {
  if (!process.env.MONGOURI) {
    throw new Error("MONGOURI is missing in backend/.env");
  }

  try {
    await mongoose.connect(process.env.MONGOURI);
    console.log("Connected to MongoDB");
  } catch (err) {
    const message =
      err?.message ||
      "Unable to connect to MongoDB. Check your URI and Atlas network access.";
    throw new Error(message);
  }
};

export default connectDB;
