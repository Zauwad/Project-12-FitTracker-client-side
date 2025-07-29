import React, { useState } from "react";
import useAuth from "../../../hooks/UseAuth";
import UseAxios from "../../../hooks/UseAxios";

const MemberProfile = () => {
  const { user } = useAuth(); // ✅ Firebase user info
  const axiosInstance = UseAxios();

  // ✅ Pre-fill form with user info
  const [formData, setFormData] = useState({
    name: user?.displayName || "",
    email: user?.email || "",
    profileImage: user?.photoURL || "",
    lastLogin: user?.metadata?.lastSignInTime || "",
    bio: "", // Additional field
  });

  const [saving, setSaving] = useState(false);

  // ✅ Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Submit updated profile to backend
  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await axiosInstance.put("/users/update-profile", formData); // Your backend endpoint
      alert("✅ Profile updated successfully!");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="max-w-3xl mx-auto bg-gray-500 p-8 rounded-lg shadow-md mt-10">
      <h2 className="text-3xl font-bold mb-6 text-center">👤 My Profile</h2>

      <form onSubmit={handleSave} className="space-y-5">
        {/* Profile Picture */}
        <div className="text-center">
          <img
            src={formData.profileImage || "https://i.ibb.co/2nzwxnQ/default-user.png"}
            alt="Profile"
            className="w-28 h-28 mx-auto rounded-full border mb-3 object-cover"
          />
          <input
            type="url"
            name="profileImage"
            value={formData.profileImage}
            onChange={handleChange}
            placeholder="Profile Image URL"
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* Name */}
        <div>
          <label className="block font-semibold mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        {/* Email (Read Only) */}
        <div>
          <label className="block font-semibold mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            readOnly
            className="w-full border px-3 py-2 rounded bg-gray-100 text-black"
          />
        </div>

        {/* Last Login (from Firebase metadata) */}
        <div>
          <label className="block font-semibold mb-1">Last Login</label>
          <input
            type="text"
            value={formData.lastLogin}
            readOnly
            className="w-full border px-3 py-2 rounded bg-gray-100 text-black"
          />
        </div>

        {/* Bio / Other Info */}
        <div>
          <label className="block font-semibold mb-1">Bio / Other Info</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            rows="3"
            className="w-full border px-3 py-2 rounded"
            placeholder="Write something about yourself..."
          ></textarea>
        </div>

        {/* Save Button */}
        <button
          type="submit"
          className="btn btn-primary w-full text-lg"
          disabled={saving}
        >
          {saving ? "Saving..." : "💾 Save Changes"}
        </button>
      </form>
    </section>
  );
};

export default MemberProfile;
