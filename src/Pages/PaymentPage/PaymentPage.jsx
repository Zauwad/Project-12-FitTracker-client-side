import { useLocation } from "react-router";
import Payment from "./Payment";

const PaymentPage = () => {
  const location = useLocation();

  // ✅ Data passed from TrainerBookingPage
  const { trainerId, trainerName, selectedSlot, package: selectedPackage } =
    location.state || {};

  if (!trainerId || !selectedPackage) {
    return (
      <p className="text-center py-10 text-red-500">
        Invalid booking details. Please go back and try again.
      </p>
    );
  }

  return (
    <section className="py-16  -200 min-h-screen">
      <div className="max-w-3xl mx-auto px-6 bg-gray-500 p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6">Payment Checkout</h2>

        {/* ✅ Booking Info */}
        <div className="mb-6 border p-4 rounded bg-gray-500">
          <p><strong>Trainer:</strong> {trainerName}</p>
          <p><strong>Slot:</strong> {selectedSlot}</p>
          <p><strong>Package:</strong> {selectedPackage.name}</p>
          <p><strong>Price:</strong> ${selectedPackage.price}</p>
        </div>

        {/* ✅ Pass payment data to Payment (Stripe wrapper) */}
        <Payment 
          trainerId={trainerId}
          trainerName={trainerName}
          selectedSlot={selectedSlot}
          selectedPackage={selectedPackage}
        />
      </div>
    </section>
  );
};

export default PaymentPage;
