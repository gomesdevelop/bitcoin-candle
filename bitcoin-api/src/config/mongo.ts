import { connect, connection, Mongoose } from "mongoose";

export const disconnectDatabase = async (): Promise<void> => {
  console.log("Disconnecting from MongoDB...");
  try {
    await connection.close();
    console.log("Disconnected from MongoDB");
  } catch (error) {
    console.log("Failed to disconnect from MongoDB", error);
  }
};

export const connectDatabase = async (): Promise<Mongoose> => {
  console.log("Connecting to MongoDB...");
  try {
    return await connect(process.env.MONGODB_URL || "");
  } catch (error) {
    console.log("Failed to connect to MongoDB", error);
    process.exit(1);
  }
};
