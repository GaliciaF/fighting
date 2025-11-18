import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function AddTenant() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    room_id: "", // can just be a text input now
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/tenants", form);
      console.log("Tenant added:", response.data);
      alert("Tenant added successfully!");
      setForm({ name: "", email: "", phone: "", room_id: "" });
      navigate("/tenants");
    } catch (err) {
      console.error("Error adding tenant:", err.response || err);
      const message = err.response?.data?.message || err.response?.data || err.message;
      alert(`Failed to add tenant: ${message}`);
    }
  };

  return (
    <div className="p-6 flex flex-col items-center">
      <div className="bg-lincoln20 p-6 rounded-2xl shadow-card w-full max-w-lg text-black">
        <h2 className="text-xl font-semibold mb-4">Add Tenant</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Tenant Name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-avocado text-black placeholder-gray-500 bg-white"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-avocado text-black placeholder-gray-500 bg-white"
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-avocado text-black placeholder-gray-500 bg-white"
            required
          />
          <input
            type="text"
            name="room_id"
            placeholder="Room Number"
            value={form.room_id}
            onChange={handleChange}
            className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-avocado text-black placeholder-gray-500 bg-white"
            required
          />

          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={() => navigate("/tenants")}
              className="px-4 py-2 bg-smoky20 text-black rounded-xl hover:bg-gray-200 transition-all"
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
