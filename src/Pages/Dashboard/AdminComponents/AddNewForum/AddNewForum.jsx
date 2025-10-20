import React, { useState } from "react";
import { useNavigate } from "react-router";
import useAuth from "../../../../hooks/UseAuth";
import UseAxios from "../../../../hooks/UseAxios";

const AddNewForum = () => {
  const axiosInstance = UseAxios();
  const { user } = useAuth(); // ✅ logged-in user with role (admin/trainer)
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) {
      alert("Please fill out all fields!");
      return;
    }

    const newForumPost = {
      title,
      content,
      authorName: user?.displayName || "Unknown User",
      authorEmail: user?.email || "No Email",
      role: user?.role || "trainer", // ✅ role is either "admin" or "trainer"
      createdAt: new Date(),
      upvotes: 0,
      downvotes: 0,
    };

    try {
      setLoading(true);
      await axiosInstance.post("/forum", newForumPost);
      alert("✅ Forum post added successfully!");
      navigate("/community");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to add forum post.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-3xl mx-auto py-12 px-6  -200 rounded-lg shadow">
      <h2 className="text-3xl font-bold mb-6 text-center">📝 Add New Forum Post</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Post Title"
          className="input input-bordered w-full"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Write your content..."
          className="textarea textarea-bordered w-full min-h-[150px]"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        {/* Author Info (Read-only) */}
        <input
          type="text"
          value={`${user?.displayName || "Unknown"} (${user?.role || "trainer"})`}
          className="input input-bordered w-full bg-gray-500"
          readOnly
        />

        <button type="submit" className="btn btn-primary w-full text-lg" disabled={loading}>
          {loading ? "Posting..." : "🚀 Add Post"}
        </button>
      </form>
    </section>
  );
};

export default AddNewForum;
