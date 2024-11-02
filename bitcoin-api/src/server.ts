import { config } from "dotenv";
import { app } from "./app";
import { connectDatabase, disconnectDatabase } from "./config/mongo";
import CandleChannel from "./messages/candle-channel";

config();

const createServer = async () => {
  console.log("Creating server...");
  connectDatabase()
    .then(() => {
      console.log("Connected to MongoDB");

      const server = app.listen(3000, () => {
        console.log(`Server is running on port 3000 🚀`);
      });

      const channel = new CandleChannel(server);
      channel.consume();

      process.on("SIGINT", async () => {
        await disconnectDatabase();
        console.log("Application closed");
      });
    })
    .catch((error) => {
      console.log("Failed to connect to MongoDB", error);
    });
};

createServer();
