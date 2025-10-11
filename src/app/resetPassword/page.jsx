"use client";
import { Suspense } from "react";
import ResetPasswordForm from "./reset";

export const dynamic = "force-dynamic";

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center min-h-screen">Loading...</div>}>
      <ResetPasswordForm />
    </Suspense>
  );
}
