import React from "react";
import { cn } from "@/src/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import { motion, HTMLMotionProps } from "framer-motion";

const headingVariants = cva("font-bold leading-tight tracking-tight", {
  variants: {
    size: {
      h1: "text-4xl md:text-5xl lg:text-6xl",
      h2: "text-3xl md:text-4xl lg:text-5xl",
      h3: "text-2xl md:text-3xl lg:text-4xl",
      h4: "text-xl md:text-2xl lg:text-3xl",
      h5: "text-lg md:text-xl",
      h6: "text-base md:text-lg",
    },
    weight: {
      light: "font-light",
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
      extrabold: "font-extrabold",
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    },
    color: {
      default: "text-foreground",
      muted: "text-muted-foreground",
      primary: "text-primary",
      secondary: "text-secondary-foreground",
      accent: "text-accent-foreground",
    },
  },
  defaultVariants: {
    size: "h1",
    weight: "bold",
    align: "left",
    color: "default",
  },
});

export interface HeadingProps
  extends Omit<React.HTMLAttributes<HTMLHeadingElement>, "color">,
    VariantProps<typeof headingVariants> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  animate?: boolean;
  motionProps?: HTMLMotionProps<"h1" | "h2" | "h3" | "h4" | "h5" | "h6">;
}

export const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  (
    {
      className,
      size,
      weight,
      align,
      color,
      as,
      animate = false,
      motionProps,
      ...props
    },
    ref
  ) => {
    const Component = as || (size as React.ElementType) || "h1";
    const Comp = animate ? motion[Component as keyof typeof motion] : Component;

    const headingProps = {
      className: cn(headingVariants({ size, weight, align, color }), className),
      ref,
      ...props,
      ...(animate ? motionProps : {}),
    };

    return <Comp {...headingProps} />;
  }
);

Heading.displayName = "Heading";

const textVariants = cva("", {
  variants: {
    size: {
      xs: "text-xs",
      sm: "text-sm",
      base: "text-base",
      lg: "text-lg",
      xl: "text-xl",
      "2xl": "text-2xl",
    },
    weight: {
      light: "font-light",
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
      justify: "text-justify",
    },
    color: {
      default: "text-foreground",
      muted: "text-muted-foreground",
      primary: "text-primary",
      secondary: "text-secondary-foreground",
      accent: "text-accent-foreground",
    },
    lineHeight: {
      none: "leading-none",
      tight: "leading-tight",
      snug: "leading-snug",
      normal: "leading-normal",
      relaxed: "leading-relaxed",
      loose: "leading-loose",
    },
  },
  defaultVariants: {
    size: "base",
    weight: "normal",
    align: "left",
    color: "default",
    lineHeight: "normal",
  },
});

export interface TextProps
  extends Omit<React.HTMLAttributes<HTMLParagraphElement>, "color">,
    VariantProps<typeof textVariants> {
  as?: React.ElementType;
  animate?: boolean;
  motionProps?: HTMLMotionProps<"p">;
}

export const Text = React.forwardRef<HTMLParagraphElement, TextProps>(
  (
    {
      className,
      size,
      weight,
      align,
      color,
      lineHeight,
      as: Component = "p",
      animate = false,
      motionProps,
      ...props
    },
    ref
  ) => {
    const Comp = animate
      ? motion[Component as keyof typeof motion] || motion.p
      : Component;

    const textProps = {
      className: cn(
        textVariants({ size, weight, align, color, lineHeight }),
        className
      ),
      ref,
      ...props,
      ...(animate ? motionProps : {}),
    };

    return <Comp {...textProps} />;
  }
);

Text.displayName = "Text";
