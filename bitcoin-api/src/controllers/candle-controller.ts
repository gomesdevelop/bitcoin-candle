import { CandleModel, ICandle } from "../models/candle-model";

export default class CandleController {
  constructor() {}

  async createCandle(value: ICandle) {
    return await CandleModel.create(value);
  }

  async getCandles(quantity: number) {
    if (quantity <= 0) return [];

    return await CandleModel.find().sort({ time: -1 }).limit(quantity);
  }
}
