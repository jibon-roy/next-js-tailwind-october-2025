import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Button variant styles using cva (class-variance-authority)
const buttonVariants = cva(
  "inline-flex items-center cursor-pointer disabled:cursor-not-allowed transition-all justify-center rounded-lg font-semibold text-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary: "bg-secondary hover:bg-primary text-white",
        secondary: "bg-primary hover:bg-secondary text-white",
        accent: "bg-pink-500 hover:bg-pink-600 text-white",
        ghost: "bg-transparent hover:bg-gray-100 text-gray-900",
        link: "bg-transparent hover:bg-transparent text-primary underline",
        outline:
          "bg-transparent border-2 border-dark text-dark hover:border-dark/80 hover:text-dark/80",
        border:
          "border border-primary text-primary hover:bg-primary hover:text-white",
        "border-secondary":
          "border border-secondary text-secondary hover:bg-secondary hover:text-white",
      },
      size: {
        default: "px-8 py-2",
        sm: "px-4 py-1 text-sm",
        md: "px-6 py-2 text-md",
        lg: "px-10 py-3 text-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

// No Slot, just regular button rendering
const Button: React.FC<ButtonProps> = ({
  className,
  variant,
  size,
  ...props
}) => {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
};

export { Button, buttonVariants };
