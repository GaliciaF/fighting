import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UserRegister() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    alert("Registered successfully!");
    navigate("/user-login");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-lincoln/5 via-avocado/5 to-smoky/5">
      <div className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-avocado mb-6">
          Tenant Registration
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            type="text"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-lg p-3 focus:ring-2 focus:ring-avocado outline-none"
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-lg p-3 focus:ring-2 focus:ring-avocado outline-none"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-lg p-3 focus:ring-2 focus:ring-avocado outline-none"
          />
          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-lg p-3 focus:ring-2 focus:ring-avocado outline-none"
          />
          <button
            type="submit"
            className="w-full bg-avocado text-white py-3 rounded-lg hover:bg-avocado/90 transition"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
