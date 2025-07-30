import React, { useEffect, useState } from "react";
import UseAxios from "../../../../hooks/UseAxios";
import useAuth from "../../../../hooks/UseAuth";

const ManageSlots = () => {
  const axiosInstance = UseAxios();
  const { user } = useAuth(); // user.email expected here

  const [trainer, setTrainer] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return; // wait until user email available

    const fetchTrainerAndBookings = async () => {
      try {
        setLoading(true);

        // Fetch trainer by email
        const trainerRes = await axiosInstance.get(`/trainers/email/${user.email}`);

        const trainerData = trainerRes.data;
        setTrainer(trainerData);

        if (trainerData?._id) {
          // Fetch bookings by trainerId
          const bookingsRes = await axiosInstance.get(`/bookings?trainerId=${trainerData._id}`);
          setBookings(bookingsRes.data);
        } else {
          setBookings([]);
        }
      } catch (error) {
        console.error("Failed to fetch trainer or bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrainerAndBookings();
  }, [user?.email, axiosInstance]);

  if (loading) return <p>Loading slots...</p>;
  if (!trainer) return <p>Trainer data not found</p>;

  // Map bookings by slot
  const bookingMap = {};
  bookings.forEach((b) => {
    bookingMap[b.slot] = b;
  });

  const handleDeleteSlot = async (slot) => {
    if (!window.confirm(`Are you sure you want to delete slot "${slot}"?`)) return;

    try {
      await axiosInstance.patch(`/trainers/${trainer._id}/slots`, { removeSlot: slot });

      setTrainer((prev) => ({
        ...prev,
        availableSlots: prev.availableSlots.filter((s) => s !== slot),
      }));

      alert("Slot deleted successfully");
    } catch (error) {
      console.error("Failed to delete slot", error);
      alert("Failed to delete slot. Try again.");
    }
  };

  return (
    <section className="max-w-4xl mx-auto p-6 bg-gray-500 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Manage Slots</h2>

      {!trainer.availableSlots || trainer.availableSlots.length === 0 ? (
        <p>No available slots found.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 p-2">Slot</th>
              <th className="border border-gray-300 p-2">Booking Status</th>
              <th className="border border-gray-300 p-2">Booked By</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {trainer.availableSlots.map((slot) => {
              const booking = bookingMap[slot];
              return (
                <tr key={slot} className="text-center">
                  <td className="border border-gray-300 p-2">{slot}</td>
                  <td className="border border-gray-300 p-2">
                    {booking ? booking.status : "Available"}
                  </td>
                  <td className="border border-gray-300 p-2">{booking ? booking.userName : "-"}</td>
                  <td className="border border-gray-300 p-2">
                    <button
                      className="text-red-600 hover:underline"
                      onClick={() => handleDeleteSlot(slot)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </section>
  );
};

export default ManageSlots;
