import React from "react";
import { useNavigate, Link } from "react-router-dom";

export default function StaffDashboard() {
  const navigate = useNavigate();

  const menuItems = [
    { name: "Dashboard", path: "/staff/dashboard" },
    { name: "Room Management", path: "/staff/rooms" },
    { name: "Tenants", path: "/staff/tenants" }
   
  ];

  const handleLogout = () => {
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-emerald-deep text-white flex flex-col">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-emerald-gold mb-8">Staff Dash</h1>
          <nav className="flex flex-col gap-3">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="px-4 py-2 rounded-lg hover:bg-emerald-blue transition"
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-auto p-6">
          <button
            onClick={handleLogout}
            className="w-full bg-emerald-gold text-emerald-deep font-semibold py-2 rounded-lg hover:bg-emerald-blue hover:text-white transition"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 bg-emerald-gradient p-10 space-y-6 text-white">
        <section className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl shadow-xl">
          <h2 className="text-emerald-gold text-xl font-semibold mb-4">
            Welcome, Staff Member 🌿
          </h2>
          <p className="text-white/90">
           You can manage rooms, tenants,
            and assist users here.
          </p>
        </section>

      </main>
    </div>
  );
}
