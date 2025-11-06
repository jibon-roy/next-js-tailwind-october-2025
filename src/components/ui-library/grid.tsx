'use client';
import React from "react";
import { cn } from "@/src/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import { motion, HTMLMotionProps } from "framer-motion";

const gridVariants = cva("grid", {
  variants: {
    cols: {
      1: "grid-cols-1",
      2: "grid-cols-2",
      3: "grid-cols-3",
      4: "grid-cols-4",
      5: "grid-cols-5",
      6: "grid-cols-6",
      12: "grid-cols-12",
      none: "grid-cols-none",
    },
    rows: {
      1: "grid-rows-1",
      2: "grid-rows-2",
      3: "grid-rows-3",
      4: "grid-rows-4",
      5: "grid-rows-5",
      6: "grid-rows-6",
      none: "grid-rows-none",
    },
    flow: {
      row: "grid-flow-row",
      col: "grid-flow-col",
      dense: "grid-flow-dense",
      "row-dense": "grid-flow-row-dense",
      "col-dense": "grid-flow-col-dense",
    },
    gap: {
      0: "gap-0",
      1: "gap-1",
      2: "gap-2",
      3: "gap-3",
      4: "gap-4",
      5: "gap-5",
      6: "gap-6",
      8: "gap-8",
      10: "gap-10",
      12: "gap-12",
    },
  },
  defaultVariants: {
    cols: "none",
    rows: "none",
    gap: 4,
  },
});

export interface GridProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof gridVariants> {
  as?: React.ElementType;
  animate?: boolean;
  motionProps?: HTMLMotionProps<"div">;
  responsive?: {
    sm?: Partial<VariantProps<typeof gridVariants>>;
    md?: Partial<VariantProps<typeof gridVariants>>;
    lg?: Partial<VariantProps<typeof gridVariants>>;
    xl?: Partial<VariantProps<typeof gridVariants>>;
  };
}

export const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  (
    {
      className,
      cols,
      rows,
      flow,
      gap,
      as: Component = "div",
      animate = false,
      motionProps,
      responsive,
      ...props
    },
    ref
  ) => {
    const Comp = animate ? motion[Component as keyof typeof motion] || motion.div : Component;
    
    let responsiveClasses = "";
    
    if (responsive) {
      if (responsive.sm) {
        if (responsive.sm.cols) responsiveClasses += ` sm:grid-cols-${responsive.sm.cols}`;
        if (responsive.sm.gap) responsiveClasses += ` sm:gap-${responsive.sm.gap}`;
      }
      if (responsive.md) {
        if (responsive.md.cols) responsiveClasses += ` md:grid-cols-${responsive.md.cols}`;
        if (responsive.md.gap) responsiveClasses += ` md:gap-${responsive.md.gap}`;
      }
      if (responsive.lg) {
        if (responsive.lg.cols) responsiveClasses += ` lg:grid-cols-${responsive.lg.cols}`;
        if (responsive.lg.gap) responsiveClasses += ` lg:gap-${responsive.lg.gap}`;
      }
      if (responsive.xl) {
        if (responsive.xl.cols) responsiveClasses += ` xl:grid-cols-${responsive.xl.cols}`;
        if (responsive.xl.gap) responsiveClasses += ` xl:gap-${responsive.xl.gap}`;
      }
    }
    
    const gridProps = {
      className: cn(gridVariants({ cols, rows, flow, gap }), responsiveClasses, className),
      ref,
      ...props,
      ...(animate ? motionProps : {}),
    };

    return <Comp {...gridProps} />;
  }
);

Grid.displayName = "Grid";