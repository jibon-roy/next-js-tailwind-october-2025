"use client";

import { useState } from "react";
import Link from "next/link";
import type { NavItem, DrawerProps, DropdownItem } from "./types";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export const Drawer = ({
  isOpen,
  onClose,
  navItems,
  buttons,
  backgroundColor = "bg-white",
  textColor = "text-gray-800",
  activeTextColor = "text-blue-600",
  width = "w-64",
  zIndex = "z-50",
  onNavItemClick,
  onButtonClick,
  isActiveRoute,
  activeBgColor = "bg-blue-100",
  activeHoverBgColor = "hover:bg-blue-50",
}: DrawerProps) => {
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>(
    {}
  );

  const toggleExpand = (index: number) => {
    setExpandedItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleNavItemClick = (item: NavItem) => {
    if (!item.dropdown) {
      onClose();
      if (onNavItemClick) {
        onNavItemClick(item);
      }
    }
  };

  const user = useSelector((state: RootState) => state.auth.user);

  const handleButtonClick = (index: number) => {
    onClose();
    if (onButtonClick) {
      onButtonClick(index, buttons[index]);
    }
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className={`fixed z-999 inset-0 bg-black/30 bg-opacity-50 ${zIndex}`}
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed z-999999 top-0 right-0 h-full ${width} ${backgroundColor} transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="flex flex-col z-50 h-full">
          {/* Close button */}
          <div className="flex py-2 justify-end px-4">
            <button
              onClick={onClose}
              className={`p-1 rounded-md border ${textColor} focus:outline-none`}
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Navigation items */}
          <div className="flex-1 w-full h-screen ">
            <ul>
              {navItems.map((item, index) => (
                <li
                  key={index}
                  className={`px-4 py-2 ${
                    isActiveRoute(item.path || "#")
                      ? activeBgColor
                      : activeHoverBgColor
                  }`}
                >
                  {item.dropdown ? (
                    <div>
                      <button
                        onClick={() => toggleExpand(index)}
                        className={`flex items-center justify-between w-full ${
                          isActiveRoute(item.path || "#")
                            ? activeTextColor
                            : textColor
                        } focus:outline-none`}
                      >
                        <span>{item.label}</span>
                        <svg
                          className={`h-4 w-4 transform ${
                            expandedItems[index] ? "rotate-180" : ""
                          } transition-transform duration-200`}
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
                      {expandedItems[index] && (
                        <div className="mt-2 ml-4 space-y-2">
                          {item.dropdown.map(
                            (
                              dropdownItem: DropdownItem,
                              dropdownIndex: number
                            ) => (
                              <Link
                                key={dropdownIndex}
                                href={dropdownItem.path || "#"}
                                className={`block ${
                                  isActiveRoute(dropdownItem.path || "#")
                                    ? activeTextColor
                                    : textColor
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
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.path || "#"}
                      className={`block ${
                        isActiveRoute(item.path || "#")
                          ? activeTextColor
                          : textColor
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
          <div className="p-4 space-y-2">
            {!user
              ? buttons.map((button, index) =>
                  button.component ? (
                    <div
                      key={index}
                      onClick={() => handleButtonClick(index)}
                      className="w-full"
                    >
                      {button.component}
                    </div>
                  ) : (
                    <button
                      key={index}
                      onClick={() => handleButtonClick(index)}
                      className={
                        button.className ||
                        "w-full px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
                      }
                    >
                      {button.label}
                    </button>
                  )
                )
              : ""}
          </div>
        </div>
      </div>
    </>
  );
};
