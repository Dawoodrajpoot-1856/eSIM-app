import { supabase } from "@/lib/db";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Calendar, User } from "lucide-react";
import type { Metadata } from "next";

interface BlogPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;

  const { data: blog } = await supabase
    .from("blogs")
    .select("title, content, image_url")
    .eq("slug", slug)
    .single();

  if (!blog) {
    return {
      title: "Blog Not Found | eSIM Travel",
    };
  }

  return {
    title: `${blog.title} | eSIM Travel`,
    description: blog.content.slice(0, 160) + "...",
    openGraph: {
      title: blog.title,
      description: blog.content.slice(0, 160),
      images: [blog.image_url],
    },
  };
}

// 2. Main Blog Page
export default async function BlogDetailPage({ params }: BlogPageProps) {
  const { slug } = await params;

  const { data: blog, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !blog) {
    notFound();
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <Link
        href="/blogs"
        className="inline-flex items-center gap-2 text-sm font-semibold text-green-800 hover:text-green-900 mb-8 transition"
      >
        <ArrowLeft size={16} /> Back to Blogs
      </Link>

      <div className="mb-8">
        <span className="inline-block bg-green-50 text-green-800 text-xs font-semibold px-3 py-1 rounded-full mb-3 border border-green-200">
          {blog.category}
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
          {blog.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 border-b border-gray-200 pb-6">
          <div className="flex items-center gap-1.5">
            <User size={16} className="text-green-800" />
            <span className="font-medium text-gray-900">
              {blog.author_name}
            </span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1.5">
            <Calendar size={16} className="text-green-800" />
            <span>
              {new Date(blog.created_at).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1.5">
            <Clock size={16} className="text-green-800" />
            <span>{blog.read_time || "3 min read"}</span>
          </div>
        </div>
      </div>

      <div className="w-full h-87.5 sm:h-112.5 rounded-2xl overflow-hidden shadow-md mb-10 bg-gray-100">
        <img
          src={blog.image_url}
          alt={blog.title}
          className="w-full h-full object-cover"
        />
      </div>

      <article className="prose prose-green max-w-none text-gray-700 text-base sm:text-lg leading-relaxed space-y-6">
        <p className="whitespace-pre-line">{blog.content}</p>
      </article>
    </main>
  );
}
