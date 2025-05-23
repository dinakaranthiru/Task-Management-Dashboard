import { useTasks } from "../context/TaskContext";
import DeadlineProgress from "../components/DeadlineProgress";
import TaskCalendar from "../components/TaskCalendar";

export default function Dashboard() {
  const { tasks } = useTasks();
  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const pending = total - completed;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 py-6 px-4 sm:px-6">
      <h1 className="text-3xl sm:text-4xl font-extrabold mb-10 text-center text-indigo-900 tracking-wide select-none">
         Task Dashboard
      </h1>

      {/* Task Stats */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
        <StatCard
          title="Total Tasks"
          count={total}
          icon="📝"
          fromColor="from-indigo-500"
          toColor="to-indigo-700"
        />
        <StatCard
          title="Completed"
          count={completed}
          icon="✅"
          fromColor="from-green-500"
          toColor="to-green-700"
        />
        <StatCard
          title="Pending"
          count={pending}
          icon="⏳"
          fromColor="from-yellow-400"
          toColor="to-yellow-600"
        />
      </div>

      {/* Deadline and Calendar */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        <DeadlineProgress />
        <TaskCalendar />
      </div>
    </div>
  );
}

function StatCard({ title, count, icon, fromColor, toColor }) {
  return (
    <div
      className={`bg-gradient-to-br ${fromColor} ${toColor} text-white p-5 rounded-2xl shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-transform duration-300 flex flex-col justify-between`}
      style={{ minHeight: "120px" }}
    >
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base sm:text-lg font-semibold tracking-wide">{title}</h2>
        <div className="text-2xl sm:text-3xl">{icon}</div>
      </div>
      <p className="text-4xl sm:text-5xl font-extrabold drop-shadow">{count}</p>
    </div>
  );
}
