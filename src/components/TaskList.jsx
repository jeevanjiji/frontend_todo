import { FaTrash, FaEdit } from "react-icons/fa";
import { useState } from "react";

export default function TaskList({ tasks, deleteTask, editTask }) {
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  const handleEdit = (task) => {
    setEditingId(task._id);
    setEditText(task.text);
  };

  const handleSave = async (id) => {
    await editTask(id, editText);
    setEditingId(null);
  };

  return (
    <div className="mt-6">
      {tasks.length === 0 ? (
        <p className="text-gray-500 text-center">No tasks added yet!</p>
      ) : (
        <ul className="space-y-3">
          {tasks.map((task) => (
            <li
              key={task._id}
              className="flex justify-between items-center bg-white p-3 rounded-lg shadow-md border-l-4 border-purple-500"
            >
              {editingId === task._id ? (
                <div className="flex-1 flex gap-2">
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="flex-1 px-2 py-1 border rounded"
                    autoFocus
                  />
                  <button
                    onClick={() => handleSave(task._id)}
                    className="text-green-500 hover:text-green-700 transition-colors"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <>
                  <span className="text-gray-700">{task.text}</span>
                  <div className="flex gap-2">
                    <button
                      className="text-blue-500 hover:text-blue-700 transition-colors"
                      onClick={() => handleEdit(task)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700 transition-colors"
                      onClick={() => deleteTask(task._id)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
