import React from "react";
import { cn } from "@/lib/utils";

interface CategoryBadgeProps {
  name: string;
  color: string;
  emoji?: string;
  className?: string;
}

const CategoryBadge: React.FC<CategoryBadgeProps> = ({
  name,
  color,
  emoji,
  className,
}) => {
  return (
    <span
      className={cn("category-badge animate-scale-in", className)}
      style={{
        backgroundColor: `${color}15`, // Very light background
        color: color,
        border: `1px solid ${color}30`,
      }}
    >
      {emoji && <span className="mr-1">{emoji}</span>}
      {name}
    </span>
  );
};

export default CategoryBadge;
