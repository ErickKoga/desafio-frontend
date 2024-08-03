import { cn } from "@/utils/cn";
import { forwardRef, HTMLAttributes } from "react";

interface Card extends HTMLAttributes<HTMLDivElement> {}

const Card = forwardRef<HTMLDivElement, Card>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn("border border-muted", className)} {...props}>
      {children}
    </div>
  ),
);

Card.displayName = "Card";

export default Card;
