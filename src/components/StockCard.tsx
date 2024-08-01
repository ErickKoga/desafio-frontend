import { HTMLAttributes } from "react";
import Arrow from "../assets/arrow.svg";
import { toBRL } from "../helpers/monetary";
import { Direction, Stock } from "../models/stock";
import Card from "./ui/Card";

interface StockCard extends HTMLAttributes<HTMLDivElement> {
  stock: Stock;
}

const StockCard = ({ stock, ...props }: StockCard) => {
  const textColorClass =
    stock.direction === Direction.Up
      ? "text-constructive"
      : stock.direction === Direction.Down
        ? "text-destructive"
        : "";

  const arrowDirectionClass =
    stock.direction === Direction.Up
      ? ""
      : stock.direction === Direction.Down
        ? "rotate-180"
        : "hidden";

  return (
    <Card className="font-medium" {...props}>
      <div className="p-8">
        <h2 className="text-sm text-muted-foreground">{stock.symbol}</h2>
        <p className="text-sm uppercase">Preço do ativo</p>
        <p className={`flex items-center gap-2 text-lg ${textColorClass}`}>
          {toBRL(stock.price)}
          <Arrow className={arrowDirectionClass} />
        </p>
      </div>
    </Card>
  );
};

export default StockCard;
