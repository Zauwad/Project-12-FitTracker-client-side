import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import UseAxios from "../../../../hooks/UseAxios";

const AddNewClass = () => {
  const axiosInstance = UseAxios();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    image: "",
    details: "",
    duration: "",
    level: "",
    trainers: [],
    totalBookings: 0,
  });

  const [trainersList, setTrainersList] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch trainers for selection
  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const res = await axiosInstance.get("/trainers");
        setTrainersList(res.data);
      } catch (err) {
        console.error("Failed to fetch trainers", err);
      }
    };
    fetchTrainers();
  }, [axiosInstance]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle multi-select trainers
  const handleTrainerSelect = (e) => {
    const selectedIds = Array.from(e.target.selectedOptions, (opt) => opt.value);
    const selectedTrainers = trainersList.filter((t) => selectedIds.includes(t._id));
    const formatted = selectedTrainers.map((t) => ({
      _id: t._id,
      name: t.name,
      image: t.image,
    }));
    setFormData((prev) => ({ ...prev, trainers: formatted }));
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.image || !formData.details || !formData.duration || !formData.level) {
      alert("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);

      const newClass = {
        ...formData,
        totalBookings: Number(formData.totalBookings) || 0,
        createdAt: new Date(),
      };

      await axiosInstance.post("/classes", newClass);
      alert("Class added successfully!");
      navigate("/dashboard/add-class");
    } catch (err) {
      alert("Failed to add class. Try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-gray-500 p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Add New Class</h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="block font-semibold mb-1">Class Name *</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Image URL *</label>
          <input
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Details *</label>
          <textarea
            name="details"
            value={formData.details}
            onChange={handleChange}
            rows="4"
            className="w-full border p-2 rounded"
            required
          ></textarea>
        </div>

        <div>
          <label className="block font-semibold mb-1">Duration *</label>
          <input
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="e.g., 45 minutes"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Level *</label>
          <input
            name="level"
            value={formData.level}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="e.g., Beginner, Intermediate, Advanced"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Trainers *</label>
          <select
            multiple
            className="w-full border p-2 rounded h-40"
            onChange={handleTrainerSelect}
          >
            {trainersList.map((trainer) => (
              <option key={trainer._id} value={trainer._id}>
                {trainer.name}
              </option>
            ))}
          </select>
          <small className="text-gray-600">
            Hold CTRL (Windows) or CMD (Mac) to select multiple trainers.
          </small>
        </div>

        <div>
          <label className="block font-semibold mb-1">Total Bookings (default 0)</label>
          <input
            type="number"
            name="totalBookings"
            value={formData.totalBookings}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            min="0"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition w-full"
        >
          {loading ? "Adding..." : "Add Class"}
        </button>
      </form>
    </div>
  );
};

export default AddNewClass;
