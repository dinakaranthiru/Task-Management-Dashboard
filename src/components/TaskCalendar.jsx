import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useState } from "react";
import { useTasks } from "../context/TaskContext";
import dayjs from "dayjs";

export default function TaskCalendar() {
  const [value, setValue] = useState(new Date());
  const { tasks } = useTasks();

  const getTaskStatusForDate = (date) => {
    const tasksForDate = tasks.filter(task =>
      task.deadline && dayjs(task.deadline).isSame(dayjs(date), "day")
    );
    if (tasksForDate.length === 0) return null;

    if (tasksForDate.some(task => !task.completed && dayjs(task.deadline).isBefore(dayjs(), "day"))) {
      return "red";
    }
    if (tasksForDate.some(task => !task.completed)) {
      return "yellow";
    }
    if (tasksForDate.every(task => task.completed)) {
      return "green";
    }
    return null;
  };

  const tileContent = ({ date, view }) => {
    if (view === "month") {
      const status = getTaskStatusForDate(date);
      if (!status) return null;

      const colorMap = {
        red: "bg-red-500",
        yellow: "bg-yellow-400",
        green: "bg-green-500",
      };

      return (
        <div className="flex justify-center mt-1">
          <span
            className={`w-3 h-3 rounded-full ${colorMap[status]} shadow-md`}
            title={`${status.charAt(0).toUpperCase() + status.slice(1)} task(s)`}
          />
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6 max-w-sm mx-auto">
      <h2 className="text-xl font-semibold mb-6 text-gray-900 text-center select-none">
        Task Calendar
      </h2>
      <Calendar
        onChange={setValue}
        value={value}
        tileContent={tileContent}
        className="rounded-lg border border-gray-200 shadow-sm"
        prevLabel={<span className="text-indigo-600 font-bold">&lt;</span>}
        nextLabel={<span className="text-indigo-600 font-bold">&gt;</span>}
        navigationLabel={({ date }) => (
          <span className="font-semibold text-indigo-700 select-none">
            {dayjs(date).format("MMMM YYYY")}
          </span>
        )}
      />

      <div className="mt-5 flex justify-center gap-6 text-sm text-gray-600 select-none">
        <Legend color="bg-red-500" label="Overdue" />
        <Legend color="bg-yellow-400" label="Pending" />
        <Legend color="bg-green-500" label="Completed" />
      </div>
    </div>
  );
}

function Legend({ color, label }) {
  return (
    <div className="flex items-center space-x-2">
      <span className={`w-4 h-4 rounded-full ${color} shadow-md`}></span>
      <span className="font-medium">{label}</span>
    </div>
  );
}
