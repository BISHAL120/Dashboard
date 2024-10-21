import { cn } from "@/lib/utils";
import { Divider } from "@nextui-org/react";
import { format, formatDistanceToNow } from "date-fns";
import { CircleUser, Heart, MessageCircle, View } from "lucide-react";
import { Image } from "@nextui-org/react";
import NextImage from "next/image";
import Link from "next/link";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-3 gap-4 mx-auto ",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  published,
  updated,
  image,
  likes,
  viewCount,
  id,
}: {
  className?: string;
  title?: string | React.ReactNode;
  published?: Date;
  updated?: Date;
  image?: string;
  viewCount?: number;
  likes?: number;
  id: string;
}) => {
  return (
    <Link
      href={`/blog/id/${id}`}
      className={cn(
        "row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-black dark:border-white/[0.2] bg-white border justify-between flex flex-col space-y-4 border-b m-1 md:m-0",
        className
      )}
    >
      <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100">
        <Image
          as={NextImage}
          width={350}
          height={250}
          src={image ? image : "/image/No Preview.jpeg"}
          className="object-contain mx-auto rounded-xl"
          alt="Title Image"
        ></Image>
      </div>
      <div className="group-hover/bento:translate-x-2 transition duration-200 border border-b-0 border-x-0 border-t">
        <div className="font-sans font-bold text-lg text-neutral-600 dark:text-neutral-200 mb-2 mt-2">
          <div className="flex justify-between">
            <div className="flex mb-2 items-center gap-5">
              <div className="flex items-center gap-1">
                <CircleUser size={16} />{" "}
                <span className="text-base font-bold">{viewCount}</span>
              </div>

              <div className="flex items-center gap-1">
                <Heart color="red" fill="red" size={16} />{" "}
                <span className="text-base font-bold">{likes}</span>
              </div>
            </div>
            <div className=" font-semibold text-neutral-600 text-sm dark:text-neutral-300">
              {updated ? (
                <>
                  Updated: {formatDistanceToNow(updated, { addSuffix: true })}
                </>
              ) : (
                ""
              )}
            </div>
          </div>
          {title}
        </div>
        <div className=" font-semibold text-neutral-600 text-xs dark:text-neutral-300">
          {published ? (
            <>
              Published: {formatDistanceToNow(published, { addSuffix: true })}
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </Link>
  );
};
