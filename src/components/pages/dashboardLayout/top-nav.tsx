import { DropdownMenu, DropdownMenuTrigger } from "./dropdown-menu";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import NotificationDetails from "./NotificationDetails";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export default function TopNav() {
  const breadcrumbs: BreadcrumbItem[] = [
    { label: "ProjectTitle", href: "#" },
    { label: "dashboard", href: "#" },
  ];

  return (
    <nav className="px-3 sm:px-6 flex items-center justify-between bg-white   h-full">
      <div className="font-medium text-sm hidden lg:flex items-center space-x-1 truncate max-w-[300px]">
        {breadcrumbs.map((item, index) => (
          <div key={item.label} className="flex items-center">
            {index > 0 && (
              <ChevronRight className="h-4 w-4 text-gray-500 dark:text-gray-500 mx-1" />
            )}
            {item.href ? (
              <Link
                href={item.href}
                className="text-gray-700 dark:text-gray-500 hover:text-gray-900 dark:hover:text-gray-400 transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-gray-900 dark:text-gray-100">
                {item.label}
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 ml-auto lg:ml-0">
        <NotificationDetails />

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
      </div>
    </nav>
  );
}
