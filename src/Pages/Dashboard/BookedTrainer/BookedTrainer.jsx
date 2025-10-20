import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import UseAxios from "../../../hooks/UseAxios";
import useAuth from "../../../hooks/useAuth";


const BookedTrainer = () => {
  const axiosInstance = UseAxios();
  const { user } = useAuth();
  const [selectedTrainer, setSelectedTrainer] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);

  // ✅ Fetch booked trainers by user email
  const { data: bookedTrainers = [], isLoading, isError } = useQuery({
    queryKey: ["bookedTrainers", user?.email],
    queryFn: async () => {
      const res = await axiosInstance.get(`/bookings/user/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // ✅ Submit Review
  const handleReviewSubmit = async () => {
    if (!reviewText || rating === 0) {
      alert("Please provide feedback and a rating!");
      return;
    }

    try {
      await axiosInstance.post("/reviews", {
        trainerId: selectedTrainer?.trainerId,
        trainerName: selectedTrainer?.trainerName,
        userEmail: user.email,
        userName: user.displayName,
        feedback: reviewText,
        rating,
        createdAt: new Date(),
      });

      alert("✅ Review submitted successfully!");
      setShowModal(false);
      setReviewText("");
      setRating(0);
    } catch (err) {
      console.error("❌ Failed to submit review:", err);
      alert("Failed to submit review.");
    }
  };

  if (isLoading) return <p className="text-center py-6">⏳ Loading booked trainer...</p>;
  if (isError) return <p className="text-center text-red-500">❌ Failed to load booked trainer</p>;
  if (!bookedTrainers.length) return <p className="text-center text-black">No booked trainers found.</p>;

  return (
    <section className="max-w-5xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold mb-6 text-center text-black">🎯 Your Booked Trainers</h2>

      {bookedTrainers.map((booking) => (
        <div key={booking._id} className="border rounded-lg p-5 shadow-lg bg-gray-500 mb-6">
          {/* ✅ Trainer Info */}
          <div className="flex items-center gap-4">
            <img
              src={booking.trainerDetails?.image || "https://via.placeholder.com/150"}
              alt={booking.trainerName}
              className="w-28 h-28 object-cover rounded-full border"
            />
            <div>
              <h3 className="text-xl font-semibold">{booking.trainerName}</h3>
              <p className="text-gray-600">📧 {booking.trainerDetails?.email}</p>
              <p>🏆 Experience: {booking.trainerDetails?.experience} Years</p>
            </div>
          </div>

          {/* ✅ Classes Info */}
          <div className="mt-3">
            <h4 className="font-bold">📚 Classes Offered:</h4>
            <ul className="list-disc list-inside">
              {booking.trainerDetails?.expertise?.length > 0 ? (
                booking.trainerDetails.expertise.map((cls, i) => <li key={i}>{cls}</li>)
              ) : (
                <li>No class information available.</li>
              )}
            </ul>
          </div>

          {/* ✅ Slot Info */}
          <div className="mt-3">
            <h4 className="font-bold">🕒 Booked Slot:</h4>
            <p>{booking.slot}</p>
          </div>

          {/* ✅ Other Info */}
          <div className="mt-3">
            <h4 className="font-bold">ℹ️ Other Info:</h4>
            <p>{booking.trainerDetails?.details || "No additional info provided."}</p>
          </div>

          {/* ✅ Review Button */}
          <button
            className="btn btn-primary mt-4"
            onClick={() => {
              setSelectedTrainer(booking);
              setShowModal(true);
            }}
          >
            ✍️ Write a Review
          </button>
        </div>
      ))}

      {/* ✅ Review Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-gray-500 p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-bold mb-4">📝 Submit Review for {selectedTrainer?.trainerName}</h3>

            {/* Textarea */}
            <textarea
              className="w-full border p-2 rounded mb-3"
              rows="3"
              placeholder="Write your feedback..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            ></textarea>

            {/* Star Rating */}
            <div className="flex gap-1 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`cursor-pointer text-2xl ${star <= rating ? "text-yellow-400" : "text-gray-400"}`}
                  onClick={() => setRating(star)}
                >
                  ★
                </span>
              ))}
            </div>

            {/* Modal Buttons */}
            <div className="flex justify-end gap-3">
              <button className="btn btn-outline" onClick={() => setShowModal(false)}>
                Cancel
              </button>
              <button className="btn btn-success" onClick={handleReviewSubmit}>
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default BookedTrainer;
