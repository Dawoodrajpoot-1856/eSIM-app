import PackageCards from "@/components/pakageslugshow/PakagesDetail";
import { supabase } from "@/lib/db";
import React from "react";

// 👇 Yeh 2 lines add karein (Yeh Vercel ko bolengi ke har baar fresh data laye)
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function PackagesPage() {
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
