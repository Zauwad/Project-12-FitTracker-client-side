import { useQuery } from "@tanstack/react-query";
import UseAxios from "../../../hooks/UseAxios";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router";

const TeamSection = () => {
  const axiosInstance = UseAxios();
  const navigate = useNavigate();

  const { data: trainers = [], isLoading, isError } = useQuery({
    queryKey: ["trainers-home"],
    queryFn: async () => {
      const res = await axiosInstance.get("/trainers");
      return res.data.slice(0, 3);
    },
  });

  if (isLoading) return <p className="text-center py-10">Loading team...</p>;
  if (isError) return <p className="text-center py-10 text-red-500">Failed to load team members</p>;

  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h3 className="text-[#17CF63] opacity-80 text-xs mb-2 uppercase tracking-widest">coaches</h3>
        <h2 className="text-4xl font-extrabold mb-3">Meet elite trainers</h2>
        <h3 className="text-[#9F9FA8] opacity-80 text-sm mb-12">
          Evidence-based programming from certified professionals.
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {trainers.map((trainer) => (
            <div
              key={trainer._id}
              className="card bg-[#2C2C30]/20 shadow-xl p-4 sm:p-6 hover:shadow-2xl transition duration-300 relative group"
            >
              <img
                src={trainer.image}
                alt={trainer.name}
                className="w-full h-40 sm:h-56 object-cover rounded-xl mb-4"
              />

              <h3 className="text-2xl font-bold">{trainer.name}</h3>
              <p className="text-sm text-[#9F9FA8] mb-3">🏆 {trainer.experience} Years Experience</p>
              <p className="text-[#9F9FA8] mb-3">{trainer.details || "No bio available."}</p>

              <div className="text-left mt-2">
                <p className="font-semibold">🎯 Expertise:</p>
                <ul className="list-disc list-inside text-[#9F9FA8]">
                  {trainer.expertise?.length > 0
                    ? trainer.expertise.map((skill, idx) => <li key={idx}>{skill}</li>)
                    : <li>No expertise listed</li>}
                </ul>
              </div>

              {/* Polished Arrow */}
              <div
                onClick={() => navigate(`/trainers/${trainer._id}`)}
                className="absolute bottom-4 right-4 text-[#17CF63] cursor-pointer px-3 py-2
                           
                           transition-transform duration-300
                           hover:scale-110 flex items-center"
                title="View Trainer Details"
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

export default TeamSection;
