"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavbarProps, NavItem, DropdownItem } from "./types";
import { Drawer } from "./drawer";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/src/redux/store";

export const Navbar = ({
  logo,
  navDivider = false,
  navItems = [],
  buttons = [],
  mobileBreakpoint = "lg",
  position = "fixed",
  backgroundColor = "bg-white",
  textColor = "text-gray-800",
  activeTextColor = "text-blue-600",
  hoverTextColor = "hover:text-blue-500",
  dropdownBackgroundColor = "bg-white",
  dropdownTextColor = "text-gray-800",
  dropdownHoverBackgroundColor = "hover:bg-gray-100",
  dropdownBorderColor = "border-gray-200",
  hamburgerColor = "text-gray-800",
  drawerBackgroundColor = "bg-white",
  drawerWidth = "w-64",
  shadow = "",
  padding = "px-4 py-2",
  transition = "transition-all duration-300 ease-in-out",
  zIndex = "z-[999]",
  showOnScroll = false,
  hideOnScroll = false,
  conditionalRoutes = {},
  className = "",
  activeBgColor = "bg-blue-100",
  activeHoverBgColor = "hover:bg-blue-50",
  onNavItemClick,
  onButtonClick,
}: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<Record<number, boolean>>({});
  const [scrollPosition, setScrollPosition] = useState(0);
  const [visible, setVisible] = useState(true);
  const pathname = usePathname();

  // Handle scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentPosition = window.scrollY;

      if (hideOnScroll) {
        setVisible(scrollPosition > currentPosition || currentPosition < 50);
      }

      if (showOnScroll) {
        setVisible(currentPosition > 50);
      }

      setScrollPosition(currentPosition);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollPosition, hideOnScroll, showOnScroll]);

  // Toggle dropdown
  const toggleDropdown = (index: number) => {
    setDropdownOpen((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // Close all dropdowns
  const closeAllDropdowns = () => {
    setDropdownOpen({});
  };

  // Check if route should be shown based on conditionalRoutes
  const shouldShowRoute = (item: NavItem) => {
    if (!item.path || !conditionalRoutes[item.path]) return true;
    return conditionalRoutes[item.path];
  };

  // Check if route is active
  const isActiveRoute = (path: string) => {
    if (!path) return false;
    return pathname === path || pathname.startsWith(`${path}/`);
  };
  const user = useSelector((state: RootState) => state.auth.user);
  // Handle nav item click
  const handleNavItemClick = (item: NavItem) => {
    if (onNavItemClick) {
      onNavItemClick(item);
    }
    closeAllDropdowns();
  };

  // Handle button click
  const handleButtonClick = (index: number) => {
    if (onButtonClick && buttons[index]?.onClick) {
      onButtonClick(index, buttons[index]);
    }
  };

  // Position classes
  const positionClasses =
    {
      fixed: "fixed top-0 left-0 right-0",
      sticky: "sticky top-0",
      relative: "relative",
      absolute: "absolute top-0 left-0 right-0",
    }[position] || "fixed top-0 left-0 right-0";

  // Visibility classes
  const visibilityClass = visible ? "translate-y-0" : "-translate-y-full";

  return (
    <>
      <nav
        className={`${backgroundColor} ${textColor} ${positionClasses} ${shadow} ${padding} ${transition} ${zIndex} ${visibilityClass} w-full`}
        onMouseLeave={closeAllDropdowns}
      >
        <div
          className={`w-full flex items-center justify-between ${className}`}
        >
          {/* Logo */}
          <div className="shrink-0">
            {logo &&
              (typeof logo === "string" ? (
                <Link href="/" className="flex items-center">
                  <Image
                    width={300}
                    height={300}
                    priority
                    src={logo || "/placeholder.svg"}
                    alt="Logo"
                    className="h-8 w-auto"
                  />
                </Link>
              ) : (
                logo
              ))}
          </div>

          {/* Desktop Navigation */}
          <div
            className={`hidden ${
              mobileBreakpoint === "lg"
                ? "lg:flex"
                : mobileBreakpoint === "md"
                ? "md:flex"
                : mobileBreakpoint === "sm"
                ? "sm:flex"
                : mobileBreakpoint === "xl"
                ? "xl:flex"
                : mobileBreakpoint === "2xl"
                ? "2xl:flex"
                : ""
            } items-center justify-center flex-1 mx-4`}
          >
            <ul className="flex bg-white/80 backdrop-blur-md px-4 py-3 rounded-full">
              {navItems
                ?.filter(shouldShowRoute)
                ?.map((item: NavItem, index: number) => (
                  <li key={index} className={`relative px-4  `}>
                    {navDivider && index < navItems.length - 1 && (
                      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 h-2.5  border-gray-300" />
                    )}
                    {item?.dropdown ? (
                      <div>
                        <button
                          onClick={() => toggleDropdown(index)}
                          className={`flex items-center ${hoverTextColor} ${
                            isActiveRoute(item.path ? item.path : "#")
                              ? activeTextColor
                              : ""
                          } focus:outline-none`}
                        >
                          {item.label}
                          <svg
                            className={`ml-1 h-4 w-4 transform ${
                              dropdownOpen[index] ? "rotate-180" : ""
                            } ${transition}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </button>
                        {dropdownOpen[index] && (
                          <div
                            className={`absolute left-0 mt-2 w-48 rounded-md shadow-lg ${dropdownBackgroundColor} border ${dropdownBorderColor} ${zIndex}`}
                          >
                            <div className="py-1">
                              {item.dropdown.map(
                                (
                                  dropdownItem: DropdownItem,
                                  dropdownIndex: number
                                ) => (
                                  <Link
                                    key={dropdownIndex}
                                    href={dropdownItem.path || "#"}
                                    className={`block px-4 py-2 ${dropdownTextColor} ${dropdownHoverBackgroundColor} ${
                                      isActiveRoute(dropdownItem.path || "#")
                                        ? activeTextColor
                                        : ""
                                    }`}
                                    onClick={() =>
                                      handleNavItemClick({
                                        ...item,
                                        path: dropdownItem.path,
                                      })
                                    }
                                  >
                                    {dropdownItem.label}
                                  </Link>
                                )
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <Link
                        href={item.path || "#"}
                        className={`${hoverTextColor} ${
                          isActiveRoute(item.path ? item.path : "#")
                            ? activeTextColor
                            : ""
                        }`}
                        onClick={() => handleNavItemClick(item)}
                      >
                        {item.label}
                      </Link>
                    )}
                  </li>
                ))}
            </ul>
          </div>

          {/* Buttons */}
          <div
            className={` ${
              mobileBreakpoint === "lg"
                ? "lg:flex max-lg:hidden"
                : mobileBreakpoint === "md"
                ? "md:flex max-md:hidden"
                : mobileBreakpoint === "sm"
                ? "sm:flex max-sm:hidden"
                : mobileBreakpoint === "xl"
                ? "xl:flex max-xl:hidden"
                : mobileBreakpoint === "2xl"
                ? "2xl:flex max-2xl:hidden"
                : "hidden"
            } items-center space-x-4`}
          >
            {buttons.map((button, index) =>
              button.component ? (
                <div key={index} onClick={() => handleButtonClick(index)}>
                  {button.component}
                </div>
              ) : (
                <button
                  key={index}
                  onClick={() => handleButtonClick(index)}
                  className={
                    button.className ||
                    "px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
                  }
                >
                  {button.label}
                </button>
              )
            )}
          </div>
          {/* Mobile Hamburger */}
          <div
            className={`${
              mobileBreakpoint === "lg"
                ? "lg:hidden"
                : mobileBreakpoint === "md"
                ? "md:hidden"
                : mobileBreakpoint === "sm"
                ? "hidden"
                : mobileBreakpoint === "xl"
                ? "xl:hidden"
                : mobileBreakpoint === "2xl"
                ? "2xl:hidden"
                : ""
            } flex gap-4`}
          >
            <div className="flex items-center justify-end space-x-4">
              {user &&
                buttons.map((button, index) =>
                  button.component ? (
                    <div key={index} onClick={() => handleButtonClick(index)}>
                      {button.component}
                    </div>
                  ) : (
                    <button
                      key={index}
                      onClick={() => handleButtonClick(index)}
                      className={
                        button.className ||
                        "px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
                      }
                    >
                      {button.label}
                    </button>
                  )
                )}
            </div>
            <button
              onClick={() => setIsOpen(true)}
              className={`p-1 border rounded-sm h-fit my-auto aspect-square ${hamburgerColor} focus:outline-none`}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
      </nav>
      <Drawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        navItems={navItems.filter(shouldShowRoute)}
        buttons={buttons}
        backgroundColor={drawerBackgroundColor}
        textColor={textColor}
        activeTextColor={activeTextColor}
        width={drawerWidth}
        zIndex={zIndex}
        onNavItemClick={handleNavItemClick}
        onButtonClick={handleButtonClick}
        isActiveRoute={isActiveRoute}
        activeBgColor={activeBgColor}
        activeHoverBgColor={activeHoverBgColor}
      />
    </>
  );
};
