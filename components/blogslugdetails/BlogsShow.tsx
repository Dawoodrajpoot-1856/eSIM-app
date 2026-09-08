"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export interface Blog {
  id: string;
  title: string;
  slug: string;
  content: string;
  category: string;
  image_url: string;
  author_name: string;
  author_avatar?: string;
  read_time?: string;
  created_at: string;
}

interface BlogsShowProps {
  initialBlogs: Blog[];
}

export default function BlogsShow({ initialBlogs = [] }: BlogsShowProps) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(searchTerm);
  };

  const filteredBlogs = initialBlogs.filter((blog) => {
    const query = searchQuery.toLowerCase();
    return (
      blog.title.toLowerCase().includes(query) ||
      blog.category.toLowerCase().includes(query)
    );
  });

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="font-semibold text-4xl text-green-900 mb-4">
          Blogs eSIM
        </h1>

        <form
          onSubmit={handleSearch}
          className="flex justify-center max-w-md mx-auto"
        >
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              if (e.target.value === "") {
                setSearchQuery("");
              }
            }}
            className="w-full p-3 rounded-l-xl border-gray-300 border focus:outline-none focus:ring-1 focus:ring-green-600 text-gray-900"
            placeholder="Search by title or category..."
          />
          <button
            type="submit"
            className="px-6 bg-green-800 hover:bg-green-900 rounded-r-xl text-white font-medium transition cursor-pointer"
          >
            Search
          </button>
        </form>
      </div>

      {filteredBlogs.length === 0 ? (
        <div className="text-center py-16 text-gray-500">
          <p className="text-lg">
            Koi blog nahi mila jo is search se match karta ho.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBlogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative w-full h-48 bg-gray-100">
                  <img
                    src={blog.image_url}
                    alt={blog.title}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-3 left-3 bg-green-800 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                    {blog.category}
                  </span>
                </div>

                <div className="p-6">
                  <div className="flex items-center text-xs text-gray-500 mb-2 space-x-2">
                    <span>
                      {new Date(blog.created_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                    <span>•</span>
                    <span>{blog.read_time || "3 min read"}</span>
                  </div>

                  <h2 className="font-bold text-xl text-gray-900 mb-2 hover:text-green-800 transition-colors cursor-pointer line-clamp-2">
                    {blog.title}
                  </h2>

                  <p className="text-gray-600 text-sm mb-6 line-clamp-2">
                    {blog.content}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-0 flex items-center justify-between border-t border-gray-100 mt-auto pt-4">
                <span className="text-xs font-medium text-gray-800">
                  {blog.author_name}
                </span>

                <Link
                  href={`/blogs/${blog.slug}`}
                  className="text-green-800 hover:text-green-900 text-sm font-semibold inline-flex items-center gap-1 group"
                >
                  <span>Read More</span>
                  <ArrowRight
                    size={14}
                    className="transform group-hover:translate-x-1 transition-transform"
                  />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
