import type { MetadataRoute } from "next";
import { supabase } from "@/lib/db";

const createSlug = (title: string) => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://esim-app-codiea.vercel.app/";

  const { data: packages } = await supabase.from("plans").select("title");

  const { data: blogs } = await supabase.from("blogs").select("title");

  const packageUrls =
    packages?.map((item) => ({
      url: `${baseUrl}/packages/${createSlug(item.title)}`,
      lastModified: new Date(),
    })) || [];

  const blogUrls =
    blogs?.map((item) => ({
      url: `${baseUrl}/blogs/${createSlug(item.title)}`,
      lastModified: new Date(),
    })) || [];

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },

    {
      url: `${baseUrl}/packages`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },

    ...packageUrls,

    {
      url: `${baseUrl}/blogs`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },

    ...blogUrls,
  ];
}
