import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Home, BedDouble, Users, Megaphone, Calendar, Eye, LogOut, CreditCard } from "lucide-react";
import { logout } from "../utils/auth";

export default function Sidebar({ isOpen, toggle }) {
  const navigate = useNavigate();

  const menuItems = [
    { name: "Dashboard", icon: <Home size={18} />, path: "/dashboard" },
    { name: "Rooms", icon: <BedDouble size={18} />, path: "/roommanagement" },
    { name: "Tenants", icon: <Users size={18} />, path: "/tenants" },
    {name: "Payments", icon: <CreditCard size={18} />, path: "/payments" },
    { name: "Cleaning Schedule", icon: <Calendar size={18} />, path: "/cleaningschedule" },
  ];

  return (
    <div className={`bg-background border-r p-4 transition-all duration-300 ${isOpen ? "w-64" : "w-16"}`}>
      <button onClick={toggle} className="mb-4 text-smoky font-semibold">{isOpen ? "Collapse" : "Expand"}</button>
      <nav className="flex flex-col gap-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-2 p-2 rounded hover:bg-avocado transition ${
                isActive ? "bg-avocado font-semibold text-background" : "text-smoky"
              }`
            }
          >
            {item.icon}
            {isOpen && item.name}
          </NavLink>
        ))}

        <button
          onClick={() => { logout(); navigate("/login"); }}
          className="flex items-center gap-2 p-2 rounded hover:bg-red-100 mt-4 text-red-600 font-medium transition"
        >
          <LogOut size={18} />
          {isOpen && "Logout"}
        </button>
      </nav>
    </div>
  );
}
