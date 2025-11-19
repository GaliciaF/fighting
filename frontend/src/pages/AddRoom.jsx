import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function AddRoom() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    room_number: "",
    room_type: "Bedspacer",
    rate: "",
    capacity: "",
    status: "Available",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/rooms", form);
      console.log("Room Saved:", res.data);

      alert("Room added successfully!");

      // Reset form
      setForm({
        room_number: "",
        room_type: "Bedspacer",
        rate: "",
        capacity: "",
        status: "Available",
      });

      navigate("/roommanagement");
    } catch (error) {
      if (error.response) {
        console.error("Status:", error.response.status);
        console.error("Data:", error.response.data);
        alert(
          `Failed to save room: ${error.response.data.message || "Unknown error"}`
        );
      } else {
        console.error("Error:", error);
        alert("Failed to save room: Network error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 flex flex-col items-center">
      <div className="bg-lincoln20 p-6 rounded-2xl shadow-card w-full max-w-lg">
        <h2 className="text-xl font-semibold text-lincoln mb-4">Add Room</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Room Number */}
          <input
            type="number"
            name="room_number"
            placeholder="Room Number"
            value={form.room_number}
            onChange={handleChange}
            className="w-full p-3 border border-lincoln30 rounded-xl focus:outline-none focus:ring-2 focus:ring-avocado"
            required
          />

          {/* Room Type */}
          <select
            name="room_type"
            value={form.room_type}
            onChange={handleChange}
            className="w-full p-3 border border-lincoln30 rounded-xl focus:outline-none focus:ring-2 focus:ring-avocado"
          >
            <option value="Bedspacer">Bedspacer</option>
            <option value="Private">Private</option>
          </select>

          {/* Price */}
          <input
            type="number"
            name="rate"
            placeholder="Monthly Rate (₱)"
            value={form.rate}
            onChange={handleChange}
            className="w-full p-3 border border-lincoln30 rounded-xl focus:outline-none focus:ring-2 focus:ring-avocado"
            required
          />

          {/* Capacity */}
          <input
            type="number"
            name="capacity"
            placeholder="Capacity"
            value={form.capacity}
            onChange={handleChange}
            className="w-full p-3 border border-lincoln30 rounded-xl focus:outline-none focus:ring-2 focus:ring-avocado"
            required
          />

          {/* Status */}
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full p-3 border border-lincoln30 rounded-xl focus:outline-none focus:ring-2 focus:ring-avocado"
          >
            <option value="Available">Available</option>
            <option value="Occupied">Occupied</option>
            <option value="Full">Full</option>
          </select>

          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={() => navigate("/roommanagement")}
              className="px-4 py-2 bg-smoky20 text-lincoln rounded-xl hover:bg-lincoln30 transition-all"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-lincoln text-white rounded-xl hover:bg-avocado transition-all"
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
