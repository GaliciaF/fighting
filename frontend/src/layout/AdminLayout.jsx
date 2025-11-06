import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Home, BedDouble, Users, Megaphone, Calendar, Eye, LogOut, CreditCard } from "lucide-react";

const menuItems = [
  { name: "Dashboard", icon: <Home size={18} />, path: "/dashboard" },
  { name: "Rooms", icon: <BedDouble size={18} />, path: "/roommanagement" },
  { name: "Tenants", icon: <Users size={18} />, path: "/tenants" },
  { name: "Visitors", icon: <Calendar size={18} />, path: "/visitormanagement" },
      {name: "Payments", icon: <CreditCard size={18} />, path: "/payments" },

  { name: "Cleaning", icon: <Calendar size={18} />, path: "/cleaningschedule" },
  { name: "Announcements", icon: <Megaphone size={18} />, path: "/announcements" },
];

export default function AdminLayout({ children, hideSidebar }) {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-background text-smoky">
      {!hideSidebar && (
        <aside className="w-64 bg-lincoln p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold text-background mb-8">BoardingHouse</h2>
            <nav className="space-y-3">
              {menuItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 p-3 rounded-lg font-semibold hover:bg-avocado transition ${
                      isActive ? "bg-avocado text-background" : "text-background"
                    }`
                  }
                >
                  {item.icon} {item.name}
                </NavLink>
              ))}
            </nav>
          </div>
          <button
            onClick={() => navigate("/login")}
            className="flex items-center gap-2 p-3 rounded-lg bg-lime20 hover:bg-avocado text-smoky font-semibold transition"
          >
            <LogOut size={18} /> Logout
          </button>
        </aside>
      )}

      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
