import { Link } from "react-router-dom";

export default function Navbar({ onLogout }) {
  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">T</span>
            </div>
            <span className="font-bold text-xl text-gray-900">Task Dashboard</span>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-8">
            <Link 
              to="/dashboard" 
              className="text-gray-700 hover:text-indigo-600 font-medium transition-colors"
            >
              Dashboard
            </Link>
            <Link 
              to="/tasks" 
              className="text-gray-700 hover:text-indigo-600 font-medium transition-colors"
            >
              Tasks
            </Link>
            <Link 
              to="/settings" 
              className="text-gray-700 hover:text-indigo-600 font-medium transition-colors"
            >
              Settings
            </Link>
            
            {/* Logout Button */}
            <button
              onClick={onLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  )}