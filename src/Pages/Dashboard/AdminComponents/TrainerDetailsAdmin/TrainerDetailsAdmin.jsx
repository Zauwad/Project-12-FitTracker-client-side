/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import UseAxios from "../../../../hooks/UseAxios";

const TrainerDetailsAdmin = () => {
  const { id } = useParams(); // get applicant ID from URL
  const axiosInstance = UseAxios();
  const navigate = useNavigate();

  const [trainer, setTrainer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [feedback, setFeedback] = useState("");

  // ✅ Fetch applicant details
  useEffect(() => {
    const fetchTrainer = async () => {
      try {
        const res = await axiosInstance.get(`/trainers/applications/${id}`);
        setTrainer(res.data);
      } catch (err) {
        console.error("Failed to load trainer details", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTrainer();
  }, [id, axiosInstance]);

  // ✅ Confirm Application → promote to Trainer
  const handleConfirm = async () => {
    if (!window.confirm("Confirm this applicant as a Trainer?")) return;
    try {
      await axiosInstance.patch(`/trainers/applications/${id}/confirm`);
      alert("Trainer application confirmed and added to trainers!");
      navigate("/dashboard/applied-trainers");
    } catch (err) {
      alert("Failed to confirm trainer. Try again.");
    }
  };

  // ✅ Submit Rejection with Feedback
  const handleRejectSubmit = async () => {
    if (feedback.trim() === "") {
      alert("Please provide rejection feedback.");
      return;
    }
    try {
      await axiosInstance.patch(`/trainers/applications/${id}/reject`, { feedback });
      alert("Trainer application rejected with feedback.");
      setShowModal(false);
      navigate("/dashboard/applied-trainer");
    } catch (err) {
      alert("Failed to reject application. Try again.");
    }
  };

  if (loading) return <p className="text-center py-10">Loading details...</p>;
  if (!trainer) return <p className="text-center py-10 text-red-500">Trainer not found.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-500 rounded shadow">
      <h2 className="text-3xl font-bold mb-4">Trainer Application Details</h2>

      <img src={trainer.image} alt={trainer.name} className="w-48 h-48 rounded mb-4 object-cover" />

      <p><strong>Name:</strong> {trainer.name}</p>
      <p><strong>Email:</strong> {trainer.email}</p>
      <p><strong>Experience:</strong> {trainer.experience} years</p>
      <p><strong>Details:</strong> {trainer.details}</p>
      <p><strong>Status:</strong> {trainer.status}</p>

      <div className="mt-6 flex gap-4">
        <button
          onClick={handleConfirm}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
        >
          ✅ Confirm
        </button>

        <button
          onClick={() => setShowModal(true)}
          className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition"
        >
          ❌ Reject
        </button>

        <button
          onClick={() => navigate("/dashboard/applied-trainers")}
          className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600 transition"
        >
          🔙 Back
        </button>
      </div>

      {/* ✅ Rejection Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-gray-500 p-6 rounded shadow-lg w-[400px]">
            <h3 className="text-xl font-bold mb-3">Reject Trainer Application</h3>
            <p className="mb-2"><strong>Name:</strong> {trainer.name}</p>
            <p className="mb-4"><strong>Email:</strong> {trainer.email}</p>

            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Enter rejection feedback..."
              className="w-full border p-2 rounded mb-4"
              rows="4"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleRejectSubmit}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Submit Rejection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrainerDetailsAdmin;
