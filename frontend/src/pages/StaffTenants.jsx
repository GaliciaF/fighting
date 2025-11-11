import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const sampleTenants = [
  { id: 1, name: "Anna Reyes", room: "101", contact: "09123456789", status: "Active" },
  { id: 2, name: "John Cruz", room: "102", contact: "09987654321", status: "Pending" },
  { id: 3, name: "Maria Santos", room: "201", contact: "09778889999", status: "Inactive" },
];

export default function StaffTenants() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const menuItems = [
    { name: "Dashboard", path: "/staff/dashboard" },
    { name: "Room Management", path: "/staff/rooms" },
    { name: "Tenants", path: "/staff/tenants" }
  ];

  const handleLogout = () => {
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-emerald-gradient text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-emerald-deep p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold text-emerald-gold mb-8">Emerald Staff</h2>
          <nav className="space-y-3">
            {menuItems.map((item) => (
              <div
                key={item.name}
                onClick={() => navigate(item.path)}
                className="cursor-pointer flex items-center gap-3 p-3 rounded-lg font-semibold hover:bg-emerald-blue transition-colors"
              >
                {item.name}
              </div>
            ))}
          </nav>
        </div>
        <button
          onClick={handleLogout}
          className="bg-emerald-gold text-emerald-deep font-semibold p-3 rounded-lg hover:bg-emerald-blue transition"
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-emerald-gold">Tenants</h1>
          <button
            onClick={() => navigate("/staff/add-tenant")}
            className="bg-emerald-deep border border-emerald-blue px-5 py-2 rounded-2xl shadow-card hover:bg-emerald-blue transition-colors duration-200"
          >
            + Add Tenant
          </button>
        </div>

        <input
          type="text"
          placeholder="Search tenants..."
          className="border p-3 rounded-2xl w-full md:w-1/3 focus:ring-2 focus:ring-emerald-gold focus:outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="bg-emerald-deep border border-emerald-blue rounded-2xl shadow-card overflow-x-auto">
          <table className="w-full text-sm text-left text-white">
            <thead className="bg-emerald-blue text-emerald-gold">
              <tr>
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Room</th>
                <th className="py-3 px-4">Contact</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sampleTenants
                .filter((t) => t.name.toLowerCase().includes(search.toLowerCase()))
                .map((tenant) => (
                  <tr
                    key={tenant.id}
                    className="border-t border-emerald-blue hover:bg-emerald-blue/20 transition-colors duration-200"
                  >
                    <td className="py-2 px-4">{tenant.name}</td>
                    <td className="py-2 px-4">{tenant.room}</td>
                    <td className="py-2 px-4">{tenant.contact}</td>
                    <td className="py-2 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          tenant.status === "Active"
                            ? "bg-emerald-gold text-emerald-deep"
                            : tenant.status === "Pending"
                            ? "bg-emerald-blue text-emerald-gold"
                            : "bg-smoky20 text-smoky"
                        }`}
                      >
                        {tenant.status}
                      </span>
                    </td>
                    <td className="py-2 px-4 text-center">
                      <button className="text-emerald-gold hover:text-emerald-blue font-medium">
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
