import CandleColor from "../enums/candle-color";

export default class CandleModel {
  low: number = Infinity;
  high: number = 0;
  open: number = 0;
  close: number = 0;
  color: CandleColor = CandleColor.UNDERFINED;
  time: Date = new Date();
  values: number[] = [];
  currency: string = "";

  constructor(currency: string) {
    this.currency = currency;
  }

  addValue(value: number) {
    if (this.values.length === 0) {
      this.open = value;
    }

    if (this.low > value) {
      this.low = value;
    }

    if (this.high < value) {
      this.high = value;
    }

    this.values.push(value);
  }

  closeCandle() {
    if (this.values.length <= 0) return;

    this.close = this.values[this.values.length - 1];
    this.time = new Date();

    if (this.open > this.close) {
      this.color = CandleColor.RED;
    } else if (this.close > this.open) {
      this.color = CandleColor.GREEN;
    } else {
      this.color = CandleColor.UNDERFINED;
    }
  }

  toSingleObject() {
    return {
      low: this.low,
      high: this.high,
      open: this.open,
      close: this.close,
      color: this.color,
      time: this.time,
      currency: this.currency,
    };
  }
}
