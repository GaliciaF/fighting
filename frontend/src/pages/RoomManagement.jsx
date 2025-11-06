import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const rooms = [
  { id: 1, number: "101", type: "Single", price: 800, status: "occupied" },
  { id: 2, number: "102", type: "Double", price: 1200, status: "available" },
  { id: 3, number: "201", type: "Single", price: 850, status: "maintenance" },
];

export default function RoomManagement() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
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
          <option>Maintenance</option>
        </select>
        <select className="border p-3 rounded-2xl focus:ring-2 focus:ring-avocado focus:outline-none">
          <option>All Types</option>
          <option>Single</option>
          <option>Double</option>
          <option>Suite</option>
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
              <p className="mt-3 font-semibold text-smoky">
                {new Intl.NumberFormat("en-PH", {
                  style: "currency",
                  currency: "PHP",
                }).format(room.price)} /month
              </p>
            </div>
          ))}
      </div>
    </div>
  );
}
