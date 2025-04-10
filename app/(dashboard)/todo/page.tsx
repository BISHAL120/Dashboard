"use client";
import NewTodoInput from "../../../components/todo/newTodoInput";
import TodoList from "../../../components/todo/todoList";

const Todo = () => {
  const handleAddTodo = (text: string, category: any, emoji: string) => {
    // TodoList component handles the actual adding
    // This is a placeholder for future functionalities like API calls
    console.log("Added todo:", { text, category, emoji });
  };

  return (
    <div className="min-h-screen flex flex-col items-center py-12 px-4 bg-gradient-to-b from-blue-50 to-white">
      <div className="w-full max-w-2xl mx-auto flex flex-col items-center">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-gray-900 mb-1">
            Elegant Todo
          </h1>
          <p className="text-gray-500">Organize your tasks with style</p>
        </div>

        {/* Todo Input */}
        <NewTodoInput onAddTodo={handleAddTodo} />

        {/* Todo Items */}
        <div className="w-full mt-12 animate-fade-in">
          <TodoList className="w-full" />
        </div>
      </div>
    </div>
  );
};

export default Todo;
