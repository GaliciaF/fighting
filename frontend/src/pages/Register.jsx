import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "tenant", // default role for registration
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Retrieve mock users
    const users = JSON.parse(localStorage.getItem("mockUsers")) || [];

    // Check if user already exists
    if (users.some((u) => u.email === form.email)) {
      alert("User already exists. Please log in instead.");
      navigate("/login");
      return;
    }

    // Add user
    const newUser = {
      name: form.name,
      email: form.email,
      password: form.password,
      role: form.role,
    };
    localStorage.setItem("mockUsers", JSON.stringify([...users, newUser]));

    alert("Registration successful!");
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-lincoln/5 via-avocado/5 to-smoky/3">
      <div className="bg-white/90 shadow-xl rounded-2xl p-10 w-96 backdrop-blur">
        <h2 className="text-2xl font-bold text-center text-lincoln mb-6">
          Register
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-avocado"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-avocado"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-avocado"
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-avocado"
            required
          />

         

          <button
            type="submit"
            className="w-full bg-avocado text-white py-2 rounded-lg hover:bg-avocado/90 transition"
          >
            Register
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-lincoln font-semibold hover:underline"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
