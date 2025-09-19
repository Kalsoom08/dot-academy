'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { fetchCurrentUser } from "../../../slices/authSlice";
import ClipLoader from "react-spinners/ClipLoader";

export default function GoogleLoginSuccess() {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);

      dispatch(fetchCurrentUser()).then((res) => {
        const user = res.payload;
        if (!user.name || !user.gender || !user.province) {
          router.push("/profile/setupProfile");
        } else {
          router.push("/AuthComponents/home");
        }
      });
    } else {
      router.push("/login");
    }
  }, [dispatch, router]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <ClipLoader size={60} color="#7D287E" />
      <p className="mt-4 text-gray-600 text-lg font-medium">
        Signing you in with Google...
      </p>
    </div>
  );
}
