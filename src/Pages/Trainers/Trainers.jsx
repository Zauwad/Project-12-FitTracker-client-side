import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { useNavigate } from "react-router";
import UseAxios from "../../hooks/UseAxios";
import { useQuery } from "@tanstack/react-query";

const Trainers = () => {
    const navigate = useNavigate();
    const axiosInstance = UseAxios();

    // ✅ Fetch trainers from backend
    const { data: trainers = [], isLoading, isError } = useQuery({
        queryKey: ["trainers"],
        queryFn: async () => {
            const res = await axiosInstance.get("/trainers");
            return res.data;
        },
    });

    if (isLoading) return <p className="text-center py-10">Loading trainers...</p>;
    if (isError) return <p className="text-center py-10 text-red-500">Failed to load trainers</p>;

    return (
        <section className="py-16  -200">
            <div className="max-w-6xl mx-auto px-6 text-center">

                <h3 className="text-[#17CF63] opacity-80 text-xs mb-2 uppercase tracking-widest">coaches</h3>
                
                <h2 className="text-4xl font-extrabold mb-3">Meet Our Trainers</h2>

                <h3 className="text-[#9F9FA8] opacity-80 text-sm mb-12">Learn from experienced professionals who are here to guide your fitness journey.</h3>

                {/* Trainers Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {trainers.map((trainer) => (
                        <div
                            key={trainer._id}
                            className="card bg-[#2C2C30]/20 shadow-xl rounded-xl p-6 hover:shadow-2xl transition duration-300"
                        >
                            {/* Trainer Image */}
                            <img
                                src={trainer.image}
                                alt={trainer.name}
                                className="w-full h-60 object-cover rounded-xl mb-4"
                            />

                            {/* Trainer Info */}
                            <h3 className="text-2xl font-bold ">{trainer.name}</h3>
                            <p className="text-[#9F9FA8] mt-1">🏆 {trainer.experience} Years Experience</p>

                            {/* Days & Classes */}
                            <div className="text-sm text-[#9F9FA8] mt-3 text-left">
                                <p><strong>📅 Days:</strong> {trainer.availableDays?.join(", ") || "N/A"}</p>
                                <p><strong>🎯 Classes:</strong> {trainer.expertise?.join(", ") || "N/A"}</p>
                            </div>

                            {/* Available Slots */}
                            <div className="text-sm text-[#9F9FA8] mt-3 text-left">
                                <p className="font-semibold">🕒 Available Slots:</p>
                                {trainer.availableSlots?.length > 0 ? (
                                    <ul className="list-disc list-inside">
                                        {trainer.availableSlots.map((slot, i) => (
                                            <li key={i}>{slot}</li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>No available slots.</p>
                                )}
                            </div>

                            {/* Social Icons */}
                            <div className="flex justify-center gap-4 my-3 text-primary text-xl">
                                {trainer.socials?.facebook && (
                                    <a href={trainer.socials.facebook} target="_blank" rel="noreferrer">
                                        <FaFacebookF />
                                    </a>
                                )}
                                {trainer.socials?.instagram && (
                                    <a href={trainer.socials.instagram} target="_blank" rel="noreferrer">
                                        <FaInstagram />
                                    </a>
                                )}
                                {trainer.socials?.linkedin && (
                                    <a href={trainer.socials.linkedin} target="_blank" rel="noreferrer">
                                        <FaLinkedinIn />
                                    </a>
                                )}
                            </div>

                            {/* Know More Button */}
                            <button
                                onClick={() => navigate(`/trainers/${trainer._id}`)}
                                className="btn btn-primary mt-3 w-full"
                            >
                                Know More
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Trainers;
