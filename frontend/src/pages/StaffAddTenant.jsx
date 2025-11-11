import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function StaffAddTenant() {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Tenant added successfully!");
    navigate("/staff/tenants");
  };

  return (
    <div className="p-6 flex flex-col items-center">
      <div className="bg-emerald-deep p-6 rounded-2xl shadow-card w-full max-w-lg">
        <h2 className="text-xl font-semibold text-emerald-gold mb-4">
          Add Tenant
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Tenant Name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-3 border border-emerald-blue rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-gold"
            required
          />
          <input
            type="text"
            name="contact"
            placeholder="Contact Number"
            value={form.contact}
            onChange={handleChange}
            className="w-full p-3 border border-emerald-blue rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-gold"
            required
          />
          <input
            type="text"
            name="roomNumber"
            placeholder="Room Number"
            value={form.roomNumber}
            onChange={handleChange}
            className="w-full p-3 border border-emerald-blue rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-gold"
            required
          />
          <input
            type="date"
            name="startDate"
            value={form.startDate}
            onChange={handleChange}
            className="w-full p-3 border border-emerald-blue rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-gold"
            required
          />

          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={() => navigate("/staff/tenants")}
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
