/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { verifyToken } from "@/utils/verifyToken";
import { logout, selectCurrentToken } from "@/redux/features/auth/authSlice";
import Loading from "@/components/shared/loading/Loading";
import { useGetMeQuery } from "@/redux/features/auth/authApi";

const WithAdmin = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true); // Loading state
  const token = useAppSelector(selectCurrentToken); // Check for token
  const user: any | null = token ? verifyToken(token) : null;

  const { data: response, isLoading } = useGetMeQuery(undefined);
  const userData = response?.data;

  useEffect(() => {
    if (!token) {
      console.log("No Token");
      dispatch(logout());
      router.replace("/auth/register?tab=signin"); // Redirect if not authenticated
    } else if (
      user &&
      user.role !== "SUPER_ADMIN" &&
      user?.role !== userData?.role
    ) {
      console.log("Not Super Admin");
      dispatch(logout());
      router.replace("/auth/register?tab=signin");
    } else {
      setLoading(false); // Stop loading once authenticated
    }
  }, [router, token, user, dispatch, userData]);

  if (loading || isLoading) {
    return <Loading />;
  }

  return children; // Render the children if authenticated
};

export default WithAdmin;
