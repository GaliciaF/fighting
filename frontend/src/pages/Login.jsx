import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // 🔥 First try Laravel API login
      const res = await api.post("/login", {
        email,
        password,
      });

      // Save user data
      localStorage.setItem("role", res.data.user.role);
      localStorage.setItem("userId", res.data.user.id);

      // Redirect based on database role
      if (res.data.user.role === "admin") {
        navigate("/dashboard");
      } else if (res.data.user.role === "user") {
        navigate("/user/dashboard");
      } else if (res.data.user.role === "staff") {
        navigate("/staff/dashboard");
      } else {
        navigate("/dashboard");
      }

      return;
    } catch (error) {
      console.warn("API login failed. Trying demo login...");
    }

    // 🔥 DEMO ACCOUNT FALLBACK
    if (email === "admin@gmail.com" && password === "admin123") {
      localStorage.setItem("role", "admin");
      navigate("/dashboard");
      return;
    } else if (email === "user@gmail.com" && password === "user123") {
      localStorage.setItem("role", "user");
      navigate("/user/dashboard");
      return;
    } else if (email === "staff@gmail.com" && password === "staff123") {
      localStorage.setItem("role", "staff");
      navigate("/staff/dashboard");
      return;
    } else {
      alert(
        "Invalid credentials.\nTry demo accounts:\nAdmin: admin@gmail.com / admin123\nUser: user@gmail.com / user123\nStaff: staff@gmail.com / staff123"
      );
    }
  };

  const roleColor = "bg-lincoln";

  return (
    <div className="flex h-screen">
      {/* Left side - branding */}
      <div className="w-1/2 bg-lincoln text-white flex flex-col justify-center items-center p-10">
        <h1 className="text-5xl font-bold mb-4">JBRC Boarding House</h1>
        <p className="text-lg text-white/80 text-center">
          Welcome to JBRC Boarding House! Please login to access your dashboard.
        </p>

        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80"
          alt="Boarding House"
          className="mt-8 rounded-xl shadow-lg"
        />
      </div>

      {/* Right side - login form */}
      <div className="w-1/2 flex items-center justify-center bg-gray-50">
        <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-md">
          <h2 className="text-3xl font-bold text-lincoln mb-6 text-center">
            Login
          </h2>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-lincoln outline-none"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-lincoln outline-none"
                placeholder="Enter your password"
                required
              />
            </div>

            <button
              type="submit"
              className={`${roleColor} w-full text-white py-3 rounded-xl hover:bg-lincoln30 transition-colors`}
            >
              Login
            </button>
          </form>

          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <button
                onClick={() => navigate("/register")}
                className="text-lincoln font-medium hover:underline"
              >
                Register here
              </button>
            </p>
          </div>

          <p className="text-center text-sm text-gray-600 mt-6">
            Try demo accounts:
            <br />
            <span className="font-medium text-lincoln">Admin:</span> admin@gmail.com / admin123
            <br />
            <span className="font-medium text-lincoln">User:</span> user@gmail.com / user123
            <br />
            <span className="font-medium text-lincoln">Staff:</span> staff@gmail.com / staff123
          </p>
        </div>
      </div>
    </div>
  );
}
