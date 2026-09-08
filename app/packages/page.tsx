import PackageCards from "@/components/pakageslugshow/PakagesDetail";
import { supabase } from "@/lib/db";
import React from "react";

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
