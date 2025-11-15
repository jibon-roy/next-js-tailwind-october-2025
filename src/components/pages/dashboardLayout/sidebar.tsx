/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  BarChart2,
  Building2,
  Folder,
  Settings,
  LogOut,
  Menu,
} from "lucide-react";

import { Home } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
// import Image from "next/image";
import { logoutHandler } from "@/utils/handleLogout";
import { useRouter, usePathname } from "next/navigation";
import { useDispatch } from "react-redux";
import { FcCdLogo } from "react-icons/fc";

function NavItem({
  href = "#",
  icon: Icon,
  children,
}: {
  href?: string;
  icon?: React.ComponentType<any>;
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Function to check if a menu item is active
  const isActive = (href: string) => pathname === href;
  return (
    <Link
      href={href}
      className={`flex items-center px-3 py-2 text-sm md:text-base rounded-md transition-colors 
        ${isActive(href) ? "text-blue-600 bg-blue-100" : "text-gray-600"} 
        hover:text-gray-900 hover:bg-gray-100`}
    >
      {Icon && <Icon className="h-5 w-5 mr-3 shrink-0" />}
      {children}
    </Link>
  );
}

export default function Sidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();
  const handleLogout = () => {
    logoutHandler(dispatch, router);
    window.dispatchEvent(new Event("logout"));
  };

  return (
    <>
      <button
        type="button"
        className="lg:hidden fixed top-4 left-4 z-70 p-2 rounded-lg bg-white shadow-md"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <Menu className="h-5 w-5 text-gray-600" />
      </button>
      <nav
        className={`fixed inset-y-0 left-0 z-70 w-64 bg-white transform transition-transform duration-200 ease-in-out
                lg:translate-x-0 lg:static lg:w-64 border-r border-gray-200
                ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="h-full flex flex-col">
          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="h-16 px-6 flex items-center border-b border-gray-200"
          >
            <div className="flex items-center gap-3">
              {/* <Image
                src=""
                alt="Logo"
                width={32}
                height={32}
                className="flex-shrink-0 hidden dark:block"
              /> */}
              <FcCdLogo size={150} className="h-10 w-auto mr-3" />
              <span className="text-lg font-semibold hover:cursor-pointer text-gray-900 dark:text-white">
                Logo
              </span>
            </div>
          </Link>

          <div className="flex-1 overflow-y-auto py-4 px-4">
            <div className="space-y-6">
              <div>
                <div className="space-y-1">
                  <NavItem href="/dashboard" icon={Home}>
                    Dashboard
                  </NavItem>
                  <NavItem href="/demo" icon={BarChart2}>
                    Demo
                  </NavItem>
                  <NavItem href="/organization" icon={Building2}>
                    Demo 2
                  </NavItem>
                  <NavItem href="/projects" icon={Folder}>
                    Demo 3
                  </NavItem>
                </div>
              </div>
            </div>
          </div>

          <div className="px-4 py-4 border-t border-gray-200">
            <div className="space-y-1">
              <NavItem href="/settings" icon={Settings}>
                Settings
              </NavItem>
              <NavItem>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center"
                >
                  <LogOut size={35} className="h-5 w-5 mr-3" />
                  <span className="text-sm md:text-base text-gray-600">
                    Logout
                  </span>
                </button>
              </NavItem>
            </div>
          </div>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-65 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
}
