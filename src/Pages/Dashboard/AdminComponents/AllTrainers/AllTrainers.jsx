import React from "react";
import { useQuery } from "@tanstack/react-query";
import UseAxios from "../../../../hooks/UseAxios";

const AllTrainers = () => {
  const axiosInstance = UseAxios();

  // Fetch all trainers
  const { data: trainers = [], isLoading, isError, refetch } = useQuery({
    queryKey: ["allTrainers"],
    queryFn: async () => {
      const res = await axiosInstance.get("/trainers");
      return res.data;
    },
  });

  // ✅ Handle delete without useMutation
  const handleDeleteTrainer = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to remove this trainer? This will revoke their Trainer role."
    );

    if (!confirmDelete) return;

    try {
      await axiosInstance.patch(`/trainers/${id}/remove-trainer`);
      alert("Trainer role revoked successfully.");
      refetch(); // ✅ manually refresh trainers list
    } catch (error) {
      console.error("Failed to remove trainer:", error);
      alert("Failed to remove trainer role. Try again later.");
    }
  };

  if (isLoading) return <p className="text-center py-10">Loading trainers...</p>;
  if (isError) return <p className="text-center py-10 text-red-500">Failed to load trainers</p>;
  if (trainers.length === 0) return <p className="text-center py-10 text-gray-500">No trainers found.</p>;

  return (
    <section className="max-w-6xl mx-auto p-6 bg-gray-500 rounded shadow">
      <h2 className="text-3xl font-bold mb-6">All Trainers</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-500 text-white">
            <th className="border p-3 text-left">Name</th>
            <th className="border p-3 text-left">Email</th>
            <th className="border p-3 text-left">Experience (Years)</th>
            <th className="border p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {trainers.map((trainer) => (
            <tr key={trainer._id} className="hover:bg-gray-100">
              <td className="border p-3">{trainer.name || "N/A"}</td>
              <td className="border p-3">{trainer.email || "N/A"}</td>
              <td className="border p-3">{trainer.experience || "N/A"}</td>
              <td className="border p-3">
                <button
                  onClick={() => handleDeleteTrainer(trainer._id)}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                >
                  Delete Trainer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default AllTrainers;
