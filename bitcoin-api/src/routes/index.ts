import e, { Router } from "express";
import CandleController from "../controllers/candle-controller";

export const router = Router();

const candleController = new CandleController();

router.get("/", (req, res) => {
  res.send("Hello World!");
});

router.get("/candles", async (req, res) => {
  const quantity = req.query.quantity
    ? parseInt(req.query.quantity as string)
    : 0;
  const candles = await candleController.getCandles(quantity);
  res.send(candles);
});
