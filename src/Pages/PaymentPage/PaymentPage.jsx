import { useLocation, useNavigate } from "react-router";
import UseAxios from "../../hooks/UseAxios";
import { useState } from "react";
import useAuth from "../../hooks/UseAuth";

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const axiosInstance = UseAxios();
  const { user } = useAuth(); // ✅ Get logged-in user

  // ✅ Data passed from TrainerBookingPage
  const { trainerId, trainerName, selectedSlot, package: selectedPackage } =
    location.state || {};

  const [loading, setLoading] = useState(false);

  if (!trainerId || !selectedPackage) {
    return (
      <p className="text-center py-10 text-red-500">
        Invalid booking details. Please go back and try again.
      </p>
    );
  }

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 🟢 Prepare payment info
      const paymentInfo = {
        trainerId,
        trainerName,
        slot: selectedSlot,
        packageName: selectedPackage.name,
        amount: selectedPackage.price,
        userName: user?.displayName || "Unknown User",
        userEmail: user?.email || "No Email",
        status: "success",
        createdAt: new Date(),
      };

      // 🟢 Save payment in DB
      await axiosInstance.post("/payments", paymentInfo);

      // 🟢 Increase class booking count
    //   await axiosInstance.patch(`/classes/increase-booking`, {
    //     trainerId,
    //     slot: selectedSlot,
    //   });

      alert("✅ Payment successful! Booking confirmed.");
      navigate("/dashboard/my-bookings");
    } catch (err) {
      console.error("Payment failed:", err);
      alert("❌ Payment failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 bg-base-200 min-h-screen">
      <div className="max-w-3xl mx-auto px-6 bg-gray-500 p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6">Payment Checkout</h2>

        {/* Booking & Package Info */}
        <div className="mb-6 border p-4 rounded bg-gray-500">
          <p><strong>Trainer:</strong> {trainerName}</p>
          <p><strong>Slot:</strong> {selectedSlot}</p>
          <p><strong>Package:</strong> {selectedPackage.name}</p>
          <p><strong>Price:</strong> ${selectedPackage.price}</p>
        </div>

        {/* User Info (Read-Only) */}
        <form onSubmit={handlePayment} className="space-y-4">
          <input
            type="text"
            value={user?.displayName || ""}
            readOnly
            className="input input-bordered w-full bg-gray-500"
          />
          <input
            type="email"
            value={user?.email || ""}
            readOnly
            className="input input-bordered w-full bg-gray-500"
          />

          {/* Stripe Button Placeholder */}
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full text-lg"
          >
            {loading ? "Processing..." : `Pay $${selectedPackage.price}`}
          </button>
        </form>
      </div>
    </section>
  );
};

export default PaymentPage;
