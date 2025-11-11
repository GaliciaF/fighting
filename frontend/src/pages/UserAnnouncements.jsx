import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Sample announcements data
const initialAnnouncements = [
  {
    id: 1,
    title: "Water Maintenance",
    content: "Water supply will be temporarily unavailable on Oct 21, 2025 from 8AM to 12PM.",
    comments: [
      { id: 1, text: "Thanks for letting us know!" },
      { id: 2, text: "Will this affect the 2nd floor?" },
    ],
  },
  {
    id: 2,
    title: "WiFi Upgrade",
    content: "WiFi will be upgraded this weekend for faster speed.",
    comments: [],
  },
];

export default function UserAnnouncements() {
  const navigate = useNavigate();
  const [announcements, setAnnouncements] = useState(initialAnnouncements);
  const [commentText, setCommentText] = useState({}); // store input per announcement

  const handleAddComment = (id) => {
    if (!commentText[id]) return;
    setAnnouncements(
      announcements.map((a) =>
        a.id === id
          ? {
              ...a,
              comments: [...a.comments, { id: Date.now(), text: commentText[id] }],
            }
          : a
      )
    );
    setCommentText({ ...commentText, [id]: "" });
  };

  return (
    <div className="flex min-h-screen bg-blueYonder/10">
      {/* Sidebar */}
      <aside className="w-64 bg-oxfordBlue text-white p-6 flex flex-col justify-between shadow-lg rounded-r-2xl">
        <h1
          className="text-2xl font-bold text-metallicPink cursor-pointer"
          onClick={() => navigate("/user/dashboard")}
        >
          Tenant Dashboard
        </h1>
        <button
          onClick={() => navigate("/login")}
          className="mt-auto flex items-center gap-2 px-4 py-3 bg-antiqueFuchsia text-white rounded-2xl hover:bg-antiqueFuchsia/80 shadow-md transition-all"
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 space-y-8 overflow-y-auto">
        <h2 className="text-3xl font-bold mb-6 text-oxfordBlue">Announcements</h2>

        {announcements.map((ann) => (
          <div key={ann.id} className="bg-white border border-blueYonder/30 rounded-2xl shadow-md p-6 space-y-4">
            <h3 className="font-semibold text-antiqueFuchsia text-xl">{ann.title}</h3>
            <p className="text-gray-700">{ann.content}</p>

            {/* Comments */}
            <div className="space-y-2">
              <h4 className="font-semibold">Comments</h4>
              {ann.comments.length > 0 ? (
                ann.comments.map((c) => (
                  <p key={c.id} className="text-sm px-3 py-1 bg-gray-100 rounded">
                    {c.text}
                  </p>
                ))
              ) : (
                <p className="text-gray-400 italic text-sm">No comments yet.</p>
              )}

              {/* Reply input */}
              <div className="flex gap-2 mt-2">
                <input
                  type="text"
                  placeholder="Reply..."
                  value={commentText[ann.id] || ""}
                  onChange={(e) => setCommentText({ ...commentText, [ann.id]: e.target.value })}
                  className="border p-2 rounded w-full focus:ring-2 focus:ring-antiqueFuchsia outline-none"
                />
                <button
                  onClick={() => handleAddComment(ann.id)}
                  className="bg-antiqueFuchsia text-white px-4 rounded hover:bg-antiqueFuchsia/80 transition"
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
