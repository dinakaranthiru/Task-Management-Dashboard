import { useTasks } from "../context/TaskContext";
import DeadlineProgress from "../components/DeadlineProgress";
import TaskCalendar from "../components/TaskCalendar";

export default function Dashboard() {
  const { tasks } = useTasks();
  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const pending = total - completed;
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header Section */}
      <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
                Task Dashboard
              </h1>
              <p className="text-slate-600 text-sm sm:text-base">
                Track your progress and manage your tasks efficiently
              </p>
            </div>
            <div className="mt-4 sm:mt-0 flex items-center space-x-4">
              <div className="bg-slate-100 px-3 py-1 rounded-full">
                <span className="text-sm font-medium text-slate-700">
                  {completionRate}% Complete
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <StatCard
            title="Total Tasks"
            count={total}
            icon={<TaskIcon />}
            trend="+12% from last month"
            trendPositive={true}
            bgColor="bg-blue-50"
            iconColor="text-blue-600"
            borderColor="border-blue-200"
          />
          <StatCard
            title="Completed"
            count={completed}
            icon={<CompletedIcon />}
            trend="+8% from last month"
            trendPositive={true}
            bgColor="bg-emerald-50"
            iconColor="text-emerald-600"
            borderColor="border-emerald-200"
          />
          <StatCard
            title="Pending"
            count={pending}
            icon={<PendingIcon />}
            trend={pending > 0 ? `${pending} remaining` : "All caught up!"}
            trendPositive={pending === 0}
            bgColor="bg-amber-50"
            iconColor="text-amber-600"
            borderColor="border-amber-200"
          />
        </div>

        {/* Progress Overview */}
        {total > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">
              Progress Overview
            </h3>
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <div className="flex justify-between text-sm text-slate-600 mb-2">
                  <span>Completion Rate</span>
                  <span>{completionRate}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-emerald-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${completionRate}%` }}
                  ></div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-slate-900">
                  {completed}/{total}
                </div>
                <div className="text-sm text-slate-600">Tasks</div>
              </div>
            </div>
          </div>
        )}

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-200">
              <h3 className="text-lg font-semibold text-slate-900">
                Deadline Progress
              </h3>
              <p className="text-sm text-slate-600 mt-1">
                Track upcoming deadlines and priority tasks
              </p>
            </div>
            <div className="p-6">
              <DeadlineProgress />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-200">
              <h3 className="text-lg font-semibold text-slate-900">
                Task Calendar
              </h3>
              <p className="text-sm text-slate-600 mt-1">
                View and manage tasks by date
              </p>
            </div>
            <div className="p-6">
              <TaskCalendar />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, count, icon, trend, trendPositive, bgColor, iconColor, borderColor }) {
  return (
    <div className={`${bgColor} ${borderColor} border rounded-xl p-6 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5`}>
      <div className="flex items-center justify-between mb-4">
        <div className={`${iconColor} p-2 rounded-lg bg-white shadow-sm`}>
          {icon}
        </div>
        <div className="text-right">
          <div className="text-2xl sm:text-3xl font-bold text-slate-900">
            {count}
          </div>
        </div>
      </div>
      
      <div className="space-y-1">
        <h3 className="text-sm font-medium text-slate-700">{title}</h3>
        <p className={`text-xs ${trendPositive ? 'text-emerald-600' : 'text-slate-500'} flex items-center`}>
          {trendPositive && <TrendUpIcon />}
          {trend}
        </p>
      </div>
    </div>
  );
}

// Icon Components
function TaskIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
    </svg>
  );
}

function CompletedIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function PendingIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function TrendUpIcon() {
  return (
    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l9.2-9.2M17 17V7H7" />
    </svg>
  );
}