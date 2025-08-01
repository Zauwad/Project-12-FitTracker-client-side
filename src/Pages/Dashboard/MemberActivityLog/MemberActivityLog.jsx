import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaEye } from "react-icons/fa";
import UseAxios from "../../../hooks/UseAxios";
import useAuth from "../../../hooks/UseAuth";


const ActivityLog = () => {
  const axiosInstance = UseAxios();
  const { user } = useAuth();
  const [selectedMessage, setSelectedMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  // ✅ Fetch all trainer applications (only pending or rejected)
  const { data: applications = [], isLoading, isError } = useQuery({
    queryKey: ["trainerApplications"],
    queryFn: async () => {
      const res = await axiosInstance.get("/trainers/applications/status/filter");
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center py-10">⏳ Loading activity log...</p>;
  if (isError) return <p className="text-center py-10 text-red-500">❌ Failed to load data.</p>;

  // ✅ Filter: Only show pending & rejected applicants
  const filteredApplicants = applications.filter(
    (applicant) => applicant.status === "pending" || applicant.status === "rejected"
  );

  return (
    <section className="max-w-5xl mx-auto py-12 px-6">
      <h2 className="text-3xl font-bold mb-6 text-center">📋 Trainer Applications Activity Log</h2>

      {filteredApplicants.length === 0 ? (
        <p className="text-center text-gray-500">✅ No pending or rejected applications found.</p>
      ) : (
        <table className="w-full border border-gray-500 rounded-lg overflow-hidden">
          <thead className="bg-gray-700 text-white">
            <tr>
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Email</th>
              <th className="p-3 border">Applied On</th>
              <th className="p-3 border">Status</th>
              <th className="p-3 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredApplicants.map((applicant) => (
              <tr key={applicant._id} className="border-b bg-gray-500">
                <td className="p-3">{applicant.name}</td>
                <td className="p-3">{applicant.email}</td>
                <td className="p-3">{new Date(applicant.createdAt).toLocaleDateString()}</td>
                <td className="p-3">
                  {applicant.status === "pending" ? (
                    <span className="px-3 py-1 text-xs bg-yellow-400 text-black rounded">Pending</span>
                  ) : (
                    <span className="px-3 py-1 text-xs bg-red-500 text-black rounded">Rejected</span>
                  )}
                </td>
                <td className="p-3 text-center">
                  {applicant.status === "rejected" && (
                    <button
                      className="text-blue-600 hover:text-blue-800"
                      onClick={() => {
                        setSelectedMessage(applicant.feedback || "No feedback provided.");
                        setShowModal(true);
                      }}
                    >
                      <FaEye size={20} />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* ✅ Modal for Rejection Message */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-gray-500 rounded-lg shadow-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">❌ Rejection Feedback</h3>
            <p className="text-gray-700 mb-4">{selectedMessage}</p>
            <button
              className="btn btn-primary w-full"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default ActivityLog;
