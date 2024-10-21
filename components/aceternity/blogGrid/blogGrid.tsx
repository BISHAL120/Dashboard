"use client";
import { getAllBlogs } from "@/action/getBlogs";
import { Blog } from "@prisma/client";
import { BentoGrid, BentoGridItem } from "../ui/bento-grid";
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
      <BentoGrid className="max-w-[1200px] mx-auto my-10">
        {data.map((item, i) => (
          <BentoGridItem
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
      </BentoGrid>
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
