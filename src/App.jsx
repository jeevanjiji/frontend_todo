import { useState, useEffect } from "react";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";

export default function App() {
  const [tasks, setTasks] = useState([]);

  // ✅ Fetch tasks from backend on page load
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/tasks`);
        if (!res.ok) throw new Error("Failed to fetch tasks");
        const data = await res.json();
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, []);

  // ✅ Add task
  const addTask = async (text) => {
    if (!text.trim()) return; // Prevent empty tasks

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      if (!res.ok) throw new Error("Failed to add task");

      const newTask = await res.json();
      setTasks([...tasks, newTask]); // Append the new task
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // ✅ Toggle task completion
  const toggleTask = async (id, completed) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/tasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !completed }), // Toggle completed
      });

      if (!res.ok) throw new Error("Failed to update task");

      const updatedTask = await res.json();
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task._id === id ? updatedTask : task))
      );
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // ✅ Edit task
  const editTask = async (id, text) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/tasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      if (!res.ok) throw new Error("Failed to edit task");

      const updatedTask = await res.json();
      setTasks(tasks.map((task) => (task._id === id ? updatedTask : task)));
    } catch (error) {
      console.error("Error editing task:", error);
    }
  };

  // ✅ Delete task
  const deleteTask = async (id) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/tasks/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete task");

      setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-gray-900 to-black p-6">
      <div className="bg-gray-800 shadow-xl rounded-2xl p-8 w-full max-w-lg backdrop-blur-lg bg-opacity-90">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-green-400 mb-6 text-center">
          Task Manager
        </h1>
        <TaskInput onAddTask={addTask} />
        <TaskList tasks={tasks} deleteTask={deleteTask} editTask={editTask} />
      </div>
    </div>
  );
  
}
