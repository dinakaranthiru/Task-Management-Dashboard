// Importing required functions from React
import { createContext, useContext, useState } from "react";

// 1. Create a new context for tasks
const TaskContext = createContext();

// 2. Create a Context Provider component
export const TaskProvider = ({ children }) => {
  // Local state to hold the list of tasks
  const [tasks, setTasks] = useState([]);

  // Function to add a new task to the list
  const addTask = (task) => setTasks([...tasks, task]);

  // Function to update an existing task based on its ID
  const updateTask = (updatedTask) =>
    setTasks(
      tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );

  // Function to delete a task by its ID
  const deleteTask = (id) => setTasks(tasks.filter((task) => task.id !== id));

  // Provide the state and task functions to all children components
  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask }}>
      {children} {/* Render any nested components inside the provider */}
    </TaskContext.Provider>
  );
};

// 3. Custom hook to use task context easily in other components
export const useTasks = () => useContext(TaskContext);
