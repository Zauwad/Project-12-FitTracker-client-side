import { FaDumbbell, FaUsers, FaChartLine, FaHeartbeat } from "react-icons/fa";

const features = [
    {
        id: 1,
        title: "Personalized Training",
        desc: "Get custom workout plans tailored to your fitness level and goals.",
        icon: <FaDumbbell className="text-4xl text-primary" />,
    },
    {
        id: 2,
        title: "Community Support",
        desc: "Join a vibrant fitness community to stay motivated and inspired.",
        icon: <FaUsers className="text-4xl text-primary" />,
    },
    {
        id: 3,
        title: "Progress Tracking",
        desc: "Track your daily progress with interactive charts and analytics.",
        icon: <FaChartLine className="text-4xl text-primary" />,
    },
    {
        id: 4,
        title: "Health Monitoring",
        desc: "Monitor your heart rate, calories, and other vital stats in real-time.",
        icon: <FaHeartbeat className="text-4xl text-primary" />,
    },
];

const FeaturedSection = () => {
    return (
        <section className="py-12 bg-base-200">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold mb-8 text-primary">Why Choose FitTrackerPro?</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature) => (
                        <div
                            key={feature.id}
                            className="card bg-base-100 shadow-xl p-6 flex flex-col items-center hover:scale-105 transition-transform duration-300"
                        >
                            <div className="mb-4">{feature.icon}</div>
                            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                            <p className="text-gray-600">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedSection;
