import { useTasks } from "../context/TaskContext";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export default function DeadlineProgress() {
  const { tasks } = useTasks();
  const today = dayjs();

  const tasksWithDeadline = tasks.filter((task) => task.deadline);
  const overdueTasks = tasksWithDeadline.filter((task) =>
    dayjs(task.deadline).isBefore(today, "day")
  );
  const dueSoonTasks = tasksWithDeadline.filter((task) => {
    const deadline = dayjs(task.deadline);
    return (
      deadline.isAfter(today, "day") &&
      deadline.diff(today, "day") <= 7 // Due in next 7 days
    );
  });
  const safeTasks = tasksWithDeadline.filter(
    (task) =>
      !overdueTasks.includes(task) && !dueSoonTasks.includes(task)
  );

  const total = tasksWithDeadline.length;
  const completedDueSoon = dueSoonTasks.filter((t) => t.completed).length;
  const percentageDueSoon = total > 0 ? Math.round((dueSoonTasks.length / total) * 100) : 0;

  // Find the closest deadline for countdown display
  const nearestDeadlineTask = tasksWithDeadline.reduce((nearest, task) => {
    if (!nearest) return task;
    return dayjs(task.deadline).isBefore(dayjs(nearest.deadline)) ? task : nearest;
  }, null);

  const daysLeft = nearestDeadlineTask
    ? dayjs(nearestDeadlineTask.deadline).diff(today, "day")
    : null;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition duration-500 max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-gray-900 flex items-center gap-2">
        <span>⏳</span> Deadline Progress
      </h2>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden shadow-inner">
        <div
          className="h-6 rounded-full bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 transition-all duration-700 ease-in-out shadow-[0_0_10px_#7c3aed]"
          style={{ width: `${percentageDueSoon}%` }}
        />
      </div>

      <p className="mt-3 text-gray-700 text-sm font-medium">
        {dueSoonTasks.length} of {total} tasks are due within the next 7 days
      </p>

      {/* Summary badges */}
      <div className="flex justify-between mt-6 text-sm font-semibold">
        <Badge text={`${overdueTasks.length} Overdue`} color="bg-red-500" />
        <Badge text={`${dueSoonTasks.length} Due Soon`} color="bg-yellow-400 text-yellow-900" />
        <Badge text={`${safeTasks.length} Safe`} color="bg-green-500" />
      </div>

      {/* Countdown nearest deadline */}
      {nearestDeadlineTask && (
        <div className="mt-6 p-4 bg-indigo-50 rounded-lg text-indigo-700 font-medium shadow-inner">
          <p>
            Nearest deadline: <span className="font-bold">{nearestDeadlineTask.title}</span>
          </p>
          <p>
            Due in:{" "}
            <span className={`font-bold ${daysLeft <= 3 ? "text-red-600" : "text-indigo-700"}`}>
              {daysLeft} {daysLeft === 1 ? "day" : "days"}
            </span>
          </p>
          <p className="text-xs text-indigo-500 mt-1 italic">
            (Due on {dayjs(nearestDeadlineTask.deadline).format("MMM D, YYYY")})
          </p>
        </div>
      )}
    </div>
  );
}

function Badge({ text, color }) {
  return (
    <span
      className={`px-3 py-1 rounded-full text-white shadow-md ${color} select-none`}
    >
      {text}
    </span>
  );
}
