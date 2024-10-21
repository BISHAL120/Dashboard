import BlogGrid from "@/components/aceternity/blogGrid/blogGrid";
import { db } from "@/lib/db";
import { Pagination } from "@nextui-org/react";
import { Blog } from "@prisma/client";
import axios from "axios";
import React, { useEffect, useState } from "react";

const AllBlog = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const page = searchParams["page"] ?? "1";
  const per_page = searchParams["per_page"] ?? "6";

  const count = Math.ceil((await db.blog.count()) / 6);
  const blog = await db.blog.findMany({
    skip: (Number(page) - 1) * Number(per_page),
    take: Number(per_page),
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div>
      <BlogGrid data={blog} count={count} />
    </div>
  );
};

export default AllBlog;
