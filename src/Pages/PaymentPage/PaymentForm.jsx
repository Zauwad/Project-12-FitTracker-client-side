import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router";
import UseAxios from "../../hooks/UseAxios";
import useAuth from "../../hooks/useAuth"

const PaymentForm = ({ trainerId, trainerName, selectedSlot, selectedPackage }) => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = UseAxios();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [clientSecret, setClientSecret] = useState("");

  const amount = selectedPackage.price * 100; // convert to cents

  // ✅ Create Payment Intent when page loads
  useEffect(() => {
    const createIntent = async () => {
      try {
        const { data } = await axiosSecure.post("/create-payment-intent", { amount });
        setClientSecret(data.clientSecret);
      } catch (err) {
        setErrorMessage("Failed to initialize payment.");
      }
    };
    createIntent();
  }, [amount, axiosSecure]);

  // ✅ Handle Payment
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) return;

    try {
      const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: user?.displayName || "Anonymous",
            email: user?.email || "no-email",
          },
        },
      });

      if (error) {
        setErrorMessage(error.message);
      } else if (paymentIntent.status === "succeeded") {
        setSuccessMessage("✅ Payment successful! Booking confirmed.");

        // ✅ Save payment record in DB
        const paymentInfo = {
          trainerId,
          trainerName,
          slot: selectedSlot,
          packageName: selectedPackage.name,
          amount: selectedPackage.price,
          userName: user?.displayName,
          userEmail: user?.email,
          status: "success",
          paymentIntentId: paymentIntent.id,
          createdAt: new Date(),
        };

        await axiosSecure.post("/payments", paymentInfo);

        // ✅ Navigate to bookings page
        setTimeout(() => navigate("/dashboard/booked-trainer"), 1500);
      }
    } catch (err) {
      setErrorMessage("Payment failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow space-y-4">
      <h3 className="text-xl font-bold text-black">💳 Enter Card Details</h3>
      
      <div className="border p-3 rounded">
        <CardElement options={{ style: { base: { fontSize: "16px" } } }} />
      </div>

      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      {successMessage && <p className="text-green-600">{successMessage}</p>}

      <button 
        type="submit" 
        disabled={!stripe || loading} 
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
      >
        {loading ? "Processing..." : `Pay $${selectedPackage.price}`}
      </button>
    </form>
  );
};

export default PaymentForm;
