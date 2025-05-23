import { useState } from "react";
import { useTasks } from "../context/TaskContext";
import dayjs from "dayjs";

export default function Tasks() {
  const { tasks, addTask, deleteTask, updateTask } = useTasks();
  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState("");
  const [editId, setEditId] = useState(null);
  const [filter, setFilter] = useState("all"); // all, pending, completed, overdue

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

  const handleCancel = () => {
    setEditId(null);
    setTitle("");
    setDeadline("");
  };

  const getFilteredTasks = () => {
    const now = dayjs();
    return tasks.filter(task => {
      switch (filter) {
        case "pending":
          return !task.completed;
        case "completed":
          return task.completed;
        case "overdue":
          return dayjs(task.deadline).isBefore(now, "day") && !task.completed;
        default:
          return true;
      }
    });
  };

  const filteredTasks = getFilteredTasks();
  const pendingCount = tasks.filter(t => !t.completed).length;
  const completedCount = tasks.filter(t => t.completed).length;
  const overdueCount = tasks.filter(t => dayjs(t.deadline).isBefore(dayjs(), "day") && !t.completed).length;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header Section */}
      <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
                My Tasks
              </h1>
              <p className="text-slate-600 text-sm sm:text-base">
                Organize and track your daily tasks efficiently
              </p>
            </div>
            <div className="mt-4 sm:mt-0 flex items-center space-x-2">
              <span className="text-sm text-slate-600">
                {pendingCount} pending, {completedCount} completed
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Task Form */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">
            {editId ? "Edit Task" : "Add New Task"}
          </h2>
          <div className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Task Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="What do you need to do?"
                  className="w-full p-3 rounded-lg border border-slate-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && title.trim() && deadline) {
                      handleSubmit(e);
                    }
                  }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Deadline
                </label>
                <input
                  type="date"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  min={dayjs().format("YYYY-MM-DD")}
                  className="w-full p-3 rounded-lg border border-slate-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={handleSubmit}
                disabled={!title.trim() || !deadline}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors font-medium flex items-center space-x-2"
              >
                <PlusIcon />
                <span>{editId ? "Update Task" : "Add Task"}</span>
              </button>
              {editId && (
                <button
                  onClick={handleCancel}
                  className="bg-slate-200 text-slate-700 px-6 py-3 rounded-lg hover:bg-slate-300 transition-colors font-medium"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 mb-6">
          <div className="border-b border-slate-200">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              {[
                { key: "all", label: "All Tasks", count: tasks.length },
                { key: "pending", label: "Pending", count: pendingCount },
                { key: "completed", label: "Completed", count: completedCount },
                { key: "overdue", label: "Overdue", count: overdueCount },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setFilter(tab.key)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    filter === tab.key
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
                  }`}
                >
                  {tab.label}
                  <span className="ml-2 bg-slate-100 text-slate-600 py-0.5 px-2 rounded-full text-xs">
                    {tab.count}
                  </span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Task List */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200">
          {filteredTasks.length === 0 ? (
            <div className="p-12 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-slate-100 rounded-full flex items-center justify-center">
                <TaskEmptyIcon />
              </div>
              <h3 className="text-lg font-medium text-slate-900 mb-2">
                {filter === "all" ? "No tasks yet" : `No ${filter} tasks`}
              </h3>
              <p className="text-slate-600">
                {filter === "all" 
                  ? "Add your first task above to get started!" 
                  : `You don't have any ${filter} tasks right now.`}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-slate-200">
              {filteredTasks.map((task) => {
                const isOverdue = dayjs(task.deadline).isBefore(dayjs(), "day") && !task.completed;
                const isToday = dayjs(task.deadline).isSame(dayjs(), "day");
                const isDueSoon = dayjs(task.deadline).diff(dayjs(), "day") <= 3 && !task.completed;

                return (
                  <div
                    key={task.id}
                    className="p-6 hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-start sm:items-center justify-between gap-4">
                      <div className="flex items-start space-x-4 flex-1">
                        <button
                          onClick={() => updateTask({ ...task, completed: !task.completed })}
                          className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                            task.completed
                              ? "bg-emerald-500 border-emerald-500 text-white"
                              : "border-slate-300 hover:border-blue-500"
                          }`}
                        >
                          {task.completed && <CheckIcon />}
                        </button>
                        
                        <div className="flex-1 min-w-0">
                          <div
                            className={`text-base font-medium transition-all ${
                              task.completed 
                                ? "text-slate-400 line-through" 
                                : "text-slate-900"
                            }`}
                          >
                            {task.title}
                          </div>
                          <div className="mt-2 flex items-center space-x-3">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                isOverdue
                                  ? "bg-red-100 text-red-800"
                                  : isToday
                                  ? "bg-orange-100 text-orange-800"
                                  : isDueSoon
                                  ? "bg-yellow-100 text-yellow-800"
                                  : task.completed
                                  ? "bg-emerald-100 text-emerald-800"
                                  : "bg-slate-100 text-slate-800"
                              }`}
                            >
                              <CalendarIcon />
                              {isOverdue
                                ? "Overdue"
                                : isToday
                                ? "Due Today"
                                : isDueSoon
                                ? `Due in ${dayjs(task.deadline).diff(dayjs(), "day")} days`
                                : dayjs(task.deadline).format("MMM D, YYYY")}
                            </span>
                            {task.completed && (
                              <span className="text-xs text-emerald-600 font-medium">
                                ✓ Completed
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleEdit(task)}
                          className="p-2 text-slate-400 hover:text-blue-600 transition-colors"
                          title="Edit task"
                        >
                          <EditIcon />
                        </button>
                        <button
                          onClick={() => deleteTask(task.id)}
                          className="p-2 text-slate-400 hover:text-red-600 transition-colors"
                          title="Delete task"
                        >
                          <DeleteIcon />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Icon Components
function PlusIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  );
}

function EditIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
  );
}

function DeleteIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
  );
}

function TaskEmptyIcon() {
  return (
    <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
    </svg>
  );
}