import { useState } from "react";

export default function Settings() {
  const [user, setUser] = useState({ name: "dina", email: "dina@example.com" });
  const [theme, setTheme] = useState("light");
  const [notifications, setNotifications] = useState({
    weeklyUpdates: true,
    securityAlerts: true,
    taskReminders: false,
    emailDigest: true,
  });
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [tempUser, setTempUser] = useState({ ...user });

  // Toggle between light and dark mode
  const handleThemeToggle = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    
    // Apply theme to document
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
      document.body.style.backgroundColor = "#0f172a";
      document.body.style.color = "#f8fafc";
    } else {
      document.documentElement.classList.remove("dark");
      document.body.style.backgroundColor = "#ffffff";
      document.body.style.color = "#1e293b";
    }
  };

  // Toggle notification preferences
  const toggleNotification = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSaveProfile = () => {
    setUser({ ...tempUser });
    setIsEditingProfile(false);
  };

  const handleCancelEdit = () => {
    setTempUser({ ...user });
    setIsEditingProfile(false);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === "dark" ? "bg-slate-900" : "bg-slate-50"
    }`}>
      {/* Header Section */}
      <div className={`border-b shadow-sm ${
        theme === "dark" 
          ? "bg-slate-800 border-slate-700" 
          : "bg-white border-slate-200"
      }`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className={`text-2xl sm:text-3xl font-bold mb-2 ${
                theme === "dark" ? "text-white" : "text-slate-900"
              }`}>
                Settings
              </h1>
              <p className={`text-sm sm:text-base ${
                theme === "dark" ? "text-slate-300" : "text-slate-600"
              }`}>
                Manage your account preferences and application settings
              </p>
            </div>
            <div className="mt-4 sm:mt-0">
              <span className={`text-sm px-3 py-1 rounded-full ${
                theme === "dark" 
                  ? "bg-slate-700 text-slate-300" 
                  : "bg-slate-100 text-slate-700"
              }`}>
                {theme === "dark" ? "🌙 Dark Mode" : "☀️ Light Mode"}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Settings */}
          <div className="lg:col-span-2 space-y-8">
            {/* Profile Section */}
            <div className={`rounded-xl shadow-sm border p-6 ${
              theme === "dark" 
                ? "bg-slate-800 border-slate-700" 
                : "bg-white border-slate-200"
            }`}>
              <div className="flex items-center justify-between mb-6">
                <h3 className={`text-lg font-semibold ${
                  theme === "dark" ? "text-white" : "text-slate-900"
                }`}>
                  Profile Information
                </h3>
                <button
                  onClick={() => setIsEditingProfile(!isEditingProfile)}
                  className={`text-sm font-medium px-3 py-1 rounded-lg transition-colors ${
                    theme === "dark"
                      ? "text-blue-400 hover:bg-slate-700"
                      : "text-blue-600 hover:bg-blue-50"
                  }`}
                >
                  {isEditingProfile ? "Cancel" : "Edit"}
                </button>
              </div>

              <div className="flex items-start space-x-6">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold ${
                  theme === "dark"
                    ? "bg-slate-700 text-slate-300"
                    : "bg-slate-100 text-slate-600"
                }`}>
                  {(isEditingProfile ? tempUser.name : user.name).charAt(0).toUpperCase()}
                </div>
                
                <div className="flex-1 space-y-4">
                  {isEditingProfile ? (
                    <>
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${
                          theme === "dark" ? "text-slate-300" : "text-slate-700"
                        }`}>
                          Name
                        </label>
                        <input
                          type="text"
                          value={tempUser.name}
                          onChange={(e) => setTempUser({ ...tempUser, name: e.target.value })}
                          className={`w-full p-3 rounded-lg border transition-colors ${
                            theme === "dark"
                              ? "bg-slate-700 border-slate-600 text-white focus:border-blue-400"
                              : "bg-white border-slate-300 text-slate-900 focus:border-blue-500"
                          } focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20`}
                        />
                      </div>
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${
                          theme === "dark" ? "text-slate-300" : "text-slate-700"
                        }`}>
                          Email
                        </label>
                        <input
                          type="email"
                          value={tempUser.email}
                          onChange={(e) => setTempUser({ ...tempUser, email: e.target.value })}
                          className={`w-full p-3 rounded-lg border transition-colors ${
                            theme === "dark"
                              ? "bg-slate-700 border-slate-600 text-white focus:border-blue-400"
                              : "bg-white border-slate-300 text-slate-900 focus:border-blue-500"
                          } focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20`}
                        />
                      </div>
                      <div className="flex space-x-3">
                        <button
                          onClick={handleSaveProfile}
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                        >
                          Save Changes
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                            theme === "dark"
                              ? "bg-slate-700 text-slate-300 hover:bg-slate-600"
                              : "bg-slate-200 text-slate-700 hover:bg-slate-300"
                          }`}
                        >
                          Cancel
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <h4 className={`text-lg font-medium ${
                          theme === "dark" ? "text-white" : "text-slate-900"
                        }`}>
                          {user.name}
                        </h4>
                        <p className={`text-sm ${
                          theme === "dark" ? "text-slate-400" : "text-slate-600"
                        }`}>
                          {user.email}
                        </p>
                      </div>
                      <div className={`text-xs px-2 py-1 rounded-full inline-block ${
                        theme === "dark"
                          ? "bg-emerald-900 text-emerald-300"
                          : "bg-emerald-100 text-emerald-800"
                      }`}>
                        ✓ Verified Account
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Appearance Section */}
            <div className={`rounded-xl shadow-sm border p-6 ${
              theme === "dark" 
                ? "bg-slate-800 border-slate-700" 
                : "bg-white border-slate-200"
            }`}>
              <h3 className={`text-lg font-semibold mb-6 ${
                theme === "dark" ? "text-white" : "text-slate-900"
              }`}>
                Appearance
              </h3>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className={`font-medium ${
                    theme === "dark" ? "text-white" : "text-slate-900"
                  }`}>
                    Dark Mode
                  </h4>
                  <p className={`text-sm ${
                    theme === "dark" ? "text-slate-400" : "text-slate-600"
                  }`}>
                    Switch between light and dark themes
                  </p>
                </div>
                <button
                  onClick={handleThemeToggle}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    theme === "dark" ? "bg-blue-600" : "bg-slate-200"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      theme === "dark" ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Notifications Section */}
            <div className={`rounded-xl shadow-sm border p-6 ${
              theme === "dark" 
                ? "bg-slate-800 border-slate-700" 
                : "bg-white border-slate-200"
            }`}>
              <h3 className={`text-lg font-semibold mb-6 ${
                theme === "dark" ? "text-white" : "text-slate-900"
              }`}>
                Notifications
              </h3>
              
              <div className="space-y-4">
                {[
                  { key: "weeklyUpdates", label: "Weekly Updates", desc: "Receive weekly summary of your tasks" },
                  { key: "securityAlerts", label: "Security Alerts", desc: "Important security notifications" },
                  { key: "taskReminders", label: "Task Reminders", desc: "Reminders for upcoming deadlines" },
                  { key: "emailDigest", label: "Email Digest", desc: "Daily email summary of activities" },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between">
                    <div>
                      <h4 className={`font-medium ${
                        theme === "dark" ? "text-white" : "text-slate-900"
                      }`}>
                        {item.label}
                      </h4>
                      <p className={`text-sm ${
                        theme === "dark" ? "text-slate-400" : "text-slate-600"
                      }`}>
                        {item.desc}
                      </p>
                    </div>
                    <button
                      onClick={() => toggleNotification(item.key)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        notifications[item.key] ? "bg-blue-600" : 
                        theme === "dark" ? "bg-slate-600" : "bg-slate-200"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          notifications[item.key] ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className={`rounded-xl shadow-sm border p-6 ${
              theme === "dark" 
                ? "bg-slate-800 border-slate-700" 
                : "bg-white border-slate-200"
            }`}>
              <h3 className={`text-lg font-semibold mb-4 ${
                theme === "dark" ? "text-white" : "text-slate-900"
              }`}>
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button className={`w-full text-left p-3 rounded-lg transition-colors ${
                  theme === "dark"
                    ? "hover:bg-slate-700 text-slate-300"
                    : "hover:bg-slate-50 text-slate-700"
                }`}>
                  <div className="flex items-center space-x-3">
                    <KeyIcon theme={theme} />
                    <span>Change Password</span>
                  </div>
                </button>
                <button className={`w-full text-left p-3 rounded-lg transition-colors ${
                  theme === "dark"
                    ? "hover:bg-slate-700 text-slate-300"
                    : "hover:bg-slate-50 text-slate-700"
                }`}>
                  <div className="flex items-center space-x-3">
                    <DownloadIcon theme={theme} />
                    <span>Export Data</span>
                  </div>
                </button>
                <button className={`w-full text-left p-3 rounded-lg transition-colors ${
                  theme === "dark"
                    ? "hover:bg-slate-700 text-slate-300"
                    : "hover:bg-slate-50 text-slate-700"
                }`}>
                  <div className="flex items-center space-x-3">
                    <SupportIcon theme={theme} />
                    <span>Contact Support</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Account Stats */}
            <div className={`rounded-xl shadow-sm border p-6 ${
              theme === "dark" 
                ? "bg-slate-800 border-slate-700" 
                : "bg-white border-slate-200"
            }`}>
              <h3 className={`text-lg font-semibold mb-4 ${
                theme === "dark" ? "text-white" : "text-slate-900"
              }`}>
                Account Summary
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className={`text-sm ${
                    theme === "dark" ? "text-slate-400" : "text-slate-600"
                  }`}>
                    Member since
                  </span>
                  <span className={`text-sm font-medium ${
                    theme === "dark" ? "text-white" : "text-slate-900"
                  }`}>
                    Jan 2024
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className={`text-sm ${
                    theme === "dark" ? "text-slate-400" : "text-slate-600"
                  }`}>
                    Tasks completed
                  </span>
                  <span className={`text-sm font-medium ${
                    theme === "dark" ? "text-white" : "text-slate-900"
                  }`}>
                    127
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className={`text-sm ${
                    theme === "dark" ? "text-slate-400" : "text-slate-600"
                  }`}>
                    Current streak
                  </span>
                  <span className={`text-sm font-medium ${
                    theme === "dark" ? "text-white" : "text-slate-900"
                  }`}>
                    15 days
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Icon Components
function KeyIcon({ theme }) {
  return (
    <svg className={`w-5 h-5 ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
    </svg>
  );
}

function DownloadIcon({ theme }) {
  return (
    <svg className={`w-5 h-5 ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  );
}

function SupportIcon({ theme }) {
  return (
    <svg className={`w-5 h-5 ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 110 19.5 9.75 9.75 0 010-19.5z" />
    </svg>
  );
}