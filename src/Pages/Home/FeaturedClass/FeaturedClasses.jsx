// src/Pages/Home/FeaturedClasses.jsx
import { FaFireAlt } from "react-icons/fa";
import UseAxios from "../../../hooks/UseAxios";
import { useQuery } from "@tanstack/react-query";

const FeaturedClasses = () => {
    const axiosInstance = UseAxios();

    // ✅ Fetch only top 6 classes sorted by bookings
    const { data: featuredClasses = [], isLoading, isError } = useQuery({
        queryKey: ["featuredClasses"],
        queryFn: async () => {
            const res = await axiosInstance.get("/classes/featured"); // backend will handle sorting/limit
            return res.data;
        },
    });

    if (isLoading) return <p className="text-center mt-10">Loading Featured Classes...</p>;
    if (isError) return <p className="text-center mt-10 text-red-500">Failed to load featured classes.</p>;

    return (
        <section className="py-16 bg-base-200">
            <div className="max-w-6xl mx-auto px-6 text-center">
                <h2 className="text-4xl font-bold text-primary mb-6">🔥 Featured Classes</h2>
                <p className="text-lg text-gray-600 mb-10">
                    Check out our top 6 most booked classes that members love!
                </p>

                {/* ✅ Grid Layout */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {featuredClasses.map((cls) => (
                        <div
                            key={cls._id}
                            className="bg-gray-500 shadow-md p-6 rounded-xl text-left hover:shadow-xl transition"
                        >
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="text-xl font-bold text-gray-800">{cls.name}</h3>
                                <FaFireAlt className="text-red-500 text-2xl" />
                            </div>
                            <p className="text-gray-600 mb-4">{cls.details}</p>
                            <span className="text-sm font-semibold text-primary">
                                🔥 {cls.totalBookings || 0} Bookings
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedClasses;
