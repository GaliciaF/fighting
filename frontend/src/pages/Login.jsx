import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  

    // Example login logic — replace with real backend validation later
    if (email === "admin@gmail.com" && password === "admin123") {
      localStorage.setItem("role", "admin");
      navigate("/dashboard"); // Redirect to admin panel
      return;
    } else if (email === "user@gmail.com" && password === "user123") {
      localStorage.setItem("role", "user");
      navigate("/user/dashboard"); // Redirect to user panel
      return;
    } else {
      alert("Invalid credentials. Try admin@gmail.com/admin123 or user@gmail.com/user123");
      return;
    }
    try {
      const res = await api.post('/login', { email, password });
      localStorage.setItem('token', res.data.token);
      alert('Login successful!');
    } catch (err) {
      console.error(err);
      alert('Login failed');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-lincoln/5 via-avocado/5 to-smoky/3">
      <div className="bg-white/80 p-10 rounded-2xl shadow-card w-full max-w-md backdrop-blur-md">
        <h1 className="text-3xl font-bold text-center text-lincoln mb-6">Login</h1>

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
            className="w-full bg-lincoln text-white py-3 rounded-xl hover:bg-lincoln30 transition-colors"
          >
          
            Login
          </button>
        </form>

        {/* Register link */}
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
        </p>
      </div>
    </div>
  );
}
