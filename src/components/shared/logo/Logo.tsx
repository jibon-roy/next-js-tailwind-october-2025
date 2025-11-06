import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "@/assets/images/logo.png";

const Logo = () => {
  return (
    <div className="flex-shrink-0">
      <Link href="/">
        <Image
          src={logo}
          alt="Logo"
          width={logo.width}
          height={logo.height}
          className="w-[82px] h-auto"
        />
      </Link>
    </div>
  );
};

export default Logo;
