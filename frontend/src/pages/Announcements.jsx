import React, { useState } from "react"; 
import { useNavigate, NavLink } from "react-router-dom";
import { Pencil, Plus, Trash, Home, BedDouble, Users, CreditCard, LogOut, Megaphone } from "lucide-react";

// Sample initial data
const initialAnnouncements = [
  {
    id: 1,
    title: "Water Supply Interruption",
    content: "Water will be cut off tomorrow from 8 AM to 2 PM.",
    date: "Nov 11, 2025",
    comments: [
      { id: 1, text: "Thanks for the heads up!" },
      { id: 2, text: "Will it affect all rooms?" },
    ],
  },
  {
    id: 2,
    title: "Maintenance Schedule",
    content: "Lobby lights will be repaired this weekend.",
    date: "Nov 10, 2025",
    comments: [],
  },
];

const menuItems = [
  { name: "Dashboard", icon: <Home size={18} />, path: "/dashboard" },
  { name: "Rooms", icon: <BedDouble size={18} />, path: "/roommanagement" },
  { name: "Tenants", icon: <Users size={18} />, path: "/tenants" },
  { name: "Payments", icon: <CreditCard size={18} />, path: "/payments" },
];

export default function Announcements() {
  const navigate = useNavigate();
  const [announcements, setAnnouncements] = useState(initialAnnouncements);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");
  const [editingContent, setEditingContent] = useState("");

  // Add new announcement
  const handleAddAnnouncement = () => {
    if (!newTitle || !newContent) return;
    const newAnnouncement = {
      id: Date.now(),
      title: newTitle,
      content: newContent,
      date: new Date().toLocaleDateString(),
      comments: [],
    };
    setAnnouncements([newAnnouncement, ...announcements]);
    setNewTitle("");
    setNewContent("");
  };

  // Edit existing announcement
  const handleEditAnnouncement = (id) => {
    setEditingId(id);
    const ann = announcements.find((a) => a.id === id);
    setEditingTitle(ann.title);
    setEditingContent(ann.content);
  };

  const handleSaveEdit = () => {
    setAnnouncements(
      announcements.map((a) =>
        a.id === editingId
          ? { ...a, title: editingTitle, content: editingContent }
          : a
      )
    );
    setEditingId(null);
    setEditingTitle("");
    setEditingContent("");
  };

  // Delete announcement
  const handleDeleteAnnouncement = (id) => {
    if (window.confirm("Are you sure you want to delete this announcement?")) {
      setAnnouncements(announcements.filter((a) => a.id !== id));
    }
  };

  // Reply to comment
  const handleReplyComment = (announcementId, text) => {
    if (!text) return;
    setAnnouncements(
      announcements.map((a) =>
        a.id === announcementId
          ? {
              ...a,
              comments: [...a.comments, { id: Date.now(), text }],
            }
          : a
      )
    );
  };

  const handleLogout = () => {
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-background text-smoky">
      {/* Sidebar */}
      <aside className="w-64 bg-lincoln p-6 flex flex-col justify-between">
        <div>
          <h2
            className="text-xl font-bold text-background mb-8 cursor-pointer"
            onClick={() => navigate("/dashboard")}
          >
            BoardingHouse
          </h2>
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
        <h1 className="text-3xl font-bold text-smoky mb-4">Announcements</h1>

        {/* Add new announcement */}
        <div className="bg-lincoln20 border border-lincoln/20 p-6 rounded-2xl shadow-card space-y-3">
          <h3 className="text-lg font-semibold text-smoky">Add Announcement</h3>
          <input
            type="text"
            placeholder="Title"
            className="border p-2 rounded w-full focus:ring-2 focus:ring-avocado outline-none"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <textarea
            placeholder="Content"
            className="border p-2 rounded w-full focus:ring-2 focus:ring-avocado outline-none"
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
          />
          <button
            onClick={handleAddAnnouncement}
            className="bg-avocado text-background px-4 py-2 rounded hover:bg-lincoln50 transition"
          >
            <Plus size={16} className="inline mr-1" /> Add
          </button>
        </div>

        {/* List of announcements */}
        <div className="space-y-6">
          {announcements.map((ann) => (
            <div
              key={ann.id}
              className="bg-lincoln20 border border-lincoln/20 p-6 rounded-2xl shadow-card space-y-3"
            >
              {editingId === ann.id ? (
                <>
                  <input
                    type="text"
                    className="border p-2 rounded w-full focus:ring-2 focus:ring-avocado outline-none"
                    value={editingTitle}
                    onChange={(e) => setEditingTitle(e.target.value)}
                  />
                  <textarea
                    className="border p-2 rounded w-full focus:ring-2 focus:ring-avocado outline-none"
                    value={editingContent}
                    onChange={(e) => setEditingContent(e.target.value)}
                  />
                  <button
                    onClick={handleSaveEdit}
                    className="bg-avocado text-background px-4 py-2 rounded hover:bg-lincoln50 transition"
                  >
                    Save
                  </button>
                </>
              ) : (
                <>
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-semibold text-smoky">{ann.title}</h3>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditAnnouncement(ann.id)}
                        className="hover:text-avocado"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteAnnouncement(ann.id)}
                        className="hover:text-red-500"
                      >
                        <Trash size={16} />
                      </button>
                    </div>
                  </div>
                  <p className="text-smoky/80">{ann.content}</p>
                  <p className="text-xs text-smoky/50">{ann.date}</p>

                  {/* Display comments and reply */}
                  {ann.comments.length > 0 && (
                    <div className="mt-2 space-y-2">
                      <h4 className="font-semibold text-smoky">Comments</h4>
                      {ann.comments.map((c) => (
                        <p
                          key={c.id}
                          className="text-smoky/80 px-3 py-1 bg-smoky20 rounded"
                        >
                          {c.text}
                        </p>
                      ))}
                      <CommentReplyInput
                        onReply={(text) => handleReplyComment(ann.id, text)}
                      />
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

// Reply input component
function CommentReplyInput({ onReply }) {
  const [text, setText] = useState("");
  return (
    <div className="flex gap-2 mt-1">
      <input
        type="text"
        placeholder="Reply to comment..."
        className="border p-2 rounded w-full focus:ring-2 focus:ring-avocado outline-none"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        onClick={() => {
          onReply(text);
          setText("");
        }}
        className="bg-avocado text-background px-3 rounded hover:bg-lincoln50 transition"
      >
        Reply
      </button>
    </div>
  );
}
