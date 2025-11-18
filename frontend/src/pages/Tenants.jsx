import React, { useEffect, useState } from "react";
import { useNavigate, NavLink, useLocation } from "react-router-dom";
import { Home, BedDouble, Users, CreditCard, LogOut, Trash2, Edit2 } from "lucide-react";
import axios from "axios";

const menuItems = [
  { name: "Dashboard", icon: <Home size={18} />, path: "/dashboard" },
  { name: "Rooms", icon: <BedDouble size={18} />, path: "/roommanagement" },
  { name: "Tenants", icon: <Users size={18} />, path: "/tenants" },
  { name: "Payments", icon: <CreditCard size={18} />, path: "/payments" },
];

export default function Tenants() {
  const navigate = useNavigate();
  const location = useLocation();
  const [tenants, setTenants] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const API_URL = "http://localhost:8000/api";

  const fetchTenants = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/tenants`);
      setTenants(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching tenants:", error);
      setLoading(false);
    }
  };

  // Refetch tenants when component mounts or route changes
  useEffect(() => {
    fetchTenants();
  }, [location]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this tenant?")) return;
    try {
      await axios.delete(`${API_URL}/tenants/${id}`);
      setTenants(tenants.filter((t) => t.id !== id));
    } catch (error) {
      console.error("Error deleting tenant:", error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/edittenant/${id}`);
  };

  const handleLogout = () => {
    localStorage.removeItem("role");
    navigate("/login");
  };

  const filteredTenants = tenants.filter(
    (t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.email.toLowerCase().includes(search.toLowerCase()) ||
      t.phone.includes(search)
  );

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
          <h1 className="text-3xl font-bold text-smoky">Tenants</h1>
          <button
            onClick={() => navigate("/addtenant")}
            className="bg-lincoln20 border border-lincoln/20 px-5 py-2 rounded-2xl shadow-card hover:bg-lincoln30 transition-colors duration-200"
          >
            + Add Tenant
          </button>
        </div>

        <input
          type="text"
          placeholder="Search tenants..."
          className="border p-3 rounded-2xl w-full md:w-1/3 focus:ring-2 focus:ring-avocado focus:outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="bg-lincoln20 border border-lincoln/20 rounded-2xl shadow-card overflow-x-auto">
          {loading ? (
            <p className="p-4 text-center">Loading tenants...</p>
          ) : (
            <table className="w-full text-sm text-left">
              <thead className="bg-lincoln30 text-background">
                <tr>
                  <th className="py-3 px-4">Name</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Phone</th>
                  <th className="py-3 px-4">Room</th>
                  <th className="py-3 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTenants.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-4">
                      No tenants found.
                    </td>
                  </tr>
                ) : (
                  filteredTenants.map((tenant) => (
                    <tr key={tenant.id} className="border-t hover:bg-lincoln30 transition-colors duration-200">
                      <td className="py-2 px-4">{tenant.name}</td>
                      <td className="py-2 px-4">{tenant.email}</td>
                      <td className="py-2 px-4">{tenant.phone}</td>
                      <td className="py-2 px-4">{tenant.room ? tenant.room.name : tenant.room_id}</td>
                      <td className="py-2 px-4 text-center flex justify-center gap-2">
                        <button onClick={() => handleEdit(tenant.id)} className="text-lincoln hover:text-avocado font-medium">
                          <Edit2 size={16} />
                        </button>
                        <button onClick={() => handleDelete(tenant.id)} className="text-red-500 hover:text-red-700 font-medium">
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
}
