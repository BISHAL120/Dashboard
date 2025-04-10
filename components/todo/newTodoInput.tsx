import React, { useState, useEffect, useRef } from "react";
import { findCategoryByText, findEmojiByText } from "@/utils/emojiUtils";
import { Send, Smile } from "lucide-react";
import { cn } from "@/lib/utils";
import CategoryBadge from "./categoryBadge";

interface NewTodoInputProps {
  onAddTodo: (text: string, category: any, emoji: string) => void;
}

const NewTodoInput: React.FC<NewTodoInputProps> = ({ onAddTodo }) => {
  const [text, setText] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [category, setCategory] = useState<any>(null);
  const [emoji, setEmoji] = useState<string>("✅");
  const inputRef = useRef<HTMLInputElement>(null);

  // Dynamic category and emoji detection
  useEffect(() => {
    if (text.trim()) {
      const detectedCategory = findCategoryByText(text);
      const detectedEmoji = findEmojiByText(text);

      setCategory(detectedCategory);
      setEmoji(detectedEmoji);
    } else {
      setCategory(null);
      setEmoji("✅");
    }
  }, [text]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (text.trim()) {
      onAddTodo(text, category, emoji);
      setText("");
      inputRef.current?.focus();
    }
  };

  return (
    <div className="todo-input-container">
      <form onSubmit={handleSubmit} className="relative">
        <input
          ref={inputRef}
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a new task..."
          className={cn(
            "todo-input",
            isFocused && "ring-2 ring-primary/20 border-primary"
          )}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />

        {/* Suggestions appear when typing */}
        {text.trim() && category && (
          <div className="absolute -top-8 left-2 animate-slide-down">
            <CategoryBadge
              name={category.name}
              color={category.color}
              emoji={category.emoji}
            />
            <span className="ml-2 text-sm text-gray-500">{emoji}</span>
          </div>
        )}

        <button
          type="submit"
          className={cn(
            "absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full transition-all",
            text.trim()
              ? "bg-primary/10 text-primary hover:bg-primary/20"
              : "text-gray-400"
          )}
          disabled={!text.trim()}
        >
          <Send size={18} className={text.trim() ? "animate-slide-up" : ""} />
        </button>
      </form>
    </div>
  );
};

export default NewTodoInput;
