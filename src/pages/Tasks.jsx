import { useState } from "react";
import { useTasks } from "../context/TaskContext";
import dayjs from "dayjs";

export default function Tasks() {
  const { tasks, addTask, deleteTask, updateTask } = useTasks();
  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState("");
  const [editId, setEditId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !deadline) return;

    if (editId) {
      updateTask({ id: editId, title, completed: false, deadline });
      setEditId(null);
    } else {
      const newTask = {
        id: Date.now(),
        title,
        completed: false,
        deadline,
      };
      addTask(newTask);
    }

    setTitle("");
    setDeadline("");
  };

  const handleEdit = (task) => {
    setEditId(task.id);
    setTitle(task.title);
    setDeadline(task.deadline);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {/* Task Form */}
      <form onSubmit={handleSubmit} className="grid sm:grid-cols-3 gap-4 mb-8">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What do you need to do?"
          className="p-3 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-400"
          required
        />
        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          className="p-3 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-400"
          required
        />
        <button
          type="submit"
          className="bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition font-semibold"
        >
          {editId ? "Update Task" : "Add Task"}
        </button>
      </form>

      {/* Task List */}
      {tasks.length === 0 ? (
        <p className="text-center text-gray-500">No tasks yet. Add your first one above!</p>
      ) : (
        <ul className="space-y-4">
          {tasks.map((task) => {
            const isOverdue = dayjs(task.deadline).isBefore(dayjs(), "day") && !task.completed;
            const isToday = dayjs(task.deadline).isSame(dayjs(), "day");

            return (
              <li
                key={task.id}
                className="flex items-start sm:items-center justify-between gap-4 bg-white border border-gray-200 p-5 rounded-2xl shadow-md hover:shadow-lg transition"
              >
                <div
                  onClick={() => updateTask({ ...task, completed: !task.completed })}
                  className={`flex-1 cursor-pointer group transition-all ${
                    task.completed ? "text-gray-400 line-through" : "text-gray-800"
                  }`}
                >
                  <div className="text-lg font-medium">{task.title}</div>
                  <div className="mt-1 text-sm text-gray-500 flex items-center gap-2">
                    <span
                      className={`inline-block px-3 py-1 text-xs rounded-full font-semibold ${
                        isOverdue
                          ? "bg-red-100 text-red-700"
                          : isToday
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {isOverdue
                        ? "Overdue"
                        : isToday
                        ? "Today"
                        : `Due: ${dayjs(task.deadline).format("MMM D, YYYY")}`}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-2 shrink-0">
                  <button
                    onClick={() => handleEdit(task)}
                    className="text-indigo-600 hover:text-indigo-800 font-semibold"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="text-red-500 hover:text-red-700 font-semibold"
                  >
                    Delete
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
