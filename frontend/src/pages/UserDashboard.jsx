import { useState } from "react";
import { CreditCard, Megaphone, Brush, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function UserDashboard() {
  const [active, setActive] = useState("payments");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("email");
    navigate("/login");
  };

  const menuItems = [
    { id: "payments", label: "Payment History", icon: <CreditCard size={18} /> },
    { id: "announcements", label: "Announcements", icon: <Megaphone size={18} /> },
    { id: "cleaning", label: "Cleaning Schedule", icon: <Brush size={18} /> },
  ];

  const payments = [
    { date: "Oct 10, 2025", amount: "₱3,000", status: "Paid" },
    { date: "Sep 10, 2025", amount: "₱3,000", status: "Paid" },
  ];

  const announcements = [
    { title: "Water Maintenance", color: "lincoln", content: "Water supply will be temporarily unavailable on October 21, 2025, from 8AM to 12PM." },
    { title: "WiFi Upgrade", color: "avocado", content: "The boarding house WiFi will be upgraded this weekend for faster internet speed." },
  ];

  const cleaningSchedule = [
    { day: "Monday", rooms: "Room 1–3" },
    { day: "Tuesday", rooms: "Room 4–6" },
    { day: "Wednesday", rooms: "Room 7–9" },
    { day: "Thursday", rooms: "Common Area" },
    { day: "Friday", rooms: "Kitchen & Restrooms" },
  ];

  return (
    <div className="flex min-h-screen bg-lincoln/10">
      {/* Sidebar */}
      <aside className="w-64 bg-white/95 backdrop-blur-lg border-r border-lincoln/30 p-6 flex flex-col justify-between shadow-lg rounded-r-2xl">
        <div className="space-y-8">
          <h1 className="text-2xl font-bold text-lincoln">Tenant's Dashboard</h1>
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActive(item.id)}
                className={`flex items-center gap-3 w-full px-4 py-3 rounded-2xl font-medium transition-all duration-200 ${
                  active === item.id
                    ? "bg-lincoln text-white shadow-md"
                    : "text-gray-600 hover:text-lincoln hover:bg-lincoln/10"
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Logout */}
<button
  onClick={handleLogout}
  className="flex items-center gap-2 px-4 py-3 bg-lincoln text-white rounded-2xl hover:bg-lincoln/80 shadow-md transition-all"
>
  <LogOut size={16} />
  Logout
</button>

      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 space-y-8 overflow-y-auto">
        {active === "payments" && (
          <section>
            <h2 className="text-3xl font-bold mb-6 text-lincoln">Payment History</h2>
            <div className="bg-lincoln20 border border-lincoln/20 rounded-2xl shadow-card overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-lincoln30 text-background">
                  <tr>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4">Amount</th>
                    <th className="py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((p, i) => (
                    <tr key={i} className="border-t hover:bg-lincoln30 transition-colors duration-200">
                      <td className="py-2 px-4 font-medium">{p.date}</td>
                      <td className="py-2 px-4">{p.amount}</td>
                      <td className={`py-2 px-4 font-medium ${p.status === "Paid" ? "text-green-600" : "text-red-600"}`}>{p.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {active === "announcements" && (
          <section>
            <h2 className="text-3xl font-bold mb-6 text-lincoln">Announcements</h2>
            <div className="grid gap-4">
              {announcements.map((a, i) => (
                <div
                  key={i}
                  className={`bg-${a.color}20 border border-${a.color}/20 rounded-2xl shadow-card p-5 hover:shadow-md transition-shadow`}
                >
                  <h3 className={`font-semibold text-${a.color} mb-1`}>{a.title}</h3>
                  <p className="text-gray-600 text-sm">{a.content}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {active === "cleaning" && (
          <section>
            <h2 className="text-3xl font-bold mb-6 text-lincoln">Cleaning Schedule</h2>
            <div className="bg-lincoln20 border border-lincoln/20 rounded-2xl shadow-card overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-lincoln30 text-background">
                  <tr>
                    <th className="py-3 px-4">Day</th>
                    <th className="py-3 px-4">Rooms</th>
                  </tr>
                </thead>
                <tbody>
                  {cleaningSchedule.map((c, i) => (
                    <tr key={i} className="border-t hover:bg-lincoln30 transition-colors duration-200">
                      <td className="py-2 px-4 font-medium">{c.day}</td>
                      <td className="py-2 px-4">{c.rooms}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
