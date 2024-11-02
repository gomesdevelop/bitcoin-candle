import { Channel, connect } from "amqplib";
import CandleController from "../controllers/candle-controller";
import { Server as HttpServer } from "http";
import { Server } from "socket.io";

export default class CandleChannel {
  private channel: Channel | undefined;
  private controller: CandleController | undefined;
  private io: Server | undefined;

  constructor(server: HttpServer) {
    this.controller = new CandleController();
    this.io = new Server(server, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
    });

    this.io?.on("connection", (socket) => console.log("Socket connected"));
  }

  async createChannel(): Promise<Channel | undefined> {
    const connection = await connect(process.env.RABBITMQ_SERVER || "");
    this.channel = await connection.createChannel();

    await this.channel.assertQueue(process.env.RABBITMQ_QUEUE || "", {
      durable: true,
    });

    console.log("Created channel");
    return Promise.resolve(this.channel);
  }

  async consume(): Promise<void> {
    this.createChannel().then((channel) => {
      console.log("Consuming messages...");
      channel?.consume(process.env.RABBITMQ_QUEUE || "", (message) => {
        if (message) {
          const value = JSON.parse(message.content.toString());
          this.controller
            ?.createCandle(value)
            .then(() => {
              console.log("Candle created", message);
              this.channel?.ack(message);
              this.io?.emit(process.env.SOCKET_EVENT_NAME || "", value);
            })
            .catch((error) => {
              console.log("Failed to create candle", error);
            });
        }
      });
    });
  }
}
