import FAQPage from "@/components/Home/faq";
import Hero from "@/components/Home/Hero";
import PackageCards from "@/components/pakageslugshow/PakagesDetail";
import { supabase } from "@/lib/db";

export default async function Home() {
  const { data: plans } = await supabase
    .from("plans")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <main>
      <Hero />
      <PackageCards initialPlans={plans || []} />
      <FAQPage />
    </main>
  );
}
