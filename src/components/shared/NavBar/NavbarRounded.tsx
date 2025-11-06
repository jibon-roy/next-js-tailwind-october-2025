import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import { X } from "lucide-react";
import { GiHamburgerMenu } from "react-icons/gi";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Logo from "../logo/Logo";
import { Button } from "@/src/components/ui/button/Button";

const NavBarRounded = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Function to handle scroll behavior

  // Effect to track scrolling
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 350) {
        // Hide navbar when scrolling down
        if (currentScrollY > lastScrollY) {
          setShowNavbar(false);
        } else {
          setShowNavbar(true);
        }
      } else {
        setShowNavbar(true);
      }

      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  const links = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Work",
      href: "/#work",
    },
    {
      name: "About",
      href: "/#about",
    },
    {
      name: "Skill",
      href: "/#skill",
    },
    {
      name: "Contact",
      href: "/#contact",
    },
  ];

  const route = usePathname();

  const active = links.find((link) => {
    const [path, hash] = link.href.split("#");

    return route === path || (hash && route.startsWith(`${path}#${hash}`));
  });

  return (
    <>
      <motion.nav
        className="shadow-xl shadow-black/5 bg-[#FFFFFFA3] px-5 py-1 sm:py-3 border overflow-hidden border-black/10 
      lg:mt-5 lg:rounded-full fixed w-full max-w-[1400px] lg:right-1/2 lg:translate-x-1/2 z-99999"
        initial={{ opacity: 1, y: 0 }}
        animate={{
          opacity: showNavbar ? 1 : 0,
          y: showNavbar ? 0 : -20,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        onMouseEnter={() => setShowNavbar(true)}
      >
        <div className="flex w-full gap-2 justify-between">
          <div className="flex items-center max-lg:flex-1 gap-5">
            <Logo />
          </div>
          <div className="flex justify-between lg:items-center lg:mx-auto">
            {/* Logo */}

            <div className="hidden text-center text-black3 lg:flex items-center gap-5">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={` hover:text-black5 ${
                    active?.href === link.href
                      ? "text-primary font-bold"
                      : "font-medium"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Mobile Menu Toggle */}
          </div>
          {/* Action Buttons */}

          <div className="hidden lg:flex gap-2 items-center ">
            <Link href={"/#contact"}>
              <Button className="rounded-full">Contact Us</Button>
            </Link>
          </div>
          <button
            className="lg:hidden p-2 focus:outline-none"
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
          >
            <GiHamburgerMenu size={30} />
          </button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          className="lg:hidden w-full z-999 bg-white/90 shadow-2xl border-b border-white pb-8 px-6 flex flex-col pt-14 sm:pt-8 gap-3"
          initial={{ opacity: 0, y: -500 }}
          animate={{
            opacity: isMobileMenuOpen ? 1 : 0,
            y: isMobileMenuOpen ? 0 : -500,
          }}
          exit={{ opacity: 0, y: -500 }}
          transition={{ duration: 0.2 }}
          style={{
            position: "fixed",
            left: 0,
            zIndex: 999,
            top: "0",
          }}
        >
          <div className="">
            <button
              className="lg:hidden p-2 absolute top-2 right-3 focus:outline-none"
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            >
              <X size={30} />
            </button>
            <div className="flex flex-col text-2xl gap-5">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-medium hover:text-black5"
                >
                  {link.name}
                </Link>
              ))}
              <div className="flex gap-2 items-center">
                <Link href={"/inscription"}>
                  <Button
                    variant="outline"
                    className="rounded-full w-fit max-w-xs"
                  >
                    S’inscrire
                  </Button>
                </Link>
                <Link href={"/connexion"}>
                  <Button
                    variant="accent"
                    className="rounded-full w-fit max-w-xs"
                  >
                    Connexion
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.nav>
    </>
  );
};

export default NavBarRounded;
