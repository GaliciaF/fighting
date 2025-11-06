import React from "react";

const schedule = [
  { day: "Monday", rooms: "101, 102, 103", staff: "Anna Dela Cruz" },
  { day: "Tuesday", rooms: "104, 105, 201", staff: "Mark Reyes" },
  { day: "Wednesday", rooms: "202, 203, 204", staff: "Liza Gomez" },
  { day: "Thursday", rooms: "205, 206, 207", staff: "Carlo Santos" },
  { day: "Friday", rooms: "208, 209, 210", staff: "Rhea Cruz" },
];

export default function CleaningSchedule() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-smoky">Cleaning Schedule</h1>

      <div className="bg-lincoln20 border border-lincoln/20 rounded-2xl shadow-card overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-lincoln30 text-background">
            <tr>
              <th className="py-3 px-4">Day</th>
              <th className="py-3 px-4">Rooms</th>
              <th className="py-3 px-4">Assigned Staff</th>
            </tr>
          </thead>
          <tbody>
            {schedule.map((s, i) => (
              <tr key={i} className="border-t hover:bg-lincoln30 transition-colors duration-200">
                <td className="py-2 px-4 font-medium">{s.day}</td>
                <td className="py-2 px-4">{s.rooms}</td>
                <td className="py-2 px-4">{s.staff}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
