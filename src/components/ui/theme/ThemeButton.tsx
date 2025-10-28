"use client";

import dynamic from "next/dynamic";

const ThemeSwitch = dynamic(() => import("./ThemeSwitch"), { ssr: false });

const ThemeButton = () => {
  return (
    <div>
      <ThemeSwitch variant="toggle" />
    </div>
  );
};

export default ThemeButton;
