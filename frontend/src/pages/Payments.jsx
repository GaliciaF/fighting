import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { Home, BedDouble, Users, CreditCard, LogOut } from "lucide-react";

const payments = [
  { id: 1, tenant: "Anna Reyes", amount: "₱5,000", date: "Oct 15, 2025", status: "Paid" },
  { id: 2, tenant: "John Cruz", amount: "₱4,500", date: "Oct 14, 2025", status: "Pending" },
  { id: 3, tenant: "Liza Gomez", amount: "₱5,000", date: "Oct 13, 2025", status: "Paid" },
];

const menuItems = [
  { name: "Dashboard", icon: <Home size={18} />, path: "/dashboard" },
  { name: "Rooms", icon: <BedDouble size={18} />, path: "/roommanagement" },
  { name: "Tenants", icon: <Users size={18} />, path: "/tenants" },
  { name: "Payments", icon: <CreditCard size={18} />, path: "/payments" },
];

export default function Payments() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("role");
    navigate("/login");
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

        {/* Search input */}
        <input
          type="text"
          placeholder="Search payments..."
          className="border p-3 rounded-2xl w-full md:w-1/3 focus:ring-2 focus:ring-avocado focus:outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Payment cards */}
        <div className="space-y-4 mt-4">
          {payments
            .filter((p) => p.tenant.toLowerCase().includes(search.toLowerCase()))
            .map((p) => (
              <div
                key={p.id}
                className="bg-lincoln20 border border-lincoln/20 rounded-2xl shadow-card p-6 hover:bg-lincoln30 transition-colors duration-200"
              >
                <h3 className="text-lg font-semibold text-smoky">{p.tenant}</h3>
                <p className="text-smoky/90 mt-2">Amount: {p.amount}</p>
                <p className="text-smoky/90">Date: {p.date}</p>
                <p
                  className={`mt-2 font-medium ${
                    p.status === "Paid" ? "text-avocado" : "text-[#B91C1C]"
                  }`}
                >
                  Status: {p.status}
                </p>
              </div>
            ))}
        </div>
      </main>
    </div>
  );
}
