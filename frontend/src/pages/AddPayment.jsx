import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios"; // Axios instance with baseURL and credentials

export default function AddPayment() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    tenant_id: "",
    amount: "",
    payment_date: "",
    status: "Paid",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send POST request to backend
      await api.post("/payments", form);
      alert("Payment recorded!");
      // Reset form
      setForm({ tenant_id: "", amount: "", payment_date: "", status: "Paid" });
      navigate("/payments"); // Redirect to payments page
    } catch (err) {
      console.error(err);
      alert("Failed to record payment.");
    }
  };

  return (
    <div className="p-6 flex flex-col items-center">
      <div className="bg-lincoln20 p-6 rounded-2xl shadow-card w-full max-w-lg">
        <h2 className="text-xl font-semibold text-lincoln mb-4">Add Payment</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="tenant_id"
            placeholder="Tenant ID"
            value={form.tenant_id}
            onChange={handleChange}
            className="w-full p-3 border border-lincoln30 rounded-xl focus:outline-none focus:ring-2 focus:ring-avocado"
            required
          />
          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={form.amount}
            onChange={handleChange}
            className="w-full p-3 border border-lincoln30 rounded-xl focus:outline-none focus:ring-2 focus:ring-avocado"
            required
          />
          <input
            type="date"
            name="payment_date"
            value={form.payment_date}
            onChange={handleChange}
            className="w-full p-3 border border-lincoln30 rounded-xl focus:outline-none focus:ring-2 focus:ring-avocado"
            required
          />
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full p-3 border border-lincoln30 rounded-xl focus:outline-none focus:ring-2 focus:ring-avocado"
          >
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
          </select>

          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={() => navigate("/payments")}
              className="px-4 py-2 bg-smoky20 text-lincoln rounded-xl hover:bg-lincoln30 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-lincoln text-white rounded-xl hover:bg-avocado transition-all"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
