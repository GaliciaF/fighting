import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";

export default function EditTenant() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    room_id: "",
  });

  const [loading, setLoading] = useState(true);

  // Fetch tenant data
  useEffect(() => {
    const fetchTenant = async () => {
      try {
        const response = await api.get(`/tenants/${id}`);
        const tenant = response.data;

        setForm({
          name: tenant.name || "",
          email: tenant.email || "",
          phone: tenant.phone || "",
          room_id: tenant.room_id || "",
        });

        setLoading(false);
      } catch (err) {
        console.error("Error loading tenant:", err.response || err);
        alert("Failed to load tenant data.");
        navigate("/tenants");
      }
    };

    fetchTenant();
  }, [id, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        name: form.name,
        email: form.email,
        phone: form.phone,
        room_id: Number(form.room_id),// matches backend
      };

      await api.put(`/tenants/${id}`, payload);
      alert("Tenant updated successfully!");
      navigate("/tenants", { replace: true });
    } catch (err) {
      console.error("Error updating tenant:", err.response || err);
      const message = err.response?.data?.message || err.message;
      alert(`Failed to update tenant: ${message}`);
    }
  };

  if (loading) return <p className="p-6">Loading tenant data...</p>;

  return (
    <div className="p-6 flex flex-col items-center">
      <div className="bg-lincoln20 p-6 rounded-2xl shadow-card w-full max-w-lg">
        <h2 className="text-xl font-semibold text-lincoln mb-4">Edit Tenant</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Tenant Name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-3 border border-lincoln30 rounded-xl"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 border border-lincoln30 rounded-xl"
            required
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            className="w-full p-3 border border-lincoln30 rounded-xl"
            required
          />

          <input
            type="number"
            name="room_id"
            placeholder="Room ID"
            value={form.room_id}
            onChange={handleChange}
            className="w-full p-3 border border-lincoln30 rounded-xl"
            required
          />

          <div className="flex justify-between mt-4">
            <button type="button" onClick={() => navigate("/tenants")} className="px-4 py-2 bg-smoky20 text-lincoln rounded-xl">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-lincoln text-white rounded-xl">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
