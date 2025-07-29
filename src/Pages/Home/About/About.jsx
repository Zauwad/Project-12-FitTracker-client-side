// src/Pages/Home/About.jsx
import { FaDumbbell, FaUsers, FaHeartbeat } from "react-icons/fa";

const About = () => {
  return (
    <section className="bg-base-200 py-16">
      <div className="max-w-6xl mx-auto px-6 text-center">
        
        {/* Heading */}
        <h2 className="text-4xl font-bold text-primary mb-4">
          About <span className="text-secondary">FitTrackerPro</span>
        </h2>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-10">
          FitTrackerPro is your ultimate fitness companion, designed to track workouts, 
          set achievable goals, and build a strong fitness community. Our platform blends 
          technology with expert guidance to help you stay motivated and healthy.
        </p>
      </div>
    </section>
  );
};

export default About;
