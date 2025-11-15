"use client";
import React from "react";
import { Navbar } from "../navbar";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/pages/dashboardLayout/dropdown-menu";
import Image from "next/image";
import { Button } from "@/components/ui/button/Button";
import Logo from "../../logo/Logo";

const NavBar = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  const navItems = [
    {
      label: "Home",
      path: "/",
    },
    {
      label: "Shop",
      path: "/shop",
    },
    {
      label: "Blog",
      path: "/blog",
    },
    {
      label: "Contact",
      path: "/contact",
    },
    {
      label: "About",
      path: "/about",
    },
  ];

  // Example buttons with custom components
  const buttons = [
    {
      label: "Register",
      onClick: () => console.log("Register clicked"),
      component: user ? (
        <DropdownMenu>
          <DropdownMenuTrigger className="focus:outline-none">
            <div className="flex items-center gap-2">
              <Image
                src="https://ferf1mheo22r9ira.public.blob.vercel-storage.com/avatar-02-albo9B0tWOSLXCVZh9rX9KFxXIVWMr.png"
                alt="User avatar"
                width={28}
                height={28}
                className="rounded-full ring-2 ring-gray-200 dark:ring-[#2B2B30] sm:w-9 sm:h-9 cursor-pointer"
              />
            </div>
          </DropdownMenuTrigger>
        </DropdownMenu>
      ) : (
        <div className="flex max-md:flex-col gap-2">
          <Link href="/register">
            <Button size="sm" className="w-full">
              Register
            </Button>
          </Link>
          <Link href={"/login"}>
            <Button size="sm" className="w-full" variant="outline">
              Login
            </Button>
          </Link>
        </div>
      ),
    },
  ];

  // Example conditional routes
  const conditionalRoutes = {
    "/pricing": true, // Show pricing page
    "/admin": false, // Hide admin page
  };

  return (
    <div className="mb-16 lg:mb-20">
      <Navbar
        className="max-w-[1920px] mx-auto sm:px-[1.5%]"
        position="fixed"
        shadow="shadow-xl"
        backgroundColor="bg-white lg:py-4"
        logo={<Logo />}
        activeTextColor="text-primary hover:!text-primary-light font-medium"
        textColor="text-dark hover:text-dark-light font-medium"
        hoverTextColor="hover:text-text-dark-light"
        navItems={navItems}
        buttons={buttons}
        hideOnScroll
        conditionalRoutes={conditionalRoutes}
        onNavItemClick={(item) => console.log("Nav item clicked:", item.label)}
        onButtonClick={(index, button) =>
          console.log(`Button ${index} clicked:`, button.label)
        }
      />
    </div>
  );
};

export default NavBar;
