import { Channel, connect } from "amqplib";

export const createChannel = async (): Promise<Channel | undefined> => {
  try {
    const connection = await connect(process.env.RABBITMQ_SERVER || "");
    const channel = await connection.createChannel();

    await channel.assertQueue(process.env.RABBITMQ_QUEUE || "", {
      durable: true,
    });

    console.log("RabbitMQ channel created");

    return channel;
  } catch (error) {
    console.log("Failed to create RabbitMQ channel", error);
  }
};
