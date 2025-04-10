import React, { useState, useEffect } from "react";
import { Todo } from "./todoItem";
import TodoItem from "./todoItem";
import {
  findCategoryByText,
  findEmojiByText,
  categories,
} from "@/utils/emojiUtils";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

interface TodoListProps {
  className?: string;
}

const TodoList: React.FC<TodoListProps> = ({ className }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  // Load todos from localStorage
  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      try {
        const parsedTodos = JSON.parse(savedTodos);
        // Convert string dates back to Date objects
        const todosWithDates = parsedTodos.map((todo: any) => ({
          ...todo,
          createdAt: new Date(todo.createdAt),
        }));
        setTodos(todosWithDates);
      } catch (e) {
        console.error("Failed to parse todos:", e);
      }
    }
  }, []);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text: string, category: any, emoji: string) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      text,
      completed: false,
      category: category || {
        name: "Work",
        color: "#3B82F6",
        emoji: "💼",
      },
      emoji: emoji || "✅",
      createdAt: new Date(),
    };

    setTodos((prev) => [newTodo, ...prev]);
    alert("Task added");
    // TODO: Fix the toast functionality

    /* toast.success({
      title: "Task added",
      description: `"${text}" added to ${newTodo.category.name}`,
    }); */
  };

  const completeTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );

    const todo = todos.find((t) => t.id === id);
    if (todo) {
      alert(`Task ${todo.completed ? "unmarked" : "marked as done"}`);

      // TODO: Fix the toast functionality
      /*  toast({
        title: todo.completed ? "Task unmarked" : "Task completed",
        description: `"${todo.text}" ${
          todo.completed ? "unmarked" : "marked as done"
        }`,
      }); */
    }
  };

  const deleteTodo = (id: string) => {
    const todo = todos.find((t) => t.id === id);
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
    alert("Task deleted");

    // TODO: Fix the toast functionality
    /* if (todo) {
      toast({
        title: "Task deleted",
        description: `"${todo.text}" removed`,
      });
    } */
  };

  const filteredTodos = activeFilter
    ? todos.filter((todo) => todo.category.name === activeFilter)
    : todos;

  const exampleTodos: Todo[] = [
    {
      id: "1",
      text: "Finish project report",
      completed: false,
      category: { name: "Work", color: "#3B82F6", emoji: "💼" },
      emoji: "📄",
      createdAt: new Date(),
    },
    {
      id: "2",
      text: "Grocery shopping",
      completed: false,
      category: { name: "Personal", color: "#F59E0B", emoji: "🛒" },
      emoji: "🍎",
      createdAt: new Date(),
    },
    {
      id: "3",
      text: "Gym workout",
      completed: true,
      category: { name: "Health", color: "#10B981", emoji: "💪" },
      emoji: "🏋️",
      createdAt: new Date(),
    },
    {
      id: "4",
      text: "Read a book",
      completed: false,
      category: { name: "Leisure", color: "#F472B6", emoji: "📚" },
      emoji: "📖",
      createdAt: new Date(),
    },
    {
      id: "5",
      text: "Prepare dinner",
      completed: true,
      category: { name: "Home", color: "#EF4444", emoji: "🏠" },
      emoji: "🍽️",
      createdAt: new Date(),
    },
  ];

  return (
    <div className={className}>
      {/* Filter pills */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2 flex-wrap justify-center">
        <button
          className={cn(
            "category-badge transition-all",
            !activeFilter
              ? "bg-primary text-white"
              : "bg-gray-100 text-gray-600"
          )}
          onClick={() => setActiveFilter(null)}
        >
          All
        </button>

        {categories.map((cat) => (
          <button
            key={cat.name}
            className={cn(
              "category-badge transition-all",
              activeFilter === cat.name
                ? `bg-[${cat.color}] text-white`
                : `bg-[${cat.color}15] text-[${cat.color}]`
            )}
            style={{
              backgroundColor:
                activeFilter === cat.name ? cat.color : `${cat.color}15`,
              color: activeFilter === cat.name ? "white" : cat.color,
              borderColor: `${cat.color}30`,
            }}
            onClick={() =>
              setActiveFilter(cat.name === activeFilter ? null : cat.name)
            }
          >
            <span className="mr-1">{cat.emoji}</span>
            {cat.name}
          </button>
        ))}
      </div>

      {/* Todo items */}
      <div className="space-y-3 max-w-xl mx-auto">
        {/* TODO: Add Real Data instead of fake data */}
        {exampleTodos.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No tasks yet. Add your first task!</p>
          </div>
        ) : (
          // TODO: Add Real Data instead of fake data
          exampleTodos.map((todo, index) => (
            <div
              key={todo.id}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <TodoItem
                todo={todo}
                onComplete={completeTodo}
                onDelete={deleteTodo}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TodoList;
