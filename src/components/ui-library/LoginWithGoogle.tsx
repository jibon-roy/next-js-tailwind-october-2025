"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";

const LoginWithGoogle = () => {
  const { data: session } = useSession();
  console.log(session);
  return (
    <div>
      {session ? (
        <div>
          <p>Name: {session?.user?.name}</p>
          <p>Email: {session?.user?.email}</p>
          <p>Image:</p>{" "}
          <Image
            src={
              session?.user?.image ||
              "https://static1.srcdn.com/wordpress/wp-content/uploads/2024/10/untitled-design-2024-10-01t123706-515-1.jpg"
            }
            alt="image"
            height={200}
            width={200}
          />
        </div>
      ) : (
        <button
          onClick={() => signIn("google")}
          className="relative w-full  text-white py-2 px-4 rounded-md bg-[#4285F4]/50 flex items-center justify-center gap-2  cursor-pointer"
        >
          <div className="">
            <FcGoogle size={24} />
          </div>
          Sign up with Google
        </button>
      )}

      <div>
        {session && (
          <button
            className="relative w-full text-white py-2 px-4 rounded-md bg-[#4285F4]/50 flex items-center justify-center gap-2 cursor-pointer"
            onClick={() => signOut()}
          >
            Logout
          </button>
        )}
        {!session && <p>You are not logged in</p>}
      </div>
    </div>
  );
};

export default LoginWithGoogle;
