import React from "react";
import { useLoaderData, useNavigate } from "react-router";

const TrainerDetails = () => {
  const response = useLoaderData();       // ✅ full axios response
  const trainerData = response?.data;     // ✅ extract the actual trainer object
  const navigate = useNavigate();

  if (!trainerData) {
    return <p className="text-center py-10 text-red-500">Trainer not found!</p>;
  }

  return (
    <section className="max-w-5xl mx-auto py-16 px-6">
      {/* Trainer Info */}
      <div className="grid md:grid-cols-2 gap-10  -200 p-6 rounded-xl shadow-lg">
        <div>
          <img
            src={trainerData.image}
            alt={trainerData.name}
            className="w-full h-80 object-cover rounded-xl shadow-md"
          />
        </div>

        <div className="flex flex-col justify-center text-left">
          <h2 className="text-3xl font-bold mb-3">{trainerData.name}</h2>
          <p className="text-[#9F9FA8] mb-2">
            <strong>🏆 Experience:</strong> {trainerData.experience} Years
          </p>
          <p className="text-[#9F9FA8] mb-4">{trainerData.details}</p>

          {trainerData.expertise?.length > 0 && (
            <>
              <h3 className="text-xl font-semibold mt-4 mb-2">Expertise:</h3>
              <ul className="list-disc list-inside text-[#9F9FA8]">
                {trainerData.expertise.map((skill, i) => (
                  <li key={i}>{skill}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>

      {/* Available Slots */}
      <div className="mt-10  -100 p-6 rounded-xl shadow-lg">
        <h3 className="text-2xl font-bold mb-4">🕒 Available Slots</h3>
        {trainerData.availableSlots?.length > 0 ? (
          <div className="flex flex-wrap gap-3">
            {trainerData.availableSlots.map((slot, i) => (
              <button
                key={i}
                onClick={() =>
                  navigate(`/trainer/${trainerData._id}/book`, {
                    state: { slot, trainerName: trainerData.name },
                  })
                }
                className="btn btn-outline btn-primary"
              >
                {slot}
              </button>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No slots available at the moment.</p>
        )}
      </div>

      {/* Be a Trainer Section */}
      <div className="mt-10 bg-blue-50 p-6 rounded-xl shadow-lg text-center">
        <h3 className="text-2xl font-bold text-blue-600 mb-3">Want to Become a Trainer?</h3>
        <p className="text-[#9F9FA8] mb-5">
          If you have expertise in fitness and want to join our team, apply now and start your journey with us!
        </p>
        <button
          onClick={() => navigate("/become-trainer")}
          className="btn btn-primary text-lg"
        >
          🚀 Apply to Be a Trainer
        </button>
      </div>
    </section>
  );
};

export default TrainerDetails;
