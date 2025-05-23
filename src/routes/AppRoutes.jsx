import { Navigate, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";

import Dashboard from "../pages/Dashboard";
import Tasks from "../pages/Tasks";
import Settings from "../pages/Settings";
import Login from "../pages/Login";
import Navbar from "../components/Navbar";

export default function AppRoutes() {
  const [user, setUser] = useState(localStorage.getItem("user"));

  // Sync localStorage on reload
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(storedUser);
  }, []);

  const handleLogin = (username) => {
    setUser(username);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <>
      <Navbar onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </>
  );
}
