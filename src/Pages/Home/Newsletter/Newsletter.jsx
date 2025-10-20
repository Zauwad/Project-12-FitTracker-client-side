import React, { useState } from "react";
import UseAxios from "../../../hooks/UseAxios";

const Newsletter = () => {
  const axiosInstance = UseAxios();
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await axiosInstance.post("/newsletter/subscribe", {
        name: formData.name,
        email: formData.email,
        createdAt: new Date(),
      });

      setMessage("✅ Thank you for subscribing to our newsletter!");
      setFormData({ name: "", email: "" });
    } catch (error) {
      console.error(error);
      setMessage("❌ Subscription failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20">
      {/* ✅ Matches Feature Section Alignment */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center bg-gradient-to-r from-[#0E0E0E] via-[#111] to-[#0E0E0E] rounded-2xl shadow-lg py-12">
        <h3 className="text-[#17CF63] opacity-80 text-xs mb-2 tracking-widest uppercase">
          NEWSLETTER
        </h3>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-3">
          📧 Subscribe to Our Newsletter
        </h2>

        <h3 className="text-[#9F9FA8] opacity-80 text-sm sm:text-base mb-8 sm:mb-12">
          Stay updated with the latest fitness tips, trainer updates, and special offers.
        </h3>

        {/* ✅ Subscription Form */}
        <form
          onSubmit={handleSubscribe}
          className="shadow-lg rounded-lg p-4 sm:p-6 flex flex-col sm:flex-row gap-3 justify-center items-center bg-[#2C2C30]/20 max-w-3xl mx-auto"
        >
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="flex-1 border border-gray-600 px-4 py-2 rounded focus:outline-none w-full"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="flex-1 border border-gray-600 px-4 py-2 rounded focus:outline-none w-full"
          />
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary px-6 py-2 rounded-lg"
          >
            {loading ? "Subscribing..." : "Subscribe Now"}
          </button>
        </form>

        {message && <p className="mt-4 text-lg">{message}</p>}
      </div>
    </section>
  );
};

export default Newsletter;
