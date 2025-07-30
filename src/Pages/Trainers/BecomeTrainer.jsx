import React, { useState } from "react";
import Select from "react-select";
import useAuth from "../../hooks/UseAuth";
import UseAxios from "../../hooks/UseAxios";

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
    availableSlots: "",
    details: "",
    socials: { facebook: "", instagram: "", linkedin: "" },
  });

  const skillOptions = [
    "Strength Training Basics",
    "Yoga for Beginners",
    "HIIT Burn",
    "Functional Fitness",
    "Dance & Zumba Energy",
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

  // ✅ Generic change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Social links
  const handleSocialChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      socials: { ...prev.socials, [name]: value },
    }));
  };

  // ✅ Expertise checkboxes
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

  // ✅ Available Days (Multi-Select)
  const handleDaysChange = (selectedOptions) => {
    setFormData((prev) => ({
      ...prev,
      availableDays: selectedOptions.map((d) => d.value),
    }));
  };

  // ✅ Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();

    const timesArr = formData.availableSlots
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    // Create combined slots: e.g., Tuesday 4PM
    const combinedSlots = [];
    formData.availableDays.forEach((day) => {
      timesArr.forEach((time) => combinedSlots.push(`${day} ${time}`));
    });

    // Remove empty socials
    const filteredSocials = Object.fromEntries(
      Object.entries(formData.socials).filter(([_, v]) => v.trim() !== "")
    );

    // ✅ Payload includes everything explicitly
    const payload = {
      name: formData.name,
      email: formData.email,
      age: Number(formData.age),
      experience: Number(formData.experience),
      image: formData.image,
      expertise: formData.expertise,          // ✅ saved
      availableDays: formData.availableDays,  // ✅ saved
      availableSlots: combinedSlots,          // ✅ saved
      details: formData.details,
      socials: filteredSocials,
      status: "pending",
      createdAt: new Date(),
    };

    try {
      await axiosInstance.post("/trainers/apply", payload);
      alert("✅ Application submitted successfully!");
    } catch (error) {
      console.error(error);
      alert("❌ Failed to submit application");
    }
  };

  return (
    <section className="max-w-3xl mx-auto bg-gray-500 p-8 rounded-xl shadow-lg mt-10">
      <h2 className="text-3xl font-bold text-center mb-6">🚀 Apply to Become a Trainer</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Basic Info */}
        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" required className="w-full border px-3 py-2 rounded" />
        <input type="email" name="email" value={formData.email} readOnly className="w-full border px-3 py-2 rounded bg-gray-200" />
        <input type="number" name="age" value={formData.age} onChange={handleChange} placeholder="Age" required className="w-full border px-3 py-2 rounded" />
        <input type="number" name="experience" value={formData.experience} onChange={handleChange} placeholder="Experience (years)" required className="w-full border px-3 py-2 rounded" />
        <input type="url" name="image" value={formData.image} onChange={handleChange} placeholder="Profile Image URL" required className="w-full border px-3 py-2 rounded" />

        {/* Skills */}
        <div>
          <label className="font-semibold">Skills</label>
          <div className="grid grid-cols-2 gap-2">
            {skillOptions.map((skill) => (
              <label key={skill} className="flex items-center space-x-2">
                <input type="checkbox" checked={formData.expertise.includes(skill)} onChange={() => handleSkillChange(skill)} />
                <span>{skill}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Available Days */}
        <Select
          options={daysOptions}
          isMulti
          value={daysOptions.filter((d) => formData.availableDays.includes(d.value))}
          onChange={handleDaysChange}
          placeholder="Select Available Days"
          className="text-black"
        />

        {/* Available Time Slots */}
        <input type="text" name="availableSlots" value={formData.availableSlots} onChange={handleChange} placeholder="e.g. 10:00 AM, 5:00 PM" className="w-full border px-3 py-2 rounded" />

        {/* Details */}
        <textarea name="details" value={formData.details} onChange={handleChange} rows="3" placeholder="Additional Info" className="w-full border px-3 py-2 rounded" />

        {/* Social Links */}
        <input type="url" name="facebook" value={formData.socials.facebook} onChange={handleSocialChange} placeholder="Facebook (Optional)" className="w-full border px-3 py-2 rounded" />
        <input type="url" name="instagram" value={formData.socials.instagram} onChange={handleSocialChange} placeholder="Instagram (Optional)" className="w-full border px-3 py-2 rounded" />
        <input type="url" name="linkedin" value={formData.socials.linkedin} onChange={handleSocialChange} placeholder="LinkedIn (Optional)" className="w-full border px-3 py-2 rounded" />

        <button type="submit" className="btn btn-primary w-full text-lg mt-3">✅ Apply</button>
      </form>
    </section>
  );
};

export default BecomeTrainer;
