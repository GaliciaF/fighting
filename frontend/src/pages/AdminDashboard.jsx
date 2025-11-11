import React from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Home, BedDouble, Users, CreditCard, LogOut, Megaphone } from "lucide-react";

const occupancyData = [
  { month: "Jan", value: 80 },
  { month: "Feb", value: 90 },
  { month: "Mar", value: 85 },
  { month: "Apr", value: 95 },
  { month: "May", value: 92 },
  { month: "Jun", value: 88 },
];

const roomTypes = [
  { name: "Bedspacer", value: 75, color: "#A78BFA" },
  { name: "Private", value: 25, color: "#38BDF8" }
];

const menuItems = [
  { name: "Dashboard", icon: <Home size={18} />, path: "/dashboard" },
  { name: "Rooms", icon: <BedDouble size={18} />, path: "/roommanagement" },
  { name: "Tenants", icon: <Users size={18} />, path: "/tenants" },
  { name: "Payments", icon: <CreditCard size={18} />, path: "/payments" },
];

export default function AdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-background text-smoky">
      {/* Sidebar */}
      <aside className="w-64 bg-lincoln p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-bold text-background mb-8">BoardingHouse</h2>
          <nav className="space-y-3">
            {menuItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 p-3 rounded-lg font-semibold hover:bg-avocado transition ${
                    isActive ? "bg-avocado text-background" : "text-background"
                  }`
                }
              >
                {item.icon} {item.name}
              </NavLink>
            ))}
          </nav>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 p-3 rounded-lg bg-lime20 hover:bg-avocado text-smoky font-semibold transition"
        >
          <LogOut size={18} /> Logout
        </button>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 space-y-8">
        <h1 className="text-3xl font-bold text-smoky">Dashboard</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { title: "Total Rooms", value: "48", sub: "45 occupied, 3 available" },
            { title: "Active Tenants", value: "67", sub: "+3 from last month" },
            { title: "Monthly Revenue", value: "14,200", sub: "+₱400 from last month" },
            { title: "Pending Issues", value: "8", sub: "3 maintenance, 5 payments" },
          ].map((card) => (
            <div
              key={card.title}
              className="bg-lincoln20 border border-lincoln/20 rounded-2xl shadow-card p-6 hover:bg-lincoln30 transition-colors duration-200"
            >
              <h3 className="text-smoky/70 text-sm">{card.title}</h3>
              <p className="text-2xl font-semibold text-smoky mt-2">{card.value}</p>
              <p className="text-smoky/80 text-sm mt-1">{card.sub}</p>
            </div>
          ))}
        </div>
          {/* Announcements Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            onClick={() => navigate("/announcements")}
            className="bg-lincoln20 border border-lincoln/20 p-6 rounded-2xl shadow-card hover:bg-lincoln30 cursor-pointer transition-colors duration-200 flex flex-col justify-between"
          >
            <div className="flex items-center gap-2">
              <Megaphone size={24} className="text-avocado" />
              <h3 className="text-lg font-semibold text-smoky">Announcements</h3>
            </div>
            <p className="text-smoky/80 mt-2">Click to view and manage announcements</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-lincoln20 border border-lincoln/20 rounded-2xl shadow-card p-6 hover:bg-lincoln30 transition-colors duration-200">
            <h3 className="text-lg font-semibold text-smoky mb-3">Occupancy Trends</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={occupancyData}>
                <XAxis dataKey="month" stroke="#092601" />
                <YAxis stroke="#092601" />
                <Tooltip />
                <Bar dataKey="value" fill="#265902" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-lincoln20 border border-lincoln/20 rounded-2xl shadow-card p-6 hover:bg-lincoln30 transition-colors duration-200">
            <h3 className="text-lg font-semibold text-smoky mb-3">Room Type Distribution</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={roomTypes}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={60}
                  outerRadius={100}
                >
                  {roomTypes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

      
      </main>
    </div>
  );
}
