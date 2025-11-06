import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const sampleTenants = [
  { id: 1, name: "Anna Reyes", room: "101", contact: "09123456789", status: "Active" },
  { id: 2, name: "John Cruz", room: "102", contact: "09987654321", status: "Pending" },
  { id: 3, name: "Maria Santos", room: "201", contact: "09778889999", status: "Inactive" },
];

export default function Tenants() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
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
        <table className="w-full text-sm text-left">
          <thead className="bg-lincoln30 text-background">
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
                <tr key={tenant.id} className="border-t hover:bg-lincoln30 transition-colors duration-200">
                  <td className="py-2 px-4">{tenant.name}</td>
                  <td className="py-2 px-4">{tenant.room}</td>
                  <td className="py-2 px-4">{tenant.contact}</td>
                  <td className="py-2 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        tenant.status === "Active"
                          ? "bg-lincoln50 text-background"
                          : tenant.status === "Pending"
                          ? "bg-avocado40 text-background"
                          : "bg-smoky20 text-smoky"
                      }`}
                    >
                      {tenant.status}
                    </span>
                  </td>
                  <td className="py-2 px-4 text-center">
                    <button className="text-lincoln hover:text-avocado font-medium">Edit</button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
