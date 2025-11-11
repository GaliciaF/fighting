import { useState, useEffect } from "react";
import { CreditCard, Megaphone, User, LogOut, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function UserDashboard() {
  const [active, setActive] = useState("profile");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("email");
    navigate("/login");
  };

  const [tenant, setTenant] = useState({
    name: "",
    email: "",
    room: "",
    contact: "",
    profilePic: null,
  });

  const [preview, setPreview] = useState(null);

  // 🧠 Fetch tenant profile from backend (adjust API URL as needed)
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const email = localStorage.getItem("email");
        const res = await axios.get(`http://localhost:8000/api/tenant/${email}`);
        setTenant(res.data);
        if (res.data.profilePic) setPreview(res.data.profilePic);
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTenant({ ...tenant, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setTenant({ ...tenant, profilePic: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("name", tenant.name);
      formData.append("email", tenant.email);
      formData.append("room", tenant.room);
      formData.append("contact", tenant.contact);
      if (tenant.profilePic) {
        formData.append("profilePic", tenant.profilePic);
      }

      await axios.post("http://localhost:8000/api/tenant/update", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("Failed to update profile.");
    }
  };

  const menuItems = [
    { id: "profile", label: "My Profile", icon: <User size={18} /> },
    { id: "payments", label: "Payment History", icon: <CreditCard size={18} /> },
    { id: "announcements", label: "Announcements", icon: <Megaphone size={18} /> },
  ];

  const payments = [
    { date: "Oct 10, 2025", amount: "₱3,000", status: "Paid" },
    { date: "Sep 10, 2025", amount: "₱3,000", status: "Paid" },
  ];

  const announcements = [
    {
      title: "Water Maintenance",
      content: "Water supply will be temporarily unavailable on October 21, 2025, from 8AM to 12PM.",
    },
    {
      title: "WiFi Upgrade",
      content: "The boarding house WiFi will be upgraded this weekend for faster internet speed.",
    },
  ];

  return (
    <div className="flex min-h-screen bg-blueYonder/10">
      {/* Sidebar */}
      <aside className="w-64 bg-oxfordBlue text-white p-6 flex flex-col justify-between shadow-lg rounded-r-2xl">
        <div className="space-y-8">
          <h1 className="text-2xl font-bold text-metallicPink">Tenant Dashboard</h1>
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActive(item.id)}
                className={`flex items-center gap-3 w-full px-4 py-3 rounded-2xl font-medium transition-all duration-200 ${
                  active === item.id
                    ? "bg-antiqueFuchsia text-white shadow-md"
                    : "text-blue-100 hover:bg-bdazzledBlue/40 hover:text-white"
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
          className="flex items-center gap-2 px-4 py-3 bg-antiqueFuchsia text-white rounded-2xl hover:bg-antiqueFuchsia/80 shadow-md transition-all"
        >
          <LogOut size={16} />
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 space-y-8 overflow-y-auto">
        {active === "profile" && (
          <section>
            <h2 className="text-3xl font-bold mb-6 text-oxfordBlue">My Profile</h2>
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-bdazzledBlue/20 max-w-xl">
              <div className="flex flex-col items-center space-y-4 mb-6">
                <div className="relative">
                  <img
                    src={preview || "/default-avatar.png"}
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover border-4 border-antiqueFuchsia shadow-md"
                  />
                  <label
                    htmlFor="profilePic"
                    className="absolute bottom-0 right-0 bg-antiqueFuchsia p-2 rounded-full cursor-pointer hover:bg-antiqueFuchsia/80 transition-all"
                  >
                    <Upload size={16} color="#fff" />
                    <input
                      type="file"
                      id="profilePic"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-bdazzledBlue mb-1">Full Name</label>
                  <input
                    name="name"
                    value={tenant.name}
                    onChange={handleChange}
                    className="w-full border border-blueYonder/40 rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-antiqueFuchsia"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-bdazzledBlue mb-1">Email</label>
                  <input
                    name="email"
                    value={tenant.email}
                    onChange={handleChange}
                    className="w-full border border-blueYonder/40 rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-antiqueFuchsia"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-bdazzledBlue mb-1">Room Number</label>
                  <input
                    name="room"
                    value={tenant.room}
                    onChange={handleChange}
                    className="w-full border border-blueYonder/40 rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-antiqueFuchsia"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-bdazzledBlue mb-1">Contact Number</label>
                  <input
                    name="contact"
                    value={tenant.contact}
                    onChange={handleChange}
                    className="w-full border border-blueYonder/40 rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-antiqueFuchsia"
                  />
                </div>

                <button
                  onClick={handleSave}
                  className="w-full mt-4 bg-antiqueFuchsia text-white font-medium py-2 rounded-xl hover:bg-antiqueFuchsia/80 transition-all"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </section>
        )}

        {active === "payments" && (
          <section>
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
            <h2 className="text-3xl font-bold mb-6 text-oxfordBlue">Announcements</h2>
            <div className="grid gap-4">
              {announcements.map((a, i) => (
                <div
                  key={i}
                  className="bg-blueYonder/10 border border-blueYonder/30 rounded-2xl shadow-md p-5 hover:bg-blueYonder/20 transition"
                >
                  <h3 className="font-semibold text-antiqueFuchsia mb-1">{a.title}</h3>
                  <p className="text-gray-700 text-sm">{a.content}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
