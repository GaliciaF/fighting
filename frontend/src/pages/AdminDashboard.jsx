import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const occupancyData = [
  { month: "Jan", value: 80 },
  { month: "Feb", value: 90 },
  { month: "Mar", value: 85 },
  { month: "Apr", value: 95 },
  { month: "May", value: 92 },
  { month: "Jun", value: 88 },
];

const roomTypes = [
  { name: "Single", value: 40, color: "#A78BFA" },
  { name: "Double", value: 35, color: "#38BDF8" },
  { name: "Triple", value: 20, color: "#FACC15" },
  { name: "Suite", value: 5, color: "#FB7185" },
];

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-smoky">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { title: "Total Rooms", value: "48", sub: "45 occupied, 3 available" },
          { title: "Active Tenants", value: "67", sub: "+3 from last month" },
          { title: "Monthly Revenue", value: "14,200", sub: "+₱400 from last month" },
          { title: "Pending Issues", value: "8", sub: "3 maintenance, 5 payments" },
        ].map((card) => (
          <div key={card.title} className="bg-lincoln20 border border-lincoln/20 rounded-2xl shadow-card p-6 hover:bg-lincoln30 transition-colors duration-200">
            <h3 className="text-smoky/70 text-sm">{card.title}</h3>
            <p className="text-2xl font-semibold text-smoky mt-2">{card.value}</p>
            <p className="text-smoky/80 text-sm mt-1">{card.sub}</p>
          </div>
        ))}
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
              <Bar dataKey="value" fill="#265902" radius={[6,6,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-lincoln20 border border-lincoln/20 rounded-2xl shadow-card p-6 hover:bg-lincoln30 transition-colors duration-200">
          <h3 className="text-lg font-semibold text-smoky mb-3">Room Type Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={roomTypes} dataKey="value" nameKey="name" innerRadius={60} outerRadius={100}>
                {roomTypes.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
