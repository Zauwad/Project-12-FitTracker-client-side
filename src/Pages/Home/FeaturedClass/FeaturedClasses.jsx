import { FaFireAlt, FaArrowRight } from "react-icons/fa";
import UseAxios from "../../../hooks/UseAxios";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";

const FeaturedClasses = () => {
  const axiosInstance = UseAxios();
  const navigate = useNavigate();

  const { data: featuredClasses = [], isLoading, isError } = useQuery({
    queryKey: ["featuredClasses"],
    queryFn: async () => {
      const res = await axiosInstance.get("/classes/featured");
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center mt-10">Loading Featured Classes...</p>;
  if (isError) return <p className="text-center mt-10 text-red-500">Failed to load featured classes.</p>;

  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h3 className="text-[#17CF63] opacity-80 text-xs mb-2 uppercase tracking-widest">popular classes</h3>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-3">Train your way</h2>
        <h3 className="text-[#9F9FA8] opacity-80 text-sm sm:text-base mb-8 sm:mb-12">
          Curated sessions designed for performance and longevity.
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {featuredClasses.map((cls) => (
            <div
              key={cls._id}
              className="card bg-[#2C2C30]/20 shadow-xl p-6 text-left hover:shadow-xl transition relative group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-bold">{cls.name}</h3>
                  <FaFireAlt className="text-red-500 text-2xl" />
                </div>
                <p className="text-[#9F9FA8] mb-4">{cls.details}</p>
                <span className="text-sm font-semibold text-[#17CF63] opacity-80">
                  🔥 {cls.totalBookings || 0} Bookings
                </span>
              </div>

              {/* Polished Arrow */}
              <div
                onClick={() => navigate(`/classes/${cls._id}`)}
                className="absolute bottom-4 right-4 text-[#17CF63] cursor-pointer px-3 py-2
                            transition-transform duration-300
                           hover:scale-110  flex items-center"
                title="View Class Details"
              >
                <FaArrowRight size={16} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedClasses;
