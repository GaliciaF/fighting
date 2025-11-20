import React, { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { Home, BedDouble, Users, CreditCard, LogOut, Edit, Trash2 } from "lucide-react";
import api from "../api/axios";

const menuItems = [
  { name: "Dashboard", icon: <Home size={18} />, path: "/dashboard" },
  { name: "Rooms", icon: <BedDouble size={18} />, path: "/roommanagement" },
  { name: "Tenants", icon: <Users size={18} />, path: "/tenants" },
  { name: "Payments", icon: <CreditCard size={18} />, path: "/payments" },
];

export default function Payments() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All"); // Status filter
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem("role");
    navigate("/login");
  };

  const fetchPayments = async () => {
    try {
      const response = await api.get("/payments");
      setPayments(response.data);
    } catch (error) {
      console.error("Failed to fetch payments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this payment?")) return;
    try {
      await api.delete(`/payments/${id}`);
      setPayments(payments.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Failed to delete payment:", error);
    }
  };

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
          <h1 className="text-3xl font-bold text-smoky">Payments</h1>
          <button
            onClick={() => navigate("/addpayment")}
            className="bg-lincoln20 border border-lincoln/20 px-5 py-2 rounded-2xl shadow-card hover:bg-lincoln30 transition-colors duration-200"
          >
            + Add Payment
          </button>
        </div>

        {/* Search and Status Filter */}
        <div className="flex gap-4 items-center mt-4">
          <input
            type="text"
            placeholder="Search payments..."
            className="border p-3 rounded-2xl w-full md:w-1/3 focus:ring-2 focus:ring-avocado focus:outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border p-3 rounded-2xl focus:ring-2 focus:ring-avocado focus:outline-none"
          >
            <option value="All">All Status</option>
            <option value="Paid">Paid</option>
            <option value="Unpaid">Unpaid</option>
          </select>
        </div>

        {/* Loading state */}
        {loading && <p>Loading payments...</p>}

        {/* Empty state */}
        {!loading && payments.length === 0 && (
          <div className="mt-10 text-center text-smoky/70">
            <p className="text-lg font-semibold">No payments found</p>
            <p className="mt-1">You can add a new payment by clicking the button above.</p>
          </div>
        )}

        {/* Payment cards */}
        <div className="space-y-4 mt-4">
          {payments
            .filter((p) =>
              p.tenant_name?.toLowerCase().includes(search.toLowerCase())
            )
            .filter((p) =>
              statusFilter === "All" ? true : p.status === statusFilter
            )
            .map((p) => (
              <div
                key={p.id}
                className="bg-lincoln20 border border-lincoln/20 rounded-2xl shadow-card p-6 hover:bg-lincoln30 transition-colors duration-200"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-smoky">{p.tenant_name}</h3>
                    <p className="text-smoky/90 mt-2">Amount: ₱{p.amount}</p>
                    <p className="text-smoky/90">Date: {p.date}</p>
                    <p
                      className={`mt-2 font-medium ${
                        p.status === "Paid" ? "text-avocado" : "text-[#B91C1C]"
                      }`}
                    >
                      Status: {p.status}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate(`/editpayment/${p.id}`)}
                      className="bg-avocado/20 hover:bg-avocado/30 p-2 rounded-lg transition"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="bg-red-600/20 hover:bg-red-600/30 p-2 rounded-lg transition"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </main>
    </div>
  );
}
