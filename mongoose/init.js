import mongoose from "mongoose";

const { MONGODB_URI } = process.env;

// Connect with mongodb
mongoose.connect(MONGODB_URI, { dbName: "WislioBookLibrary" });

// Handle mongoose connected event
mongoose.connection.on("connected", () => {
  console.log("Successfully connected to MongoDB");
});

// Handle mongoose error event
mongoose.connection.on("error", console.error);
