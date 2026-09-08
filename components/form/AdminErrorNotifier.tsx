"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function AdminErrorNotifier() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const error = searchParams.get("error");

  useEffect(() => {
    if (error === "admin_only") {
      alert(
        "⚠️ Access Denied: Please login with admin email to open admin pages.",
      );
      router.replace("/");
    }
  }, [error, router]);

  return null;
}
