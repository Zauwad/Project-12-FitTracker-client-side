import React from "react";
import { FaEye } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { useOutletContext } from "react-router";
import UseAxios from "../../../hooks/UseAxios";
import useAuth from "../../../hooks/UseAuth";

const MemberActivityLog = () => {
  const axiosInstance = UseAxios();
  const { user } = useAuth();
  const { openRejectModal } = useOutletContext(); // ✅ uses modal from layout

  // ✅ Fetch trainer applications only for the logged-in member
  const { data: applications = [], isLoading } = useQuery({
    queryKey: ["myTrainerApplications", user?.email],
    queryFn: async () => {
      const res = await axiosInstance.get(`/trainers/applications?email=${user?.email}`);
      // ✅ Filter out approved (as they shouldn't see the page)
      return res.data.filter((app) => app.status !== "approved");
    },
    enabled: !!user?.email,
  });

  if (isLoading) {
    return <p className="text-center py-10 text-black">Loading activity log...</p>;
  }

  if (applications.length === 0) {
    return <p className="text-center py-10 text-gray-500">No trainer applications found.</p>;
  }

  return (
    <section className="max-w-5xl mx-auto mt-10 bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">📌 My Trainer Applications</h2>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-3 border">Full Name</th>
            <th className="p-3 border">Applied On</th>
            <th className="p-3 border">Status</th>
            <th className="p-3 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app) => (
            <tr key={app._id} className="border-b hover:bg-gray-50">
              <td className="p-3 border">{app.name}</td>
              <td className="p-3 border">
                {app.createdAt ? new Date(app.createdAt).toLocaleDateString() : "N/A"}
              </td>
              <td
                className={`p-3 border font-semibold ${
                  app.status === "pending"
                    ? "text-yellow-500"
                    : app.status === "rejected"
                    ? "text-red-500"
                    : "text-green-500"
                }`}
              >
                {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
              </td>
              <td className="p-3 border text-center">
                {app.status === "rejected" && (
                  <button
                    className="text-blue-500 hover:text-blue-700"
                    onClick={() =>
                      openRejectModal(app.rejectionMessage || "No feedback provided.")
                    }
                  >
                    <FaEye size={20} />
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default MemberActivityLog;
