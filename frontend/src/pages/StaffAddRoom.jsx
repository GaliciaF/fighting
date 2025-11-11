import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function StaffAddRoom() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    roomNumber: "",
    roomType: "",
    rate: "",
    status: "Available",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Room added successfully!");
    navigate("/staff/rooms");
  };

  return (
    <div className="p-6 flex flex-col items-center">
      <div className="bg-emerald-deep p-6 rounded-2xl shadow-card w-full max-w-lg">
        <h2 className="text-xl font-semibold text-emerald-gold mb-4">
          Add Room
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="roomNumber"
            placeholder="Room Number"
            value={form.roomNumber}
            onChange={handleChange}
            className="w-full p-3 border border-emerald-blue rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-gold"
            required
          />

          <select
            name="roomType"
            value={form.roomType}
            onChange={handleChange}
            className="w-full p-3 border border-emerald-blue rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-gold"
            required
          >
            <option value="" disabled>
              Select Room Type
            </option>
            <option value="Bedspacer">Bedspacer</option>
            <option value="Private">Private</option>
          </select>

          <input
            type="number"
            name="rate"
            placeholder="Monthly Rate (₱)"
            value={form.rate}
            onChange={handleChange}
            className="w-full p-3 border border-emerald-blue rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-gold"
            required
          />

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full p-3 border border-emerald-blue rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-gold"
          >
            <option value="Available">Available</option>
            <option value="Occupied">Occupied</option>
          </select>

          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={() => navigate("/staff/rooms")}
              className="px-4 py-2 bg-emerald-blue text-white rounded-xl hover:bg-emerald-gold hover:text-emerald-deep transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-emerald-gold text-emerald-deep rounded-xl hover:bg-emerald-blue hover:text-white transition-all"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
