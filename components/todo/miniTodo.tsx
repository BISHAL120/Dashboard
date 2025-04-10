"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, ListTodo, Check } from "lucide-react";

import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
import Link from "next/link";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Card, CardContent, CardHeader } from "../ui/card";

// Todo item type
type Todo = {
  id: string;
  text: string;
  completed: boolean;
};

const MiniTodo = () => {
  const [todos, setTodos] = useState<Todo[]>([
    { id: "1", text: "Complete dashboard design", completed: false },
    { id: "2", text: "Review project proposal", completed: true },
    { id: "3", text: "Schedule team meeting", completed: false },
    { id: "4", text: "Update documentation", completed: false },
    { id: "5", text: "Complete dashboard design", completed: false },
    { id: "6", text: "Review project proposal", completed: true },
    { id: "7", text: "Schedule team meeting", completed: false },
    { id: "8", text: "Update documentation", completed: false },
    { id: "9", text: "Update documentation", completed: false },
    { id: "10", text: "Update documentation", completed: false },
  ]);
  const [newTodoText, setNewTodoText] = useState("");

  // Add new todo
  const addTodo = () => {
    if (!newTodoText.trim()) {
      toast.error("Task cannot be empty", {
        duration: 5000,
        style: {
          background: "red",
          color: "#fff",
        },
        icon: <ExclamationTriangleIcon className="w-6 h-6" />,
      });
      return;
    }

    const newTodo: Todo = {
      id: Date.now().toString(),
      text: newTodoText,
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setNewTodoText("");

    toast.success("Task added", {
      duration: 5000,
      style: {
        background: "#3B82F6",
        color: "#fff",
      },
    });
  };

  // Toggle todo completion status
  const toggleTodoStatus = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTodo();
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodoText(e.target.value);
  };

  return (
    <Card className="w-full xl:max-w-[600px] max-h-[425px] flex flex-col overflow-hidden border border-slate-300 flex-1">
      {/* Header */}
      <CardHeader className="p-6 border-b border-gray-100 ">
        <div className="flex justify-between items-center ">
          <h2 className="text-2xl font-semibold text-gray-800">Quick Tasks</h2>
          <Link href="/todo">
            <Button
              variant="outline"
              className="text-sm gap-2 hover:bg-gray-50"
              size="sm"
            >
              <ListTodo size={16} />
              All Tasks
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent className="overflow-auto">
        {/* Task list */}
        <div className="flex-grow overflow-y-auto p-4 space-y-2">
          {todos.map((todo) => (
            <div
              key={todo.id}
              className={cn(
                "p-3 rounded-xl flex items-center group transition-all hover:bg-gray-50 border border-transparent hover:border-gray-100",
                todo.completed ? "opacity-60" : ""
              )}
            >
              <button
                onClick={() => toggleTodoStatus(todo.id)}
                className={cn(
                  "w-5 h-5 rounded-full border flex items-center justify-center mr-3 flex-shrink-0",
                  todo.completed
                    ? "bg-blue-500 border-blue-500 text-white"
                    : "border-gray-300"
                )}
              >
                {todo.completed && <Check size={12} strokeWidth={3} />}
              </button>
              <p
                className={cn(
                  "text-sm text-gray-700 flex-grow",
                  todo.completed ? "line-through" : ""
                )}
              >
                {todo.text}
              </p>
            </div>
          ))}
          {todos.length === 0 && (
            <div className="flex flex-col items-center justify-center h-60 text-center p-6">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                <ListTodo className="text-blue-500" size={24} />
              </div>
              <p className="text-gray-500 mb-1">No tasks yet</p>
              <p className="text-gray-400 text-sm">Add a task to get started</p>
            </div>
          )}
        </div>

        {/* Add new task */}
        <form onSubmit={handleSubmit} className="p-5 border-t border-gray-100">
          <div className="flex gap-3">
            <Input
              placeholder="Add a new task..."
              value={newTodoText}
              onChange={handleInputChange}
              className="flex-grow"
            />
            <Button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white gap-1"
            >
              <Plus size={16} />
              Add
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default MiniTodo;
