import { useState } from "react";
import { FaPlus } from "react-icons/fa";

export default function TaskInput({ onAddTask }) {
  const [newTask, setNewTask] = useState("");

  const handleAdd = () => {
    onAddTask(newTask);
    setNewTask("");
  };

  return (
    <div className="flex mb-6">
      <input
        type="text"
        className="flex-1 p-3 border-2 border-gray-600 bg-gray-900 text-white rounded-l-xl focus:outline-none focus:border-cyan-400 transition-colors duration-200"
        placeholder="Add a new task..."
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
      />
      <button
        className="bg-gradient-to-r from-cyan-500 to-blue-700 text-white p-3 rounded-r-xl hover:from-teal-500 hover:to-indigo-700 transition-all duration-200 transform hover:scale-105"
        onClick={handleAdd}
      >
        <FaPlus className="text-xl" />
      </button>
    </div>
  );    
}
