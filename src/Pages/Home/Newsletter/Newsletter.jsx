import React, { useState } from "react";
import UseAxios from "../../../hooks/UseAxios";

const Newsletter = () => {
  const axiosInstance = UseAxios();
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // ✅ Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Handle Form Submit
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
    <section className="py-16 bg-gray-500">
      <div className="max-w-3xl mx-auto text-center px-6">
        <h2 className="text-3xl font-bold text-primary mb-3">📧 Subscribe to Our Newsletter</h2>
        <p className="text-gray-600 mb-6">
          Stay updated with the latest fitness tips, trainer updates, and special offers.
        </p>

        {/* ✅ Subscription Form */}
        <form
          onSubmit={handleSubscribe}
          className="bg-black shadow-lg rounded-lg p-6 flex flex-col sm:flex-row gap-3 justify-center"
        >
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="flex-1 border px-4 py-2 rounded focus:outline-none"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="flex-1 border px-4 py-2 rounded focus:outline-none"
          />
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary px-6 py-2 rounded-lg"
          >
            {loading ? "Subscribing..." : "Subscribe Now"}
          </button>
        </form>

        {/* ✅ Success / Error Message */}
        {message && <p className="mt-4 text-lg">{message}</p>}
      </div>
    </section>
  );
};

export default Newsletter;
