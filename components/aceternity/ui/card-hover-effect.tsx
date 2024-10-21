"use client";

import { AnimatePresence, motion } from "framer-motion";
import NextImage from "next/image";
import { useState } from "react";
// import { aceternityUicn } from "../aceternityUtils";
import { Image } from "@nextui-org/react";
import { Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

export const HoverEffect = ({
  items,
  handleDeleteImage,
  className,
}: {
  items: File[];
  handleDeleteImage: (item: any) => void;
  className?: string;
}) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2  lg:grid-cols-4 ",
        className
      )}
    >
      {items.map((item, idx) => (
        <div
          key={idx}
          className="relative group p-2 h-full w-full flex justify-center"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-slate-800/[0.8] block  rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>

          <div className="relative aspect-square overflow-hidden rounded-md  h-[200px] w-[300px]">
            <Image
              as={NextImage}
              src={URL.createObjectURL(item)}
              width={300}
              height={300}
              alt={`Product Image ${idx + 1}`}
              isBlurred
              className="object-cover border"
            />
            <div
              onClick={() => handleDeleteImage(item)}
              className="absolute top-1 right-1 z-50 p-2 bg-red-400 hover:bg-red-500 cursor-pointer text-white rounded-sm"
            >
              <Trash2 size={20} className="" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full p-4 overflow-hidden bg-black border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative z-20",
        className
      )}
    >
      <div className="relative z-50">
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};
export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4 className={cn("text-zinc-100 font-bold tracking-wide mt-4", className)}>
      {children}
    </h4>
  );
};
export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        "mt-8 text-zinc-400 tracking-wide leading-relaxed text-sm",
        className
      )}
    >
      {children}
    </p>
  );
};
