import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";

export default function Settings() {
  const [user, setUser] = useState({ name: "", email: "" });
  const [theme, setTheme] = useState("light");
  const [notifications, setNotifications] = useState({
    updates: true,
    alerts: false,
  });

  useEffect(() => {
    // Try to get user from localStorage safely
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Invalid user data in localStorage:", error);
      localStorage.removeItem("user"); // Clear corrupted data
    }

    // Load theme from localStorage or default to light
    const storedTheme = localStorage.getItem("theme") || "light";
    setTheme(storedTheme);
    document.documentElement.classList.toggle("dark", storedTheme === "dark");
  }, []);

  // Toggle between light and dark mode
  const handleThemeToggle = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  // Toggle notification preferences
  const toggleNotification = (key) => {
    const updated = { ...notifications, [key]: !notifications[key] };
    setNotifications(updated);
    // Optionally persist notifications to localStorage here if needed
  };

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-8">
      <h2 className="text-3xl font-bold text-indigo-700 dark:text-indigo-500">
        Settings
      </h2>

      {/* Profile Section */}
      <div className="flex items-center space-x-4">
        <FaUserCircle className="text-6xl text-indigo-500 dark:text-indigo-500" />
        <div>
          <h3 className="text-xl font-semibold text-indigo-700 dark:text-indigo-500">
            {user.name || "Guest"}
          </h3>
          <p className="text-sm text-indigo-600 dark:text-indigo-500">
            {user.email || "guest@example.com"}
          </p>
        </div>
      </div>


      {/* Notifications Section */}
      <section>
        <h3 className="text-lg font-semibold  dark:text-indigo-500 mb-2">
          Notifications
        </h3>
        <div className="flex items-center justify-between">
          <span className="">Weekly Updates</span>
         
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="">Security Alerts</span>
          
        </div>
      </section>

      {/* Security Section */}
      <section>
        <h3 className="text-lg font-semibold text-indigo-700 dark:text-indigo-500 mb-2">
          Security
        </h3>
        <button className="">
          Change Password
        </button>
      </section>

      {/* Support Section */}
      <section>
        <h3 className="text-lg font-semibold text-indigo-700 dark:text-indigo-500 mb-2">
          Support
        </h3>
        <button className="">
          Contact Support
        </button>
      </section>
    </div>
  );
}
