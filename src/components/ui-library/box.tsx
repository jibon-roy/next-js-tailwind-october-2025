"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import { motion, HTMLMotionProps } from "framer-motion";

const boxVariants = cva("", {
  variants: {
    padding: {
      none: "p-0",
      xs: "p-1",
      sm: "p-2",
      md: "p-4",
      lg: "p-6",
      xl: "p-8",
      "2xl": "p-10",
    },
    margin: {
      none: "m-0",
      xs: "m-1",
      sm: "m-2",
      md: "m-4",
      lg: "m-6",
      xl: "m-8",
      "2xl": "m-10",
    },
    rounded: {
      none: "rounded-none",
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
      xl: "rounded-xl",
      "2xl": "rounded-2xl",
      "3xl": "rounded-3xl",
      full: "rounded-full",
    },
    shadow: {
      none: "shadow-none",
      sm: "shadow-sm",
      md: "shadow",
      lg: "shadow-md",
      xl: "shadow-lg",
      "2xl": "shadow-xl",
      inner: "shadow-inner",
    },
    border: {
      none: "border-0",
      sm: "border",
      md: "border-2",
      lg: "border-4",
      xl: "border-8",
    },
    bgColor: {
      transparent: "bg-transparent",
      white: "bg-white dark:bg-slate-900",
      card: "bg-card",
      primary: "bg-primary",
      secondary: "bg-secondary",
      muted: "bg-muted",
    },
  },
  defaultVariants: {
    padding: "md",
    margin: "none",
    rounded: "md",
    shadow: "none",
    border: "none",
    bgColor: "transparent",
  },
});

export interface BoxProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof boxVariants> {
  as?: React.ElementType;
  animate?: boolean;
  motionProps?: HTMLMotionProps<"div">;
}

export const Box = React.forwardRef<HTMLDivElement, BoxProps>(
  (
    {
      className,
      padding,
      margin,
      rounded,
      shadow,
      border,
      bgColor,
      as: Component = "div",
      animate = false,
      motionProps,
      ...props
    },
    ref
  ) => {
    const Comp = animate
      ? motion[Component as keyof typeof motion] || motion.div
      : Component;

    const boxProps = {
      className: cn(
        boxVariants({ padding, margin, rounded, shadow, border, bgColor }),
        className
      ),
      ref,
      ...props,
      ...(animate ? motionProps : {}),
    };

    return <Comp {...boxProps} />;
  }
);

Box.displayName = "Box";
