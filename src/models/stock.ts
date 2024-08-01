export interface Stock {
  symbol: string;
  price: number;
  direction: Direction;
}

export enum Direction {
  None = "None",
  Up = "Up",
  Down = "Down",
}
