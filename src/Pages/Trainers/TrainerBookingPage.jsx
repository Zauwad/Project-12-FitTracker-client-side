import { useParams, useLocation, useNavigate } from "react-router";
import { useState } from "react";
import UseAxios from "../../hooks/UseAxios"; // Your axios instance hook
import { useQuery } from "@tanstack/react-query";

const TrainerBookingPage = () => {
  const { trainerId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const axiosInstance = UseAxios();

  // Selected slot passed via navigate state
  const selectedSlot = location.state?.slot || "Not Selected";

  // Fetch trainer data by ID using react-query
  const { data: trainerData, isLoading, isError } = useQuery({
    queryKey: ["trainer", trainerId],
    queryFn: async () => {
      const res = await axiosInstance.get(`/trainers/${trainerId}`);
      return res.data;
    },
    enabled: !!trainerId, // Only run query if trainerId exists
  });

  // Use fetched trainer name or fallback
  const trainerName = trainerData?.name || "Trainer Name";

  const [selectedPackage, setSelectedPackage] = useState(null);

  const packages = [
    {
      name: "Basic Membership",
      benefits: [
        "Access to gym facilities during regular operating hours.",
        "Use of cardio and strength training equipment.",
      ],
      price: 10,
    },
    {
      name: "Standard Membership",
      benefits: [
        "All benefits of the Basic Membership.",
        "Access to group fitness classes such as yoga, spinning, and Zumba.",
        "Access to locker rooms and showers.",
      ],
      price: 50,
    },
    {
      name: "Premium Membership",
      benefits: [
        "All benefits of the Standard Membership.",
        "Access to personal training sessions with certified trainers.",
        "Use of additional amenities like a sauna or steam room.",
        "Discounts on additional services such as massage therapy or nutrition counseling.",
      ],
      price: 100,
    },
  ];

  const handleJoinNow = () => {
    if (!selectedPackage) {
      alert("Please select a membership package!");
      return;
    }
    navigate("/payment", {
      state: {
        trainerId,
        trainerName,
        selectedSlot,
        package: selectedPackage,
      },
    });
  };

  if (isLoading) {
    return <p className="text-center py-10">Loading trainer info...</p>;
  }

  if (isError) {
    return <p className="text-center py-10 text-red-500">Failed to load trainer data.</p>;
  }

  return (
    <section className="py-16 bg-base-200 min-h-screen">
      <div className="max-w-4xl mx-auto px-6 bg-gray-500 p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-primary mb-4">
          Booking with {trainerName}
        </h2>
        <p className="text-lg mb-6">
          Selected Slot: <span className="font-semibold">{selectedSlot}</span>
        </p>

        {/* Classes Info (Dummy for now) */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Available Classes</h3>
          <ul className="list-disc list-inside text-gray-700">
            <li>Strength Training</li>
            <li>Yoga & Flexibility</li>
            <li>HIIT & Cardio</li>
          </ul>
        </div>

        {/* Membership Packages Table */}
        <h3 className="text-2xl font-semibold mb-4">Choose a Membership Plan</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {packages.map((pkg) => (
            <div
              key={pkg.name}
              className={`border p-4 rounded-lg cursor-pointer hover:shadow-xl transition ${
                selectedPackage?.name === pkg.name ? "border-primary shadow-lg" : "border-gray-300"
              }`}
              onClick={() => setSelectedPackage(pkg)}
            >
              <h4 className="text-xl font-bold mb-2">{pkg.name}</h4>
              <ul className="text-sm text-gray-600 mb-3">
                {pkg.benefits.map((b, i) => (
                  <li key={i}>✅ {b}</li>
                ))}
              </ul>
              <p className="text-lg font-semibold text-primary">${pkg.price}</p>
            </div>
          ))}
        </div>

        {/* Join Now Button */}
        <button onClick={handleJoinNow} className="btn btn-primary w-full text-lg">
          Join Now
        </button>
      </div>
    </section>
  );
};

export default TrainerBookingPage;
