"use client";
import React from "react";
import { cn } from "@/src/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import { motion, HTMLMotionProps } from "framer-motion";

const containerVariants = cva(
  "w-full mx-auto px-4 sm:px-6 md:px-8 transition-all",
  {
    variants: {
      size: {
        sm: "max-w-screen-sm",
        md: "max-w-screen-md",
        lg: "max-w-screen-lg",
        xl: "max-w-screen-xl",
        "2xl": "max-w-screen-2xl",
        full: "max-w-full",
      },
      padding: {
        none: "p-0",
        sm: "p-2",
        md: "p-4",
        lg: "p-6",
        xl: "p-8",
      },
    },
    defaultVariants: {
      size: "2xl",
    },
  }
);

export interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {
  as?: React.ElementType;
  animate?: boolean;
  motionProps?: HTMLMotionProps<"div">;
}

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  (
    {
      className,
      size,
      padding,
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

    const containerProps = {
      className: cn(containerVariants({ size, padding }), className),
      ref,
      ...props,
      ...(animate ? motionProps : {}),
    };

    return <Comp {...containerProps} />;
  }
);

Container.displayName = "Container";
