import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios"; // Axios instance

export default function AddTenant() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    contact: "",
    roomNumber: "",
    startDate: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send POST request to backend
      await api.post("/tenants", form);
      alert("Tenant added successfully!");
      // Reset form
      setForm({ name: "", contact: "", roomNumber: "", startDate: "" });
      navigate("/tenants"); // Redirect to tenant management page
    } catch (err) {
      console.error(err);
      alert("Failed to add tenant.");
    }
  };

  return (
    <div className="p-6 flex flex-col items-center">
      <div className="bg-lincoln20 p-6 rounded-2xl shadow-card w-full max-w-lg">
        <h2 className="text-xl font-semibold text-lincoln mb-4">Add Tenant</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Tenant Name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-3 border border-lincoln30 rounded-xl focus:outline-none focus:ring-2 focus:ring-avocado"
            required
          />
          <input
            type="text"
            name="contact"
            placeholder="Contact Number"
            value={form.contact}
            onChange={handleChange}
            className="w-full p-3 border border-lincoln30 rounded-xl focus:outline-none focus:ring-2 focus:ring-avocado"
            required
          />
          <input
            type="text"
            name="roomNumber"
            placeholder="Room Number"
            value={form.roomNumber}
            onChange={handleChange}
            className="w-full p-3 border border-lincoln30 rounded-xl focus:outline-none focus:ring-2 focus:ring-avocado"
            required
          />
          <input
            type="date"
            name="startDate"
            value={form.startDate}
            onChange={handleChange}
            className="w-full p-3 border border-lincoln30 rounded-xl focus:outline-none focus:ring-2 focus:ring-avocado"
            required
          />

          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={() => navigate("/tenants")}
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
