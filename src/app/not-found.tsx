"use client";

import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div className="h-screen">
      <h3 className="text-center text-8xl font-semibold">Page Not Found</h3>
      <Link href="/" className="">
        <button className="mt-10">
          <span className="text-2xl">Go to Home</span>
        </button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
