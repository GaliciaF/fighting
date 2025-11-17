import React, { useEffect, useState } from "react";
import { User, LogOut, Upload, CreditCard, Megaphone, Home } from "lucide-react";
import { useNavigate, NavLink } from "react-router-dom";
import axios from "axios";

export default function UserProfile() {
  const navigate = useNavigate();
  const [tenant, setTenant] = useState({
    name: "",
    email: "",
    room: "",
    contact: "",
    profilePic: null,
  });
  const [preview, setPreview] = useState(null);

  // Fetch tenant profile by ID
  useEffect(() => {
    const fetchProfile = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) return navigate("/login");

      try {
        const res = await axios.get(`http://localhost:8000/api/tenants/${userId}`);
        setTenant(res.data);
        if (res.data.profilePic) setPreview(`http://localhost:8000/storage/${res.data.profilePic}`);
      } catch (err) {
        console.error("AxiosError", err);
        alert("Failed to fetch profile. Please try again.");
      }
    };
    fetchProfile();
  }, [navigate]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTenant({ ...tenant, [name]: value });
  };

  // Handle profile picture upload preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setTenant({ ...tenant, profilePic: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  // Save tenant profile
  const handleSave = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const formData = new FormData();
      formData.append("name", tenant.name);
      formData.append("email", tenant.email);
      formData.append("room", tenant.room);
      formData.append("contact", tenant.contact);
      if (tenant.profilePic) formData.append("profilePic", tenant.profilePic);

      await axios.put(`http://localhost:8000/api/tenants/${userId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to update profile.");
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: <Home size={18} />, path: "/user/dashboard" },
    { id: "profile", label: "My Profile", icon: <User size={18} />, path: "/user/profile" },
    { id: "payments", label: "Payment History", icon: <CreditCard size={18} />, path: "/user/payments" },
    { id: "announcements", label: "Announcements", icon: <Megaphone size={18} />, path: "/user/announcements" },
  ];

  return (
    <div className="flex min-h-screen bg-blueYonder/10">
      {/* Sidebar */}
      <aside className="w-64 bg-oxfordBlue text-white p-6 flex flex-col justify-between shadow-lg rounded-r-2xl">
        <div className="space-y-8">
          <h1
            className="text-2xl font-bold text-metallicPink cursor-pointer"
            onClick={() => navigate("/user/dashboard")}
          >
            Tenant Dashboard
          </h1>
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
            {["name", "email", "room", "contact"].map((field) => (
              <div key={field}>
                <label className="block text-sm font-medium text-bdazzledBlue mb-1">
                  {field === "name"
                    ? "Full Name"
                    : field === "room"
                    ? "Room Number"
                    : field === "contact"
                    ? "Contact Number"
                    : "Email"}
                </label>
                <input
                  name={field}
                  value={tenant[field]}
                  onChange={handleChange}
                  className="w-full border border-blueYonder/40 rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-antiqueFuchsia"
                />
              </div>
            ))}

            <button
              onClick={handleSave}
              className="w-full mt-4 bg-antiqueFuchsia text-white font-medium py-2 rounded-xl hover:bg-antiqueFuchsia/80 transition-all"
            >
              Save Changes
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
