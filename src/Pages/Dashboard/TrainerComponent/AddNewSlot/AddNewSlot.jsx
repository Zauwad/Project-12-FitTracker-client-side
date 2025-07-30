import React, { useEffect, useState } from "react";
import Select from "react-select";
import UseAxios from "../../../../hooks/UseAxios";
import useAuth from "../../../../hooks/UseAuth";

const AddNewSlot = () => {
    const axiosInstance = UseAxios();
    const { user } = useAuth();

    const [trainer, setTrainer] = useState(null);
    const [classes, setClasses] = useState([]);
    const [selectedDays, setSelectedDays] = useState([]);
    const [slotName, setSlotName] = useState("");
    const [slotTime, setSlotTime] = useState("");
    const [selectedClass, setSelectedClass] = useState(null);
    const [otherInfo, setOtherInfo] = useState("");

    // ✅ Fetch trainer data by logged-in user email
    useEffect(() => {
        if (user?.email) {
            axiosInstance
                .get(`/trainers/email/${user.email}`)
                .then((res) => {
                    console.log("Trainer Data:", res.data);
                    setTrainer(res.data);
                })
                .catch((err) => console.error("Failed to fetch trainer:", err));
        }
    }, [user, axiosInstance]);

    // ✅ Fetch all classes from admin's collection
    useEffect(() => {
        axiosInstance
            .get("/classes")
            .then((res) => {
                console.log("Classes:", res.data);
                setClasses(res.data.data || []);
            })
            .catch((err) => console.error("Failed to fetch classes:", err));
    }, [axiosInstance]);

    // ✅ Prepare options for React Select
    const fallbackDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    const dayOptions = (trainer?.availableDays?.length ? trainer.availableDays : fallbackDays)
        .map((d) => ({ value: d, label: d }));

    const classOptions = classes.map((c) => ({ value: c.name, label: c.name }));

    // ✅ Handle multi-day selection
    const handleDaysChange = (selected) => {
        setSelectedDays(selected ? selected.map((s) => s.value) : []);
    };

    // ✅ Handle class selection
    const handleClassChange = (selected) => {
        setSelectedClass(selected?.value || null);
    };

    // ✅ Submit new slot
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!slotName || !slotTime || !selectedDays.length || !selectedClass) {
            alert("⚠️ Please fill all required fields.");
            return;
        }

        const newSlot = {
            slotName,
            slotTime,
            days: selectedDays,
            className: selectedClass,
            otherInfo,
        };

        try {
            await axiosInstance.post(`/trainers/${trainer._id}/slots`, newSlot);
            alert("✅ New slot added successfully!");
        } catch (err) {
            console.error("Failed to add slot:", err);
            alert("❌ Failed to add slot. Try again.");
        }
    };

    if (!trainer) {
        return <p className="text-center py-10">Loading trainer info...</p>;
    }

    return (
        <section className="max-w-4xl mx-auto p-6 bg-base-200 rounded-xl shadow-lg mt-10">
            <h2 className="text-3xl font-bold text-center mb-6">➕ Add New Slot</h2>

            {/* Trainer Info (Read-Only) */}
            <div className="bg-base-100 p-4 rounded-lg mb-6">
                <p><strong>Name:</strong> {trainer.name}</p>
                <p><strong>Email:</strong> {trainer.email}</p>
                <p><strong>Experience:</strong> {trainer.experience} Years</p>
            </div>

            {/* Slot Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
                {/* Select Days */}
                <div>
                    <label className="block font-semibold mb-1">Select Days</label>
                    <Select
                        options={dayOptions}
                        className="text-black"
                        isMulti
                        onChange={handleDaysChange}
                        placeholder={dayOptions.length ? "Select available days..." : "No days available"}
                        isDisabled={!dayOptions.length}
                    />
                </div>

                {/* Slot Name */}
                <div>
                    <label className="block font-semibold mb-1">Slot Name</label>
                    <input
                        type="text"
                        value={slotName}
                        onChange={(e) => setSlotName(e.target.value)}
                        placeholder="e.g. Morning Slot"
                        className="input input-bordered w-full"
                        required
                    />
                </div>

                {/* Slot Time */}
                <div>
                    <label className="block font-semibold mb-1">Slot Time</label>
                    <input
                        type="text"
                        value={slotTime}
                        onChange={(e) => setSlotTime(e.target.value)}
                        placeholder="e.g. 1 hour"
                        className="input input-bordered w-full"
                        required
                    />
                </div>

                {/* Classes Dropdown */}
                <div>
                    <label className="block font-semibold mb-1">Select Class</label>
                    <Select
                        className="text-black"
                        options={classOptions}
                        onChange={handleClassChange}
                        placeholder="Select a class"
                    />
                </div>

                {/* Other Info */}
                <div>
                    <label className="block font-semibold mb-1">Other Info</label>
                    <textarea
                        value={otherInfo}
                        onChange={(e) => setOtherInfo(e.target.value)}
                        placeholder="Any additional info..."
                        className="textarea textarea-bordered w-full"
                    ></textarea>
                </div>

                {/* Submit */}
                <button type="submit" className="btn btn-primary w-full text-lg">
                    ➕ Add Slot
                </button>
            </form>
        </section>
    );
};

export default AddNewSlot;
