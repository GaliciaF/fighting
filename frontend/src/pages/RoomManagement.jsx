import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { Home, BedDouble, Users, CreditCard, LogOut } from "lucide-react";

const rooms = [
  { id: 1, number: "101", type: "Bedspacer", price: 800, status: "occupied", capacity: 6 },
  { id: 2, number: "102", type: "Private", price: 1000, status: "available", capacity: 6 },
  { id: 3, number: "201", type: "Bedspacer", price: 800, status: "occupied", capacity: 6 },
];

const menuItems = [
  { name: "Dashboard", icon: <Home size={18} />, path: "/dashboard" },
  { name: "Rooms", icon: <BedDouble size={18} />, path: "/roommanagement" },
  { name: "Tenants", icon: <Users size={18} />, path: "/tenants" },
  { name: "Payments", icon: <CreditCard size={18} />, path: "/payments" },
];

export default function RoomManagement() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-background text-smoky">
      {/* Sidebar */}
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
          onClick={handleLogout}
          className="flex items-center gap-2 p-3 rounded-lg bg-lime20 hover:bg-avocado text-smoky font-semibold transition"
        >
          <LogOut size={18} /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-smoky">Room Management</h1>
          <button
            onClick={() => navigate("/addroom")}
            className="bg-lincoln20 border border-lincoln/20 px-5 py-2 rounded-2xl shadow-card hover:bg-lincoln30 transition-colors duration-200"
          >
            + Add Room
          </button>
        </div>

        <div className="flex flex-wrap gap-3 items-center">
          <input
            type="text"
            placeholder="Search rooms..."
            className="border p-3 rounded-2xl w-full md:w-1/3 focus:ring-2 focus:ring-avocado focus:outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select className="border p-3 rounded-2xl focus:ring-2 focus:ring-avocado focus:outline-none">
            <option>All Status</option>
            <option>Available</option>
            <option>Occupied</option>
          </select>
          <select className="border p-3 rounded-2xl focus:ring-2 focus:ring-avocado focus:outline-none">
            <option>All Types</option>
            <option>Bedspacer</option>
            <option>Private</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {rooms
            .filter((r) => r.number.includes(search))
            .map((room) => (
              <div
                key={room.id}
                className="bg-lincoln20 border border-lincoln/20 p-6 rounded-2xl shadow-card hover:bg-lincoln30 transition-colors duration-200"
              >
                <div className="flex justify-between items-center mb-3">
                  <p className="text-lg font-semibold text-smoky">{`Room ${room.number}`}</p>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      room.status === "available"
                        ? "bg-lincoln/80 text-background"
                        : room.status === "occupied"
                        ? "bg-smoky20 text-smoky"
                        : "bg-avocado40 text-background"
                    }`}
                  >
                    {room.status}
                  </span>
                </div>
                <p className="text-smoky/80">{room.type} Room</p>
                <p className="text-smoky/80">Capacity: {room.capacity}</p>
                <p className="mt-3 font-semibold text-smoky">
                  {new Intl.NumberFormat("en-PH", {
                    style: "currency",
                    currency: "PHP",
                  }).format(room.price)}{" "}
                  /month
                </p>
              </div>
            ))}
        </div>
      </main>
    </div>
  );
}
