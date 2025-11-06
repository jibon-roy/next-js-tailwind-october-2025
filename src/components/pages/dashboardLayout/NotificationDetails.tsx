"use client";

import { Bell, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function NotificationDetails() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button
        type="button"
        className="p-1.5 sm:p-2 hover:bg-gray-200 border-2 border-gray-200 cursor-pointer rounded-full transition-colors"
        onClick={toggleDrawer}
      >
        <Bell className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600 " />
      </button>

      {/* Drawer/Sidebar */}
      <div
        className={`fixed top-0 right-0 w-80 h-full bg-white  shadow-xl transition-transform duration-300 transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } z-100000`}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-200 ">
          <h3 className="text-lg font-semibold">Notifications</h3>
          <button onClick={toggleDrawer} className="text-gray-600 ">
            <X />
          </button>
        </div>
        <div className="p-4">
          {/* Notifications Content */}
          <ul>
            <li className="p-2 hover:bg-gray-100  rounded">
              <Link href="#" className="text-gray-700 ">
                Notification #1
              </Link>
            </li>
            <li className="p-2 hover:bg-gray-100  rounded">
              <Link href="#" className="text-gray-700 ">
                Notification #2
              </Link>
            </li>
            <li className="p-2 hover:bg-gray-100  rounded">
              <Link href="#" className="text-gray-700 ">
                Notification #3
              </Link>
            </li>
            {/* Add more notifications here */}
          </ul>
        </div>
      </div>

      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ${
          isOpen ? "opacity-50" : "opacity-0 pointer-events-none"
        } z-99999`}
        onClick={toggleDrawer}
      ></div>
    </div>
  );
}
