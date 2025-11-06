import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const payments = [
  { id: 1, tenant: "Anna Reyes", amount: "₱5,000", date: "Oct 15, 2025", status: "Paid" },
  { id: 2, tenant: "John Cruz", amount: "₱4,500", date: "Oct 14, 2025", status: "Pending" },
  { id: 3, tenant: "Liza Gomez", amount: "₱5,000", date: "Oct 13, 2025", status: "Paid" },
];

export default function Payments() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  return (
    <div className="space-y-6">
      {/* Header with title and button */}
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
          .filter((p) =>
            p.tenant.toLowerCase().includes(search.toLowerCase())
          )
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
                  p.status === "Paid"
                    ? "text-avocado"
                    : "text-[#B91C1C]" // subtle red for pending
                }`}
              >
                Status: {p.status}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
}
