import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Demo login logic
    if (email === "admin@gmail.com" && password === "admin123") {
      localStorage.setItem("role", "admin");
      navigate("/dashboard"); // Admin panel
      return;
    } else if (email === "user@gmail.com" && password === "user123") {
      localStorage.setItem("role", "user");
      navigate("/user/dashboard"); // User panel
      return;
    } else if (email === "staff@gmail.com" && password === "staff123") {
      localStorage.setItem("role", "staff");
      navigate("/staff/dashboard"); // Staff panel
      return;
    } else {
      alert(
        "Invalid credentials. Try demo accounts:\nAdmin: admin@gmail.com / admin123\nUser: user@gmail.com / user123\nStaff: staff@gmail.com / staff123"
      );
      return;
    }
  };

  // Role-specific button color example (can expand later)
  const roleColor = "bg-lincoln"; // Keep consistent for demo login button

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
  );
}
