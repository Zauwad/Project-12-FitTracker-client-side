import { FaDumbbell, FaUsers, FaChartLine, FaHeartbeat } from "react-icons/fa";

const features = [
  {
    id: 1,
    title: "Personalized Training",
    desc: "Get custom workout plans tailored to your fitness level.",
    icon: <FaDumbbell className="text-4xl" />,
  },
  {
    id: 2,
    title: "Community Support",
    desc: "Join a vibrant fitness community to stay motivated and inspired.",
    icon: <FaUsers className="text-4xl" />,
  },
  {
    id: 3,
    title: "Progress Tracking",
    desc: "Track your daily progress with interactive charts and analytics.",
    icon: <FaChartLine className="text-4xl" />,
  },
  {
    id: 4,
    title: "Health Monitoring",
    desc: "Monitor your heart rate, calories, and other vital stats in real-time.",
    icon: <FaHeartbeat className="text-4xl" />,
  },
];

const FeaturedSection = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h3 className="text-[#17CF63] opacity-80 text-xs mb-2 tracking-widest uppercase">
          FEATURES
        </h3>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-3">
          Why Choose FitTrackerPro?
        </h2>

        <h3 className="text-[#9F9FA8] opacity-80 text-sm sm:text-base mb-8 sm:mb-12">
          All in one place: planning, tracking, and coaching.
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="card bg-[#2C2C30]/20 shadow-xl p-4 sm:p-6 flex flex-col items-center hover:scale-105 transition-transform duration-300"
            >
              <div className="mb-3 text-[#17CF63]">{feature.icon}</div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">
                {feature.title}
              </h3>
              <p className="text-[#9F9FA8] text-sm sm:text-base">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
