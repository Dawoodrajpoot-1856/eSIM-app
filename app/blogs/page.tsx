export const dynamic = "force-dynamic";
export const revalidate = 0;

import { unstable_noStore as noStore } from "next/cache";
import { supabase } from "@/lib/db";
import BlogsShow from "@/components/blogslugdetails/BlogsShow";

export default async function BlogsPage() {
  noStore();
  const { data: blogs } = await supabase
    .from("blogs")
    .select("*")
    .order("created_at", { ascending: false });

  return <BlogsShow initialBlogs={blogs || []} />;
}
