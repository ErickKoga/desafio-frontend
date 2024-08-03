import { cn } from "@/utils/cn";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface Button extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}

const Button = forwardRef<HTMLButtonElement, Button>(
  ({ className, active = true, children, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "h-8 rounded-full bg-primary px-2 align-middle font-medium text-primary-foreground",
        { "bg-muted text-muted-foreground": !active },
        className,
      )}
      {...props}
    >
      {children}
    </button>
  ),
);

Button.displayName = "Button";

export default Button;
