// app/packages/page.tsx
export const dynamic = "force-dynamic";
export const revalidate = 0;

import { unstable_noStore as noStore } from "next/cache"; // 👈 Yeh import karein
import PackageCards from "@/components/pakageslugshow/PakagesDetail";
import { supabase } from "@/lib/db";
import React from "react";

export default async function PackagesPage() {
  noStore();
  const { data: plans } = await supabase
    .from("plans")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div>
      <PackageCards initialPlans={plans || []} />
    </div>
  );
}
