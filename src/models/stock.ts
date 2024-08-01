export interface Stock {
  symbol: string;
  price: number;
  direction: Direction;
  history: { price: number; timestamp: number }[];
}

export enum Direction {
  None = "None",
  Up = "Up",
  Down = "Down",
}
