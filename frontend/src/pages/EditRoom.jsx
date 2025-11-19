import React, { useEffect, useState } from "react"; 
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";

export default function EditRoom() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [allRooms, setAllRooms] = useState([]); // store all rooms to check duplicates
  const [form, setForm] = useState({
    room_number: "",
    room_type: "",
    rate: "",
    status: "Available",
    capacity: "",
  });

  // Fetch room and all rooms for duplicate check
  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const roomsRes = await api.get("/rooms");
        setAllRooms(roomsRes.data);

        const res = await api.get(`/rooms/${id}`);
        setForm({
          room_number: res.data.room_number,
          room_type: res.data.room_type,
          rate: res.data.rate,
          status: res.data.status,
          capacity: res.data.capacity || "",
        });
      } catch (err) {
        console.error(err);
        alert("Failed to fetch room data.");
        navigate("/roommanagement");
      }
    };
    fetchRoom();
  }, [id, navigate]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Check for duplicate room number (excluding current room)
    const duplicate = allRooms.find(
      (r) => r.room_number === form.room_number && r.id !== parseInt(id)
    );
    if (duplicate) {
      alert(`Room number ${form.room_number} already exists!`);
      setLoading(false);
      return;
    }

    try {
      await api.put(`/rooms/${id}`, {
        room_number: form.room_number,
        room_type: form.room_type,
        rate: form.rate,
        status: form.status,
        capacity: form.capacity,
      });

      alert("Room updated successfully!");
      navigate("/roommanagement", { state: { refresh: true } });
    } catch (err) {
      console.error(err);
      alert("Failed to update room.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 flex flex-col items-center">
      <div className="bg-lincoln20 p-6 rounded-2xl shadow-card w-full max-w-lg">
        <h2 className="text-xl font-semibold text-lincoln mb-4">Edit Room</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="room_number"
            placeholder="Room Number"
            value={form.room_number}
            onChange={handleChange}
            className="w-full p-3 border border-lincoln30 rounded-xl focus:outline-none focus:ring-2 focus:ring-avocado"
            required
          />
          <select
            name="room_type"
            value={form.room_type}
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
          <input
            type="number"
            name="capacity"
            placeholder="Capacity"
            value={form.capacity}
            onChange={handleChange}
            className="w-full p-3 border border-lincoln30 rounded-xl focus:outline-none focus:ring-2 focus:ring-avocado"
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
              disabled={loading}
              className="px-4 py-2 bg-lincoln text-white rounded-xl hover:bg-avocado transition-all"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
