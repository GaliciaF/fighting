import React from "react";
import { CreditCard, User, Megaphone, LogOut } from "lucide-react";
import { useNavigate, NavLink } from "react-router-dom";

export default function UserPayments() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("email");
    localStorage.removeItem("name");
    navigate("/login");
  };

  const menuItems = [
    { id: "profile", label: "My Profile", icon: <User size={18} />, path: "/user/profile" },
    { id: "payments", label: "Payment History", icon: <CreditCard size={18} />, path: "/user/payments" },
    { id: "announcements", label: "Announcements", icon: <Megaphone size={18} />, path: "/user/announcements" },
  ];

  const payments = [
    { date: "Oct 10, 2025", amount: "₱1,000", status: "Paid" },
    { date: "Sep 10, 2025", amount: "₱1,000", status: "Paid" },
  ];

  return (
    <div className="flex min-h-screen bg-blueYonder/10">
      {/* Sidebar */}
      <aside className="w-64 bg-oxfordBlue text-white p-6 flex flex-col justify-between shadow-lg rounded-r-2xl">
        <div className="space-y-8">
          <h1 className="text-2xl font-bold text-metallicPink">Tenant Dashboard</h1>
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <NavLink
                key={item.id}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 w-full px-4 py-3 rounded-2xl font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-antiqueFuchsia text-white shadow-md"
                      : "text-blue-100 hover:bg-bdazzledBlue/40 hover:text-white"
                  }`
                }
              >
                {item.icon} {item.label}
              </NavLink>
            ))}
          </nav>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-3 bg-antiqueFuchsia text-white rounded-2xl hover:bg-antiqueFuchsia/80 shadow-md transition-all"
        >
          <LogOut size={16} /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 space-y-8 overflow-y-auto">
        <h2 className="text-3xl font-bold mb-6 text-oxfordBlue">Payment History</h2>
        <div className="bg-white border border-bdazzledBlue/20 rounded-2xl shadow-lg overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-bdazzledBlue text-white">
              <tr>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p, i) => (
                <tr key={i} className="border-t hover:bg-blueYonder/10 transition-colors duration-200">
                  <td className="py-2 px-4 font-medium">{p.date}</td>
                  <td className="py-2 px-4">{p.amount}</td>
                  <td className={`py-2 px-4 font-medium ${p.status === "Paid" ? "text-green-600" : "text-red-600"}`}>
                    {p.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
