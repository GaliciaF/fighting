import React, { useEffect, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { Home, BedDouble, Users, CreditCard, LogOut, Trash2, Edit2 } from "lucide-react";
import api from "../api/axios";

const menuItems = [
  { name: "Dashboard", icon: <Home size={18} />, path: "/dashboard" },
  { name: "Rooms", icon: <BedDouble size={18} />, path: "/roommanagement" },
  { name: "Tenants", icon: <Users size={18} />, path: "/tenants" },
  { name: "Payments", icon: <CreditCard size={18} />, path: "/payments" },
];

export default function RoomManagement() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);

  // Fetch rooms from API
  const fetchRooms = async () => {
    try {
      const res = await api.get("/rooms");
      setRooms(res.data);
    } catch (err) {
      console.error("Error fetching rooms:", err);
    }
  };

  // Fetch rooms on mount
  useEffect(() => {
    fetchRooms();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("role");
    navigate("/login");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this room?")) return;
    try {
      await api.delete(`/rooms/${id}`);
      alert("Room deleted successfully!");
      fetchRooms(); // Refresh after delete
    } catch (err) {
      console.error(err);
      alert("Failed to delete room.");
    }
  };

  const filteredRooms = rooms.filter((room) => {
    const matchesSearch = room.room_number?.toUpperCase().includes(search.toUpperCase());
    const matchesType = filterType ? room.room_type === filterType : true;
    const matchesStatus = filterStatus ? room.status === filterStatus : true;
    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="flex min-h-screen bg-background text-smoky">
      {/* Sidebar */}
      <aside className="w-64 bg-lincoln p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-bold text-background mb-8">BoardingHouse</h2>
          <nav className="space-y-3">
            {menuItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 p-3 rounded-lg font-semibold hover:bg-avocado transition ${
                    isActive ? "bg-avocado text-background" : "text-background"
                  }`
                }
              >
                {item.icon} {item.name}
              </NavLink>
            ))}
          </nav>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 p-3 rounded-lg bg-lime20 hover:bg-avocado text-smoky font-semibold transition"
        >
          <LogOut size={18} /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-smoky">Room Management</h1>
          <button
            onClick={() => navigate("/addroom")}
            className="bg-lincoln20 border border-lincoln/20 px-5 py-2 rounded-2xl shadow-card hover:bg-lincoln30 transition-colors duration-200"
          >
            + Add Room
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 items-center">
          <input
            type="text"
            placeholder="Search rooms..."
            className="border p-3 rounded-2xl w-full md:w-1/3 focus:ring-2 focus:ring-avocado focus:outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="border p-3 rounded-2xl focus:ring-2 focus:ring-avocado focus:outline-none"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="Available">Available</option>
            <option value="Occupied">Occupied</option>
          </select>
          <select
            className="border p-3 rounded-2xl focus:ring-2 focus:ring-avocado focus:outline-none"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="">All Types</option>
            <option value="Bedspacer">Bedspacer</option>
            <option value="Private">Private</option>
          </select>
        </div>

        {/* ROOM CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredRooms.map((room) => (
            <div
              key={room.id}
              className="bg-lincoln20 border border-lincoln/20 p-6 rounded-2xl shadow-card hover:bg-lincoln30 transition-colors duration-200 cursor-pointer"
              onClick={() => setSelectedRoom(room)}
            >
              <div className="flex justify-between items-center mb-3">
                <p className="text-lg font-semibold text-smoky">Room {room.room_number}</p>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    room.status === "Available"
                      ? "bg-avocado/70 text-background"
                      : "bg-smoky20 text-smoky"
                  }`}
                >
                  {room.status}
                </span>
              </div>

              <p className="text-smoky/80">
                {room.room_type.charAt(0).toUpperCase() + room.room_type.slice(1)} Room
              </p>

              <p className="text-smoky/80">
                Capacity: {room.occupied || 0}/{room.capacity || 0}
              </p>

              <p className="mt-3 font-semibold text-smoky">
                {new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" }).format(room.rate)} /month
              </p>

              {/* Action Buttons */}
              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/editroom/${room.id}`);
                  }}
                  className="px-3 py-1 bg-avocado text-background rounded-xl hover:bg-avocado/80 flex items-center gap-1"
                >
                  <Edit2 size={14} /> Edit
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(room.id);
                  }}
                  className="px-3 py-1 bg-red-600 text-background rounded-xl hover:bg-red-700 flex items-center gap-1"
                >
                  <Trash2 size={14} /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* ROOM DETAILS MODAL */}
        {selectedRoom && (
          <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50">
            <div className="bg-lincoln30 p-6 rounded-3xl w-96 shadow-2xl relative border border-lincoln/40">
              <button
                onClick={() => setSelectedRoom(null)}
                className="absolute top-3 right-3 text-background hover:text-red-500 text-lg font-bold"
              >
                ✖
              </button>

              <h2 className="text-xl font-bold mb-4 text-background">
                Room {selectedRoom.room_number} Details
              </h2>

              <p className="text-background">
                <strong>Type:</strong> {selectedRoom.room_type.charAt(0).toUpperCase() + selectedRoom.room_type.slice(1)}
              </p>
              <p className="text-background">
                <strong>Status:</strong> {selectedRoom.status}
              </p>
              <p className="text-background">
                <strong>Capacity:</strong> {selectedRoom.occupied || 0}/{selectedRoom.capacity || 0}
              </p>
              <p className="text-background">
                <strong>Rate:</strong> {new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" }).format(selectedRoom.rate)}
              </p>

              {selectedRoom.status === "Occupied" && selectedRoom.tenant && (
                <div className="mt-4 bg-lincoln20 p-3 rounded-xl border border-lincoln/40">
                  <h3 className="font-semibold text-background mb-2">Tenant Info</h3>
                  <p className="text-background">Name: {selectedRoom.tenant.name}</p>
                  <p className="text-background">Contact: {selectedRoom.tenant.contact}</p>
                  <p className="text-background">Email: {selectedRoom.tenant.email}</p>
                </div>
              )}

              <div className="flex justify-end mt-4 gap-2">
                <button
                  onClick={() => {
                    setSelectedRoom(null);
                    navigate(`/editroom/${selectedRoom.id}`);
                  }}
                  className="px-4 py-2 bg-avocado text-background rounded-xl hover:bg-avocado/80 flex items-center gap-2"
                >
                  <Edit2 size={16} /> Edit Room
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
