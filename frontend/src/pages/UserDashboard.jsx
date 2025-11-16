import React, { useEffect, useState } from "react";
import { User, CreditCard, Megaphone, LogOut } from "lucide-react";
import { useNavigate, NavLink } from "react-router-dom";

export default function UserDashboard() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const name = localStorage.getItem("name") || "Tenant";
    setUserName(name);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("email");
    localStorage.removeItem("name");
    navigate("/login");
  };

  const menuItems = [
    { id: "profile", label: "My Profile", icon: <User size={18} />, path: "/user/profile" },
    { id: "payments", label: "Payment History", icon: <CreditCard size={18} />, path: "/user/payments" },
    { id: "announcements", label: "Announcements", icon: <Megaphone size={18} />, path: "/user/announcements" },
  ];

  // Stats cards simplified
  const stats = [
    { id: 1, label: "Total Payments", value: 2, icon: <CreditCard size={24} />, path: "/user/payments", bg: "bg-antiqueFuchsia" },
    { id: 2, label: "Announcements", value: 2, icon: <Megaphone size={24} />, path: "/user/announcements", bg: "bg-bdazzledBlue" },
  ];

  return (
    <div className="flex min-h-screen bg-blueYonder/10">
      {/* Sidebar */}
      <aside className="w-64 bg-oxfordBlue text-white p-6 flex flex-col justify-between shadow-lg rounded-r-2xl">
        <div className="space-y-8">
          <h1 className="text-2xl font-bold text-metallicPink">Tenant Dashboard</h1>
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <NavLink
                key={item.id}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 w-full px-4 py-3 rounded-2xl font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-antiqueFuchsia text-white shadow-md"
                      : "text-blue-100 hover:bg-bdazzledBlue/40 hover:text-white"
                  }`
                }
              >
                {item.icon} {item.label}
              </NavLink>
            ))}
          </nav>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-3 bg-antiqueFuchsia text-white rounded-2xl hover:bg-antiqueFuchsia/80 shadow-md transition-all"
        >
          <LogOut size={16} /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 space-y-8 overflow-y-auto">
       {/* Welcome Banner */}
<div className="bg-oxfordBlue/75 p-6 rounded-2xl shadow-md flex flex-col md:flex-row md:justify-between md:items-center">
  <div>
    <h1 className="text-3xl font-bold text-white mb-2">Welcome, {userName}!</h1>
    <p className="text-blue-100/80">
      Use the sidebar to navigate to your profile, view payment history, or check announcements.
    </p>
  </div>
  <div className="mt-4 md:mt-0">
    <img
      src="/default-avatar.png"
      alt="Avatar"
      className="w-20 h-20 rounded-full border-4 border-antiqueFuchsia shadow-md"
    />
  </div>
</div>



        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.id}
              onClick={() => navigate(stat.path)}
              className={`flex items-center justify-between p-4 rounded-2xl shadow-md cursor-pointer ${stat.bg} hover:scale-105 transition-transform`}
            >
              <div>
                <p className="text-white text-lg font-semibold">{stat.label}</p>
                <p className="text-white text-2xl font-bold mt-1">{stat.value}</p>
              </div>
              <div className="p-3 bg-white/20 rounded-full">{stat.icon}</div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
