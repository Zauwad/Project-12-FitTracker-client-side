import { useState } from "react";
import UseAxios from "../../../../hooks/UseAxios";

const ManageAdmin = () => {
  const axiosInstance = UseAxios();
  const [name, setName] = useState("");
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  // ✅ Search Users by Name
  const handleSearch = async () => {
    if (!name.trim()) {
      setError("Please enter a name");
      return;
    }
    try {
      setError("");
      const res = await axiosInstance.get(`/users/search?name=${name}`);
      setUsers(res.data);
    } catch (err) {
      setUsers([]);
      setError(err.response?.data?.error || "No users found");
    }
  };

  // ✅ Update Role to Admin
  const makeAdmin = async (email) => {
    try {
      await axiosInstance.patch(`/users/${email}/make-admin`);
      alert("✅ User promoted to admin");
      setUsers(users.map(u => u.email === email ? { ...u, role: "admin" } : u));
    } catch {
      alert("❌ Failed to make admin");
    }
  };

  // ✅ Remove Admin Role
  const removeAdmin = async (email) => {
    try {
      await axiosInstance.patch(`/users/${email}/remove-admin`);
      alert("✅ Admin role removed");
      setUsers(users.map(u => u.email === email ? { ...u, role: "user" } : u));
    } catch {
      alert("❌ Failed to remove admin");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-500 rounded shadow mt-10">
      <h2 className="text-2xl font-bold mb-4">👥 Manage User Roles by Name</h2>

      {/* ✅ Search Bar */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter user name"
          className="input input-bordered w-full"
        />
        <button
          onClick={handleSearch}
          className="btn btn-primary"
        >
          Search
        </button>
      </div>

      {/* ✅ Error Message */}
      {error && <p className="text-red-500">{error}</p>}

      {/* ✅ Users Table */}
      {users.length > 0 && (
        <table className="w-full border-collapse border border-gray-300 bg-white text-black rounded">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Role</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-gray-100">
                <td className="border p-2">{user.name}</td>
                <td className="border p-2">{user.email}</td>
                <td className="border p-2 font-semibold">{user.role || "user"}</td>
                <td className="border p-2 flex gap-2 justify-center">
                  <button
                    onClick={() => makeAdmin(user.email)}
                    disabled={user.role === "admin"}
                    className="btn btn-success btn-sm"
                  >
                    ✅ Make Admin
                  </button>
                  <button
                    onClick={() => removeAdmin(user.email)}
                    disabled={user.role !== "admin"}
                    className="btn btn-error btn-sm text-black"
                  >
                    ❌ Remove Admin
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManageAdmin;
