import React, { useState } from "react";
import Select from "react-select";
import UseAxios from "../../hooks/UseAxios";
import useAuth from "../../hooks/UseAuth";

const BecomeTrainer = () => {
    const axiosInstance = UseAxios();
    const { user } = useAuth();

    const [formData, setFormData] = useState({
        name: user?.displayName || "",
        email: user?.email || "",
        age: "",
        experience: "",
        image: "",
        expertise: [],
        availableDays: [],
        availableSlots: "", // store as string, split later
        details: "",
    });

    const skillOptions = [
        "Strength Training", "Yoga", "HIIT", "Pilates",
        "Nutrition Coaching", "Cardio", "Flexibility Training"
    ];

    const daysOptions = [
        { value: "Sunday", label: "Sunday" },
        { value: "Monday", label: "Monday" },
        { value: "Tuesday", label: "Tuesday" },
        { value: "Wednesday", label: "Wednesday" },
        { value: "Thursday", label: "Thursday" },
        { value: "Friday", label: "Friday" },
        { value: "Saturday", label: "Saturday" },
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSkillChange = (skill) => {
        setFormData((prev) => {
            const exists = prev.expertise.includes(skill);
            return {
                ...prev,
                expertise: exists
                    ? prev.expertise.filter((s) => s !== skill)
                    : [...prev.expertise, skill],
            };
        });
    };

    const handleDaysChange = (selectedOptions) => {
        setFormData({ ...formData, availableDays: selectedOptions.map((d) => d.value) });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            ...formData,
            availableSlots: formData.availableSlots
                .split(",")
                .map(slot => slot.trim())
                .filter(Boolean), // convert to array
            status: "pending",
            socials: {},
            createdAt: new Date(),
        };

        try {
            await axiosInstance.post("/trainers/apply", payload);
            alert("✅ Application submitted successfully! Status: Pending");
        } catch (error) {
            console.error(error);
            alert("❌ Failed to submit application");
        }
    };

    return (
        <section className="max-w-3xl mx-auto bg-gray-500 p-8 rounded-xl shadow-lg mt-10">
            <h2 className="text-3xl font-bold text-center mb-6">🚀 Apply to Become a Trainer</h2>

            <form onSubmit={handleSubmit} className="space-y-5">
                {/* Full Name */}
                <div>
                    <label className="block font-semibold mb-1">Full Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full border px-3 py-2 rounded"
                    />
                </div>

                {/* Email */}
                <div>
                    <label className="block font-semibold mb-1">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        readOnly
                        className="w-full border px-3 py-2 rounded bg-gray-100 text-black"
                    />
                </div>

                {/* Age */}
                <div>
                    <label className="block font-semibold mb-1">Age</label>
                    <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        required
                        className="w-full border px-3 py-2 rounded"
                    />
                </div>

                {/* Experience */}
                <div>
                    <label className="block font-semibold mb-1">Experience (in years)</label>
                    <input
                        type="number"
                        name="experience"
                        value={formData.experience}
                        onChange={handleChange}
                        required
                        className="w-full border px-3 py-2 rounded"
                    />
                </div>

                {/* Profile Image */}
                <div>
                    <label className="block font-semibold mb-1">Profile Image URL</label>
                    <input
                        type="url"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        required
                        className="w-full border px-3 py-2 rounded"
                    />
                </div>

                {/* Skills */}
                <div>
                    <label className="block font-semibold mb-2">Skills</label>
                    <div className="grid grid-cols-2 gap-2">
                        {skillOptions.map((skill, i) => (
                            <label key={i} className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    checked={formData.expertise.includes(skill)}
                                    onChange={() => handleSkillChange(skill)}
                                />
                                <span>{skill}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Available Days */}
                <div>
                    <label className="block font-semibold mb-1">Available Days</label>
                    <Select
                        options={daysOptions}
                        className="text-black"
                        isMulti
                        onChange={handleDaysChange}
                        placeholder="Select available days"
                    />
                </div>

                {/* Available Slots (comma separated) */}
                <div>
                    <label className="block font-semibold mb-1">Available Slots</label>
                    <input
                        type="text"
                        name="availableSlots"
                        value={formData.availableSlots}
                        onChange={handleChange}
                        placeholder="e.g. 10AM-11AM, 2PM-3PM"
                        className="w-full border px-3 py-2 rounded"
                    />
                    <small className="text-gray-200">Separate slots with commas.</small>
                </div>

                {/* Other Info */}
                <div>
                    <label className="block font-semibold mb-1">Other Info</label>
                    <textarea
                        name="details"
                        value={formData.details}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                        rows="3"
                    />
                </div>

                {/* Apply Button */}
                <button type="submit" className="btn btn-primary w-full text-lg">
                    ✅ Apply
                </button>
            </form>
        </section>
    );
};

export default BecomeTrainer;
