import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const rooms = [
  { id: 1, number: "101", type: "Bedspacer", price: 800, status: "occupied" },
  { id: 2, number: "102", type: "Private", price: 1200, status: "available" },
  { id: 3, number: "201", type: "Bedspacer", price: 850, status: "occupied" },
];

export default function StaffRoomManagement() {
  const [search, setSearch] = useState("");
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
    <div className="flex min-h-screen bg-emerald-gradient text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-emerald-deep p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold text-emerald-gold mb-8">Emerald Staff</h2>
          <nav className="space-y-3">
            {menuItems.map((item) => (
              <div
                key={item.name}
                onClick={() => navigate(item.path)}
                className="cursor-pointer flex items-center gap-3 p-3 rounded-lg font-semibold hover:bg-emerald-blue transition-colors"
              >
                {item.name}
              </div>
            ))}
          </nav>
        </div>
        <button
          onClick={handleLogout}
          className="bg-emerald-gold text-emerald-deep font-semibold p-3 rounded-lg hover:bg-emerald-blue transition"
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-emerald-gold">Room Management</h1>
          <button
            onClick={() => navigate("/staff/add-room")}
            className="bg-emerald-deep border border-emerald-blue px-5 py-2 rounded-2xl shadow-card hover:bg-emerald-blue transition-colors duration-200"
          >
            + Add Room
          </button>
        </div>

        <div className="flex flex-wrap gap-3 items-center">
          <input
            type="text"
            placeholder="Search rooms..."
            className="border p-3 rounded-2xl w-full md:w-1/3 focus:ring-2 focus:ring-emerald-gold focus:outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select className="border p-3 rounded-2xl focus:ring-2 focus:ring-emerald-gold focus:outline-none text-black">
            <option>All Status</option>
            <option>Available</option>
            <option>Occupied</option>
          </select>
          <select className="border p-3 rounded-2xl focus:ring-2 focus:ring-emerald-gold focus:outline-none text-black">
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
                className="bg-emerald-deep border border-emerald-blue p-6 rounded-2xl shadow-card hover:bg-emerald-blue transition-colors duration-200"
              >
                <div className="flex justify-between items-center mb-3">
                  <p className="text-lg font-semibold text-emerald-gold">{`Room ${room.number}`}</p>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      room.status === "available"
                        ? "bg-emerald-gold text-emerald-deep"
                        : "bg-emerald-blue text-white"
                    }`}
                  >
                    {room.status}
                  </span>
                </div>
                <p className="text-white/80">{room.type} Room</p>
                <p className="mt-3 font-semibold text-white">
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
