import { useState } from "react";
import { FaTrash, FaEdit, FaCheckCircle, FaRegCircle } from "react-icons/fa";

export default function TaskList({ tasks, toggleTask, editTask, deleteTask }) {
  const [editingIndex, setEditingIndex] = useState(null);
  const [editText, setEditText] = useState("");

  const startEditing = (index, text) => {
    setEditingIndex(index);
    setEditText(text);
  };

  const saveEdit = (id) => {
    editTask(id, editText);
    setEditingIndex(null);
  };

  return (
    <ul className="space-y-3">
      {tasks.map((task) => (
        <li
          key={task._id}
          className={`flex justify-between items-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 ${
            task.completed ? "bg-gray-50" : "bg-white"
          }`}
        >
          <button
            className="text-green-500 hover:text-green-700 transition-colors duration-200"
            onClick={() => toggleTask(task._id, task.completed)}
          >
            {task.completed ? <FaCheckCircle className="text-xl" /> : <FaRegCircle className="text-xl" />}
          </button>
          {editingIndex === task._id ? (
            <input
              type="text"
              className="flex-1 p-2 mx-3 border-2 border-purple-200 rounded-lg focus:outline-none focus:border-purple-500 transition-colors duration-200"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && saveEdit(task._id)}
            />
          ) : (
            <span
              onClick={() => toggleTask(task._id, task.completed)}
              className={`cursor-pointer flex-1 mx-3 ${
                task.completed ? "text-gray-400 line-through" : "text-gray-700"
              }`}
            >
              {task.text}
            </span>
          )}
          <div className="flex gap-3">
            {editingIndex === task._id ? (
              <button
                className="text-green-500 hover:text-green-700 transition-colors duration-200"
                onClick={() => saveEdit(task._id)}
              >
                <FaCheckCircle className="text-xl" />
              </button>
            ) : (
              <button
                className="text-purple-500 hover:text-purple-700 transition-colors duration-200"
                onClick={() => startEditing(task._id, task.text)}
              >
                <FaEdit className="text-xl" />
              </button>
            )}
            <button
              className="text-red-500 hover:text-red-700 transition-colors duration-200"
              onClick={() => deleteTask(task._id)}
            >
              <FaTrash className="text-xl" />
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
