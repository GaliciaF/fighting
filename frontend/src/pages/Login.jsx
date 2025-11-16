import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [securityAnswer, setSecurityAnswer] = useState("");
  const [showSecurityQuestion, setShowSecurityQuestion] = useState(false); // controls field visibility
  const navigate = useNavigate();

  // Predefined admin/staff emails for demo
  const adminStaffEmails = ["admin@gmail.com", "staff@gmail.com"];

  const handleEmailChange = (e) => {
    const value = e.target.value.toLowerCase();
    setEmail(value);

    // Show security question only for admin/staff
    setShowSecurityQuestion(adminStaffEmails.includes(value));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/login", {
        email,
        password,
        security_answer: showSecurityQuestion ? securityAnswer : undefined,
      });

      const user = res.data.user;

      localStorage.setItem("role", user.role);
      localStorage.setItem("userId", user.id);

      if (user.role === "admin") navigate("/dashboard");
      else if (user.role === "staff") navigate("/staff/dashboard");
      else navigate("/user/dashboard");
    } catch (err) {
      console.error(err);
      alert(
        err.response?.data?.error ||
          "Login failed. Make sure your credentials are correct."
      );
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left side - branding */}
      <div className="w-1/2 bg-lincoln text-white flex flex-col justify-center items-center p-10">
        <h1 className="text-5xl font-bold mb-4">JBRC Boarding House</h1>
        <p className="text-lg text-white/80 text-center">
          Welcome to JBRC Boarding House! Please login to access your dashboard.
        </p>
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
                onChange={handleEmailChange}
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

            {showSecurityQuestion && (
              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Favorite Color (Admin/Staff Only)
                </label>
                <input
                  type="text"
                  value={securityAnswer}
                  onChange={(e) => setSecurityAnswer(e.target.value)}
                  className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-lincoln outline-none"
                  placeholder="Enter your favorite color"
                  required
                />
              </div>
            )}

            <button
              type="submit"
              className="bg-lincoln w-full text-white py-3 rounded-xl hover:bg-lincoln30 transition-colors"
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
            Demo accounts:
            <br />
            <span className="font-medium text-lincoln">Admin:</span> admin@gmail.com / admin123 / green
            <br />
            <span className="font-medium text-lincoln">Staff:</span> staff@gmail.com / staff123 / blue
            <br />
            <span className="font-medium text-lincoln">User:</span> user@gmail.com / user123
          </p>
        </div>
      </div>
    </div>
  );
}
