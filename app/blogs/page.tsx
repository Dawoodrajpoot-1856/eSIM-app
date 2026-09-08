import { supabase } from "@/lib/db";
import BlogsShow from "@/components/blogslugdetails/BlogsShow";

export default async function BlogsPage() {
  const { data: blogs } = await supabase
    .from("blogs")
    .select("*")
    .order("created_at", { ascending: false });

  return <BlogsShow initialBlogs={blogs || []} />;
}
