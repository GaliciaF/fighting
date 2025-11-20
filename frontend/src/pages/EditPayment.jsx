import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";

export default function EditPayment() {
  const navigate = useNavigate();
  const { id } = useParams(); // Get payment ID from URL
  const [tenants, setTenants] = useState([]);
  const [form, setForm] = useState({
    tenant_id: "",
    amount: "",
    payment_date: "",
    status: "Paid",
  });
  const [loading, setLoading] = useState(true);

  // Fetch tenants for dropdown
  useEffect(() => {
    const fetchTenants = async () => {
      try {
        const res = await api.get("/tenants");
        setTenants(res.data); // expects [{id, name}, ...]
      } catch (err) {
        console.error("Failed to load tenants", err);
      }
    };
    fetchTenants();
  }, []);

  // Fetch payment data to edit
  useEffect(() => {
    if (!id) return;
    const fetchPayment = async () => {
      try {
        const res = await api.get(`/payments/${id}`);
        setForm({
          tenant_id: res.data.tenant_id,
          amount: res.data.amount,
          payment_date: res.data.payment_date,
          status: res.data.status,
        });
      } catch (err) {
        console.error("Failed to load payment", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPayment();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/payments/${id}`, form); // Update payment
      alert("Payment updated!");
      navigate("/payments");
    } catch (err) {
      console.error(err);
      alert("Failed to update payment.");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-6 flex flex-col items-center">
      <div className="bg-lincoln20 p-6 rounded-2xl shadow-card w-full max-w-lg">
        <h2 className="text-xl font-semibold text-lincoln mb-4">Edit Payment</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Tenant Dropdown */}
          <select
            name="tenant_id"
            value={form.tenant_id}
            onChange={handleChange}
            className="w-full p-3 border border-lincoln30 rounded-xl focus:outline-none focus:ring-2 focus:ring-avocado"
            required
          >
            <option value="">Select Tenant</option>
            {tenants.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>

          {/* Amount */}
          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={form.amount}
            onChange={handleChange}
            className="w-full p-3 border border-lincoln30 rounded-xl focus:outline-none focus:ring-2 focus:ring-avocado"
            required
          />

          {/* Payment Date */}
          <input
            type="date"
            name="payment_date"
            value={form.payment_date}
            onChange={handleChange}
            className="w-full p-3 border border-lincoln30 rounded-xl focus:outline-none focus:ring-2 focus:ring-avocado"
            required
          />

          {/* Status */}
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full p-3 border border-lincoln30 rounded-xl focus:outline-none focus:ring-2 focus:ring-avocado"
          >
            <option value="Paid">Paid</option>
            <option value="Pending">Unpaid</option>
          </select>

          {/* Buttons */}
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
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
