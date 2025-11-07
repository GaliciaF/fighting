import React, { useState } from "react"; 
import { useNavigate } from "react-router-dom";

export default function AddRoom() {
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
    navigate("/roommanagement");
  };

  return (
    <div className="p-6 flex flex-col items-center">
      <div className="bg-lincoln20 p-6 rounded-2xl shadow-card w-full max-w-lg">
        <h2 className="text-xl font-semibold text-lincoln mb-4">Add Room</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="roomNumber"
            placeholder="Room Number"
            value={form.roomNumber}
            onChange={handleChange}
            className="w-full p-3 border border-lincoln30 rounded-xl focus:outline-none focus:ring-2 focus:ring-avocado"
            required
          />

          <select
            name="roomType"
            value={form.roomType}
            onChange={handleChange}
            className="w-full p-3 border border-lincoln30 rounded-xl focus:outline-none focus:ring-2 focus:ring-avocado"
            required
          >
            <option value="" disabled>Select Room Type</option>
            <option value="Bedspacer">Bedspacer</option>
            <option value="Private">Private</option>
        
          </select>

          <input
            type="number"
            name="rate"
            placeholder="Monthly Rate (₱)"
            value={form.rate}
            onChange={handleChange}
            className="w-full p-3 border border-lincoln30 rounded-xl focus:outline-none focus:ring-2 focus:ring-avocado"
            required
          />

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full p-3 border border-lincoln30 rounded-xl focus:outline-none focus:ring-2 focus:ring-avocado"
          >
            <option value="Available">Available</option>
            <option value="Occupied">Occupied</option>
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
              className="px-4 py-2 bg-lincoln text-white rounded-xl hover:bg-avocado transition-all"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
