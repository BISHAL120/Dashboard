import { getPublishedBlogs } from "@/action/getBlogs";
import BlogGrid from "@/components/aceternity/blogGrid/blogGrid";
import { db } from "@/lib/db";

const PublishedBlog = async () => {
  const blog = await db.blog.findMany({
    where: {
      published: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <div>
      {blog.length ? (
        <div>
          {" "}
          <BlogGrid data={blog} />
          <div className="flex justify-center pb-10"></div>{" "}
        </div>
      ) : (
        <div className="text-center text text-5xl font-semibold animate-pulse h-[80vh] flex justify-center items-center">
          No Blog has been published
        </div>
      )}
    </div>
  );
};

export default PublishedBlog;
