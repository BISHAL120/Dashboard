"use server";

import React from "react";
import Editor from "./components/editor";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import CreateBlog from "./components/createBlog";

const BlogPage = async ({ params }: { params: { blogId: string } }) => {
  let getBlog = null;
  if (params.blogId !== "new") {
    getBlog = await db.blog.findUnique({
      where: {
        id: params.blogId,
      },
    });
    if (getBlog === null) {
      redirect("/blog/id/new");
    }
  }

  return (
    <div>
      {/* <Editor id={params.blogId} initialData={getBlog} /> */}
      <CreateBlog />
    </div>
  );
};

export default BlogPage;
