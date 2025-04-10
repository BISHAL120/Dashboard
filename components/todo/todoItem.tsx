import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import CategoryBadge from "./categoryBadge";

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  category: {
    name: string;
    color: string;
    emoji: string;
  };
  emoji: string;
  createdAt: Date;
}

interface TodoItemProps {
  todo: Todo;
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onComplete, onDelete }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleComplete = () => {
    setIsAnimating(true);
    setTimeout(() => {
      onComplete(todo.id);
      setIsAnimating(false);
    }, 300);
  };

  return (
    <div
      className={cn(
        "todo-item group",
        todo.completed && "todo-item-completed",
        isAnimating && "opacity-50 scale-95 transition-all"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={cn(
          "todo-checkbox",
          todo.completed
            ? "bg-green-500 border-green-500"
            : `border-${todo.category.color}/50 hover:border-${todo.category.color}`
        )}
        onClick={handleComplete}
      >
        {todo.completed && (
          <Check size={14} className="text-white animate-check-mark" />
        )}
      </div>

      <div className="flex-1 flex flex-col">
        <div className="flex items-center gap-2">
          <p
            className={cn(
              "font-medium transition-all",
              todo.completed && "line-through opacity-60"
            )}
          >
            <span className="mr-2">{todo.emoji}</span>
            {todo.text}
          </p>
        </div>

        <div className="flex gap-2 mt-2">
          <CategoryBadge
            name={todo.category.name}
            color={todo.category.color}
            emoji={todo.category.emoji}
          />
          <span className="text-xs text-gray-400">
            {todo.createdAt.toLocaleDateString()}
          </span>
        </div>
      </div>

      <button
        className={cn(
          "p-1.5 rounded-full transition-all",
          isHovered ? "opacity-100 bg-red-50 text-red-500" : "opacity-0"
        )}
        onClick={() => onDelete(todo.id)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 6h18"></path>
          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
        </svg>
      </button>
    </div>
  );
};

export default TodoItem;
