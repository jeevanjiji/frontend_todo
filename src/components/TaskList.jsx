import { FaTrash } from "react-icons/fa";

export default function TaskList({ tasks, deleteTask }) {
  return (
    <div className="mt-6">
      {tasks.length === 0 ? (
        <p className="text-gray-500 text-center">No tasks added yet!</p>
      ) : (
        <ul className="space-y-3">
          {tasks.map((task, index) => (
            <li
              key={index}
              className="flex justify-between items-center bg-white p-3 rounded-lg shadow-md border-l-4 border-purple-500"
            >
              <span className="text-gray-700">{task}</span>
              <button
                className="text-red-500 hover:text-red-700 transition-colors"
                onClick={() => deleteTask(index)}
              >
                <FaTrash />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
