import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import UseAxios from "../../../../hooks/UseAxios";

const AppliedTrainer = () => {
    const axiosInstance = UseAxios();
    const navigate = useNavigate();

    // ✅ Fetch all pending trainer applications
    const { data: applications = [], isLoading, isError } = useQuery({
        queryKey: ["appliedTrainers"],
        queryFn: async () => {
            const res = await axiosInstance.get("/trainers/applications/pending");
            return res.data;
        },
    });

    if (isLoading) return <p className="text-center py-10">Loading applications...</p>;
    if (isError) return <p className="text-center py-10 text-red-500">Failed to load applications</p>;
    if (applications.length === 0) return <p className="text-center py-10 text-gray-500">No pending trainer applications.</p>;

    return (
        <section className="max-w-6xl mx-auto p-6 bg-gray-500 rounded shadow">
            <h2 className="text-3xl font-bold mb-6">Applied Trainers</h2>

            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-500">
                        <th className="border p-3">Name</th>
                        <th className="border p-3">Email</th>
                        <th className="border p-3">Experience</th>
                        <th className="border p-3">Status</th>
                        <th className="border p-3">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {applications.map((applicant) => (
                        <tr key={applicant._id} className="hover:bg-gray-50 hover:text-black">
                            <td className="border p-3">{applicant.name}</td>
                            <td className="border p-3">{applicant.email}</td>
                            <td className="border p-3">{applicant.experience} years</td>
                            <td className="border p-3 capitalize">{applicant.status}</td>
                            <td className="border p-3">
                                <button
                                    onClick={() => navigate(`/dashboard/applied-trainer/${applicant._id}`)}
                                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                                >
                                    Details
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
};

export default AppliedTrainer;
