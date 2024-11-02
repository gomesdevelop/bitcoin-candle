import { config } from "dotenv";
import axios from "axios";
import Period from "./enums/period";
import CandleModel from "./models/candle-model";
import { createChannel } from "./messages/channel";

config();

const readPrice = async (): Promise<number> => {
  const url = process.env.COINGECKO_API_URL || "";

  try {
    const {
      data: {
        bitcoin: { usd },
      },
    } = await axios.get(url);

    return usd;
  } catch (error) {
    return 0;
  }
};

const generateCandle = async () => {
  const channel = await createChannel();

  if (!channel) return;

  while (true) {
    const loopTimes = Period.FIVE_MIN / Period.TEN_SEC;
    const candle = new CandleModel("BTC");

    console.log("------------------");
    console.log("Generating candle...");

    for (let i = 0; i < loopTimes; i++) {
      const price = await readPrice();
      candle.addValue(price);
      console.log(`Mark price: #${i + 1} of ${loopTimes}`);

      await new Promise((resolve) => setTimeout(resolve, Period.TEN_SEC));
    }

    candle.closeCandle();

    const message = candle.toSingleObject();

    console.log("Candle generated");
    console.log(message);
    console.log("------------------");

    channel.sendToQueue(
      process.env.RABBITMQ_QUEUE || "",
      Buffer.from(JSON.stringify(message))
    );

    console.log("Candle sent");
  }
};

const main = async () => {
  await generateCandle();
};

main();
