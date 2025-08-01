import { useQuery } from "@tanstack/react-query";
import UseAxios from "../../../hooks/UseAxios";

const TeamSection = () => {
    const axiosInstance = UseAxios();

    // ✅ Fetch trainers (only take top 3)
    const { data: trainers = [], isLoading, isError } = useQuery({
        queryKey: ["trainers-home"],
        queryFn: async () => {
            const res = await axiosInstance.get("/trainers");
            return res.data.slice(0, 3); // take first 3 trainers
        },
    });

    if (isLoading) return <p className="text-center py-10">Loading team...</p>;
    if (isError) return <p className="text-center py-10 text-red-500">Failed to load team members</p>;

    return (
        <section className="py-16 bg-base-200">
            <div className="max-w-6xl mx-auto px-6 text-center">
                <h2 className="text-4xl font-bold text-primary mb-4">💪 Meet Our Expert Trainers</h2>
                <p className="text-gray-600 mb-10">
                    Our trainers are highly qualified professionals, ready to guide you towards your fitness goals.
                </p>

                {/* Trainers Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {trainers.map((trainer) => (
                        <div 
                            key={trainer._id} 
                            className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-2xl transition duration-300"
                        >
                            {/* Trainer Image */}
                            <img
                                src={trainer.image}
                                alt={trainer.name}
                                className="w-full h-56 object-cover rounded-xl mb-4"
                            />

                            {/* Trainer Info */}
                            <h3 className="text-2xl font-bold text-gray-800">{trainer.name}</h3>
                            <p className="text-sm text-gray-500 mb-3">🏆 {trainer.experience} Years Experience</p>

                            {/* Brief Bio */}
                            <p className="text-gray-600 mb-3">{trainer.details || "No bio available."}</p>

                            {/* Expertise */}
                            <div className="text-left mt-2">
                                <p className="font-semibold text-gray-700">🎯 Expertise:</p>
                                <ul className="list-disc list-inside text-gray-600">
                                    {trainer.expertise?.length > 0 ? (
                                        trainer.expertise.map((skill, idx) => <li key={idx}>{skill}</li>)
                                    ) : (
                                        <li>No expertise listed</li>
                                    )}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TeamSection;
