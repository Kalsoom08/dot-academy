'use client';

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { fetchCurrentUser } from "../../../slices/authSlice";
import ClipLoader from "react-spinners/ClipLoader";
import api from "../../../APIs/api";

export default function GoogleLoginSuccess() {
  const router = useRouter();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");
    const status = searchParams.get("status"); 

    if (!token) {

      router.push("/");
      return;
    }

    localStorage.setItem("token", token);
    api.defaults.headers.Authorization = `Bearer ${token}`;


    dispatch(fetchCurrentUser())
      .unwrap()
      .then((user) => {
        if (status === "setup" || !user.name || !user.gender || !user.province) {
          router.push("/profile/setupProfile");
        } else {
          router.push("/AuthComponents/home");
        }
      })
      .catch((err) => {
        console.error("Error fetching current user:", err);
        router.push("/");
      });
  }, [dispatch, router, searchParams]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <ClipLoader size={60} color="#7D287E" />
      <p className="mt-4 text-gray-600 text-lg font-medium">
        Signing you in with Google...
      </p>
    </div>
  );
}
