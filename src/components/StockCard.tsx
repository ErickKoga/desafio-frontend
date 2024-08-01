import { HTMLAttributes, useMemo } from "react";
import { Area, AreaChart, ResponsiveContainer } from "recharts";
import Arrow from "../assets/arrow.svg";
import { getCompany } from "../helpers/getCompany";
import { getCssVar } from "../helpers/getCssVar";
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

  const data = useMemo(
    () =>
      stock.history.map((entry) => ({
        time: new Date(entry.timestamp).toLocaleTimeString(),
        price: entry.price,
      })),
    [stock.history],
  );

  const primaryColor = `hsl(${getCssVar("--primary")})`;

  return (
    <Card className="font-medium" {...props}>
      <div className="flex flex-col gap-4 p-8">
        <p className="flex justify-between gap-4 text-muted-foreground">
          <span className="overflow-hidden text-ellipsis text-nowrap">
            {getCompany(stock.symbol)}
          </span>
          <span>{stock.symbol}</span>
        </p>
        <p className="text-sm uppercase">Preço do ativo</p>
        <p className={`flex items-center gap-2 text-lg ${textColorClass}`}>
          {toBRL(stock.price)}
          <Arrow className={arrowDirectionClass} />
        </p>
      </div>
      <ResponsiveContainer width="100%" height="50%">
        <AreaChart
          data={data}
          margin={{ bottom: 0, left: 0, right: 0, top: 0 }}
        >
          <Area
            type="monotone"
            dataKey="price"
            stroke={primaryColor}
            fill={primaryColor}
            className="stroke-[4]"
            fillOpacity={0.2}
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default StockCard;
