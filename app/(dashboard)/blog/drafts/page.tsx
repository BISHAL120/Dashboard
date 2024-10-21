import BlogGrid from "@/components/aceternity/blogGrid/blogGrid";
import { db } from "@/lib/db";
import { Blog } from "@prisma/client";
import { useEffect, useState } from "react";

const DraftBlog = async () => {
  const blog = await db.blog.findMany({
    where: {
      published: false,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div>
      {" "}
      <BlogGrid data={blog} />
    </div>
  );
};

export default DraftBlog;
