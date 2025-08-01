import React, { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router";
import { FaHome, FaSignOutAlt } from "react-icons/fa";
import useAuth from "../../hooks/UseAuth";
import useUserRole from "../../hooks/useUserRole";

const MemberDashboardLayout = () => {
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectMessage, setRejectMessage] = useState("");
  const navigate = useNavigate();
  const { role, roleLoading } = useUserRole();
  const { logOut } = useAuth();

  const openRejectModal = (message) => {
    setRejectMessage(message);
    setShowRejectModal(true);
  };
  const closeRejectModal = () => {
    setRejectMessage("");
    setShowRejectModal(false);
  };

  const handleLogout = () => {
    logOut();
    alert("Logged out successfully!");
    navigate("/login");
  };

  if (roleLoading) {
    return <p className="text-center py-10">Loading dashboard...</p>;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-500 shadow-md flex flex-col justify-between">
        <div>
          <div className="p-6 border-b">
            <h2 className="text-2xl font-bold">Dashboard</h2>
            {/* ✅ Display user role */}
            <p className="mt-1 text-sm font-semibold text-yellow-200 uppercase">
              Role: {role}
            </p>
          </div>

          <nav className="flex flex-col p-4 space-y-3">
            {/* ✅ Member-only Links */}
            {role === "member" && (
              <>
                <NavLink to="/dashboard/activity-log" className={({ isActive }) =>
                  `px-4 py-2 rounded hover:bg-gray-200 ${isActive ? "bg-blue-500 text-white" : "text-gray-700"}`}>
                  Activity Log
                </NavLink>

                <NavLink to="/dashboard/memberprofile" className={({ isActive }) =>
                  `px-4 py-2 rounded hover:bg-gray-200 ${isActive ? "bg-blue-500 text-white" : "text-gray-700"}`}>
                  Profile
                </NavLink>

                <NavLink to="/dashboard/booked-trainer" className={({ isActive }) =>
                  `px-4 py-2 rounded hover:bg-gray-200 ${isActive ? "bg-blue-500 text-white" : "text-gray-700"}`}>
                  Booked Trainer
                </NavLink>
              </>
            )}

            {/* ✅ Trainer-only Links */}
            {role === "trainer" && (
              <div className="border-t flex flex-col border-gray-400 mt-4 pt-4">
                <NavLink to="/dashboard/manage-slots" className={({ isActive }) =>
                  `px-4 py-2 rounded hover:bg-gray-200 ${isActive ? "bg-blue-500 text-white" : "text-gray-700"}`}>
                  Manage Slots
                </NavLink>

                <NavLink to="/dashboard/add-slot" className={({ isActive }) =>
                  `px-4 py-2 rounded hover:bg-gray-200 ${isActive ? "bg-blue-500 text-white" : "text-gray-700"}`}>
                  Add New Slot
                </NavLink>

                <NavLink to="/dashboard/add-forum" className={({ isActive }) =>
                  `px-4 py-2 rounded hover:bg-gray-200 ${isActive ? "bg-blue-500 text-white" : "text-gray-700"}`}>
                  Add New Forum
                </NavLink>
              </div>
            )}

            {/* ✅ Admin-only Links */}
            {role === "admin" && (
              <div className="border-t flex flex-col border-gray-400 mt-4 pt-4">
                <NavLink to="/dashboard/subscribers-dashboard" className={({ isActive }) =>
                  `px-4 py-2 rounded hover:bg-gray-200 ${isActive ? "bg-blue-500 text-white" : "text-gray-700"}`}>
                  All Newsletter Subscribers
                </NavLink>

                <NavLink to="/dashboard/all-trainers" className={({ isActive }) =>
                  `px-4 py-2 rounded hover:bg-gray-200 ${isActive ? "bg-blue-500 text-white" : "text-gray-700"}`}>
                  All Trainers
                </NavLink>

                <NavLink to="/dashboard/applied-trainers" className={({ isActive }) =>
                  `px-4 py-2 rounded hover:bg-gray-200 ${isActive ? "bg-blue-500 text-white" : "text-gray-700"}`}>
                  Applied Trainers
                </NavLink>

                <NavLink to="/dashboard/balance" className={({ isActive }) =>
                  `px-4 py-2 rounded hover:bg-gray-200 ${isActive ? "bg-blue-500 text-white" : "text-gray-700"}`}>
                  Balance
                </NavLink>

                <NavLink to="/dashboard/add-class" className={({ isActive }) =>
                  `px-4 py-2 rounded hover:bg-gray-200 ${isActive ? "bg-blue-500 text-white" : "text-gray-700"}`}>
                  Add New Class
                </NavLink>

                <NavLink to="/dashboard/add-forum" className={({ isActive }) =>
                  `px-4 py-2 rounded hover:bg-gray-200 ${isActive ? "bg-blue-500 text-white" : "text-gray-700"}`}>
                  Add New Forum
                </NavLink>

                <NavLink to="/dashboard/manage-admin" className={({ isActive }) =>
                  `px-4 py-2 rounded hover:bg-gray-200 ${isActive ? "bg-blue-500 text-white" : "text-gray-700"}`}>
                  Manage Admin
                </NavLink>
              </div>
            )}
          </nav>
        </div>

        {/* ✅ Bottom Buttons */}
        <div className="p-4 border-t flex flex-col space-y-3">
          <button onClick={() => navigate("/")} className="flex items-center gap-2 px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600">
            <FaHome /> Home
          </button>
          <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600">
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-8">
        <Outlet context={{ openRejectModal }} />
      </main>

      {/* ✅ Reject Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={closeRejectModal}>
          <div className="bg-gray-500 p-6 rounded shadow-lg max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-xl font-semibold mb-4">Rejection Feedback</h3>
            <p>{rejectMessage || "No feedback provided."}</p>
            <button onClick={closeRejectModal} className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MemberDashboardLayout;
