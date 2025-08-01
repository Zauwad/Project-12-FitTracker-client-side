import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import UseAxios from "../../../../hooks/UseAxios";
import useAuth from "../../../../hooks/UseAuth";

const ManageSlots = () => {
  const axiosInstance = UseAxios();
  const { user, loading } = useAuth();
  const queryClient = useQueryClient();

  const { data: trainer, isLoading } = useQuery({
    queryKey: ["trainerSlots", user?.email],
    queryFn: async () => {
      const res = await axiosInstance.get(`/trainers/email/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const handleDeleteSlot = async (slotIndex) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete this slot?`);
    if (!confirmDelete) return;

    try {
      await axiosInstance.patch(`/trainers/${trainer._id}/remove-slot`, { slotIndex });
      alert("✅ Slot deleted successfully.");
      queryClient.invalidateQueries(["trainerSlots", user.email]);
    } catch (error) {
      console.error("Delete failed", error);
      alert("❌ Failed to delete slot. Try again.");
    }
  };

  if (loading || !user) return <p className="text-center py-6">⏳ Checking user authentication...</p>;
  if (isLoading) return <p className="text-center py-6">⏳ Loading slots...</p>;
  if (!trainer) return <p className="text-center py-6 text-red-500">❌ Trainer data not found.</p>;

  return (
    <section className="max-w-4xl mx-auto p-6 bg-gray-500 rounded shadow">
      <h2 className="text-3xl font-bold mb-6">🗓 Manage Available Slots</h2>

      {trainer.availableSlots?.length > 0 ? (
        <table className="w-full border-collapse border border-gray-400">
          <thead>
            <tr className="bg-gray-700 text-white">
              <th className="border p-3">Slot Name</th>
              <th className="border p-3">Time</th>
              <th className="border p-3">Days</th>
              <th className="border p-3">Class</th>
              <th className="border p-3">Other Info</th>
              <th className="border p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {trainer.availableSlots.map((slot, idx) => (
              <tr key={idx} className="hover:bg-gray-100">
                <td className="border p-3">{slot.slotName}</td>
                <td className="border p-3">{slot.slotTime}</td>
                <td className="border p-3">{Array.isArray(slot.days) ? slot.days.join(", ") : slot.days}</td>
                <td className="border p-3">{slot.className}</td>
                <td className="border p-3">{slot.otherInfo || "—"}</td>
                <td className="border p-3 text-center">
                  <button
                    onClick={() => handleDeleteSlot(idx)}
                    className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-gray-600">No available slots found.</p>
      )}
    </section>
  );
};

export default ManageSlots;
