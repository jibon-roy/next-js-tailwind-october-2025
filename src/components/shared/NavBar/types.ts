import type React from "react";
import type { ReactNode } from "react";

export interface DropdownItem {
  label: string;
  path?: string;
}

export interface NavItem {
  label: string;
  path?: string;
  dropdown?: DropdownItem[];
}

export interface NavButton {
  label: string;
  onClick?: () => void;
  className?: string;
  component?: React.ReactNode;
}

export interface NavbarProps {
  className?: string;
  navDivider?: boolean;
  logo?: string | ReactNode;
  navItems?: NavItem[];
  buttons?: NavButton[];
  mobileBreakpoint?: "sm" | "md" | "lg" | "xl" | "2xl";
  position?: "fixed" | "sticky" | "relative" | "absolute";
  backgroundColor?: string;
  textColor?: string;
  activeTextColor?: string;
  hoverTextColor?: string;
  dropdownBackgroundColor?: string;
  dropdownTextColor?: string;
  dropdownHoverBackgroundColor?: string;
  dropdownBorderColor?: string;
  hamburgerColor?: string;
  drawerBackgroundColor?: string;
  drawerWidth?: string;
  shadow?: string;
  padding?: string;
  transition?: string;
  zIndex?: string;
  showOnScroll?: boolean;
  hideOnScroll?: boolean;
  conditionalRoutes?: Record<string, boolean>;
  onNavItemClick?: (item: NavItem) => void;
  onButtonClick?: (index: number, button: NavButton) => void;
  activeBgColor?: string;
  activeHoverBgColor?: string;
}

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: NavItem[];
  buttons: NavButton[];
  backgroundColor?: string;
  textColor?: string;
  activeTextColor?: string;
  width?: string;
  zIndex?: string;
  onNavItemClick?: (item: NavItem) => void;
  onButtonClick?: (index: number, button: NavButton) => void;
  isActiveRoute: (path: string) => boolean;
  activeBgColor?: string;
  activeHoverBgColor?: string;
}
