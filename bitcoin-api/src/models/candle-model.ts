import { Document, Schema, model } from "mongoose";

export interface ICandle extends Document {
  open: number;
  close: number;
  high: number;
  low: number;
  color: string;
  time: Date;
  currency: string;
}

const schema = new Schema<ICandle>({
  open: Number,
  close: Number,
  high: Number,
  low: Number,
  color: String,
  time: Date,
  currency: String,
});

export const CandleModel = model<ICandle>("Candle", schema);
