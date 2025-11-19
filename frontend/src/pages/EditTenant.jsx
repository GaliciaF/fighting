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
    room_id: "", // store room id
  });

  const [loading, setLoading] = useState(true);
  const [rooms, setRooms] = useState([]); // store available rooms

  useEffect(() => {
    const fetchData = async () => {
      try {
        const roomsRes = await api.get("/rooms");
        setRooms(roomsRes.data);

        const tenantRes = await api.get(`/tenants/${id}`);
        const tenant = tenantRes.data;

        setForm({
          name: tenant.name || "",
          email: tenant.email || "",
          phone: tenant.phone || "",
          room_id: tenant.room_id || "",
        });

        setLoading(false);
      } catch (err) {
        console.error("Error loading tenant or rooms:", err);
        alert("Failed to load tenant data.");
        navigate("/tenants");
      }
    };

    fetchData();
  }, [id, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.room_id) {
      alert("Please select a room!");
      return;
    }

    try {
      // Fetch tenant's old room
      const tenantRes = await api.get(`/tenants/${id}`);
      const oldRoomId = tenantRes.data.room_id;

      // Update tenant
      await api.put(`/tenants/${id}`, form);

      // --- Update old room status ---
      if (oldRoomId) {
        const oldRoomRes = await api.get(`/rooms/${oldRoomId}`);
        const oldRoom = oldRoomRes.data;
        let oldStatus = oldRoom.tenants?.length === 0 ? "Available" : "Occupied";
        await api.put(`/rooms/${oldRoomId}`, { ...oldRoom, status: oldStatus });
      }

      // --- Update new room status ---
      const newRoomRes = await api.get(`/rooms/${form.room_id}`);
      const newRoom = newRoomRes.data;
      let newStatus = "Occupied";
      if (newRoom.tenants?.length >= newRoom.capacity) newStatus = "Full";
      await api.put(`/rooms/${form.room_id}`, { ...newRoom, status: newStatus });

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
      <div className="bg-lincoln20 p-6 rounded-2xl shadow-card w-full max-w-lg text-black">
        <h2 className="text-xl font-semibold mb-4">Edit Tenant</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Tenant Name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-avocado"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-avocado"
            required
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-avocado"
            required
          />

          {/* Room selection dropdown */}
          <select
            name="room_id"
            value={form.room_id}
            onChange={handleChange}
            className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-avocado"
            required
          >
            <option value="">Select Room</option>
            {rooms.map((room) => (
              <option key={room.id} value={room.id}>
                Room {room.room_number} ({room.room_type}, {room.tenants?.length || 0}/{room.capacity || 0} - {room.status})
              </option>
            ))}
          </select>

          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={() => navigate("/tenants")}
              className="px-4 py-2 bg-smoky20 rounded-xl hover:bg-gray-200 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-lincoln text-white rounded-xl hover:bg-avocado transition-all"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
