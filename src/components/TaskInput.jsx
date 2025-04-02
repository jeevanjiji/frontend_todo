import { useState } from "react";
import { FaPlus } from "react-icons/fa";

export default function TaskInput({ addTask }) {
  const [newTask, setNewTask] = useState("");

  const handleAdd = () => {
    addTask(newTask);
    setNewTask("");
  };

  return (
    <div className="flex mb-6">
      <input
        type="text"
        className="flex-1 p-3 border-2 border-purple-200 rounded-l-xl focus:outline-none focus:border-purple-500 transition-colors duration-200"
        placeholder="Add a new task..."
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
      />
      <button
        className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3 rounded-r-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-200 transform hover:scale-105"
        onClick={handleAdd}
      >
        <FaPlus className="text-xl" />
      </button>
    </div>
  );
}
