// components/Dropdown.tsx
"use client";
import React, { useEffect, useRef, useState } from "react";
import Profile01 from "./profile-01";

interface DropdownMenuProps {
  children: React.ReactNode;
}

interface DropdownMenuContentProps {
  children: React.ReactNode;
  align?: string;
  sideOffset?: number;
  className?: string;
  onClose?: () => void;
}

interface DropdownMenuTriggerProps {
  children: React.ReactNode;
  className?: string;
}

export const DropdownMenuTrigger = ({
  children,
  className,
}: DropdownMenuTriggerProps) => {
  return <div className={className}>{children}</div>;
};

export const DropdownMenuContent = ({
  children,
  align = "start",
  sideOffset = 0,
  className = "",
  onClose,
}: DropdownMenuContentProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose?.(); // ✅ Close when clicked outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div
      ref={ref}
      className={`absolute z-10000 ${
        align === "end" ? "right-0" : "left-0"
      } ${className}`}
      style={{
        marginTop: sideOffset,
        top: "100%",
      }}
    >
      <div className="relative p-2 bg-white border border-zinc-200 rounded-lg shadow-lg">
        {children}
      </div>
    </div>
  );
};

export const DropdownMenu = ({ children }: DropdownMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <div onMouseDown={() => setIsOpen(!isOpen)}>{children}</div>
      {isOpen && (
        <DropdownMenuContent
          align="end"
          onClose={() => setIsOpen(false)} // ✅ Better than onBlur
          sideOffset={8}
          className="w-[280px] sm:w-80"
        >
          <Profile01 />
        </DropdownMenuContent>
      )}
    </div>
  );
};
