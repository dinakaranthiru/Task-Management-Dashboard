import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");   // Added password state
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username.trim() && password.trim()) {   // Check both username and password
      // Store user info (you may want to hash password in real apps, but here just storing username)
      localStorage.setItem("user", username);   
      onLogin(username);
      navigate("/dashboard");
    } else {
      alert("Please enter both username and password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />
        <input
          type="password"                             // Password input field
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />
        <button
          onClick={handleLogin}
          className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600 transition"
        >
          Login
        </button>
      </div>
    </div>
  );
}
