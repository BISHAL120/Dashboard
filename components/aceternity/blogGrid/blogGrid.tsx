"use client";
import { getAllBlogs } from "@/action/getBlogs";
import { Blog } from "@prisma/client";
import { BlogCard } from "../ui/bento-grid";
import { Pagination } from "@nextui-org/react";
import { db } from "@/lib/db";
import { useRouter } from "next/navigation";

const BlogGrid = ({ data, count }: { data: Blog[]; count?: number }) => {
  const router = useRouter();
  if (!data.length) {
    return (
      <div className="text-center text-5xl font-semibold animate-pulse h-[80vh] flex justify-center items-center">
        No Blog Available
      </div>
    );
  }

  const changePage = (page: number) => {
    console.log("page", page);
    router.push(`?page=${page}`);
  };

  return (
    <div className="min-h-[calc(100vh-90px)] flex flex-col justify-between">
      <div className="max-w-[1200px] mx-auto my-10 grid grid-cols-1 md:grid-cols-3 gap-4">
        {data.map((item, i) => (
          <BlogCard
            id={item.id}
            likes={item.likes}
            viewCount={item.viewCount}
            key={i}
            title={item.title}
            published={item.createdAt}
            updated={item.updatedAt}
            image={item.banner}
            className={`${
              (i - 4) % 6 === 0
                ? "md:col-span-2 md:row-span-2 max-h-[815px]"
                : "max-h-[400px]"
            } min-h-96 border-b`}
          />
        ))}
      </div>
      <div className="w-full flex justify-center items-center">
        <Pagination
          onChange={changePage}
          isCompact
          showControls
          total={count ? count : 1}
          initialPage={1}
        />
      </div>
    </div>
  );
};
export default BlogGrid;
