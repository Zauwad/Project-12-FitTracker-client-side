import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import UseAxios from "../../hooks/UseAxios";

const Classes = () => {
  const axiosInstance = UseAxios();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState(""); // 🔹 search state
  const limit = 6;

  // ✅ Fetch Classes with search parameter
  const { data, isLoading, isError } = useQuery({
    queryKey: ["allClasses", page, search],
    queryFn: async () => {
      const res = await axiosInstance.get(`/classes?page=${page}&limit=${limit}&search=${search}`);
      return res.data;
    },
    keepPreviousData: true,
  });

  const classes = data?.data || [];
  const totalPages = data?.totalPages || 1;

  if (isLoading) return <p className="text-center py-10">Loading classes...</p>;
  if (isError) return <p className="text-center py-10 text-red-500">Failed to load classes.</p>;

  return (
    <section className="py-16  -200">
      <div className="max-w-6xl mx-auto px-6">

        {/* upper text */}
        <div className="text-center">
          <h3 className="text-[#17CF63] opacity-80 text-xs mb-2 uppercase tracking-widest">classes</h3>

          <h2 className="text-4xl font-extrabold mb-3">All Fitness Classes</h2>

          <h3 className="text-[#9F9FA8] opacity-80 text-sm mb-12">Choose from a variety of classes to achieve your fitness goals!</h3>
        </div>

        {/* ✅ Search Bar */}
        <div className="flex justify-center mb-8">
          <input
            type="text"
            placeholder="🔍 Search classes..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              ; // reset to page 1 when searching
            }}
            className="input input-bordered w-full max-w-md"
          />
        </div>

        {/* ✅ Classes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {classes.map((cls) => (
            <div key={cls._id} className="bg-[#2C2C30]/20 shadow-xl rounded-xl overflow-hidden hover:shadow-2xl transition">
              <img src={cls.image} alt={cls.name} className="w-full h-56 object-cover" />
              <div className="p-5 text-left">
                <h3 className="text-xl font-bold ]">{cls.name}</h3>
                <p className="text-[#9F9FA8] mt-2">{cls.details}</p>
                <p className="mt-3 text-sm text-[#9F9FA8]"><strong>Duration:</strong> {cls.duration}</p>
                <p className="text-sm text-[#9F9FA8]"><strong>Level:</strong> {cls.level}</p>
                <p className="text-sm text-[#9F9FA8]"><strong>Trainer Count:</strong> {cls.trainers?.length}</p>
                <p className="mt-3 font-semibold text-primary opacity-80">🔥 Bookings: {cls.totalBookings || 0}</p>

                {/* ✅ Trainer Avatars */}
                {cls.trainers?.length > 0 && (
                  <div className="flex mt-4 gap-2">
                    {cls.trainers.map((trainer) => (
                      <img
                        key={trainer._id}
                        src={trainer.image}
                        alt={trainer.name}
                        title={trainer.name}
                        onClick={() => navigate(`/trainers/${trainer._id}`)}
                        className="size-10 rounded-full border-2 border-[#17CF63] cursor-pointer hover:scale-110 transition"
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* ✅ Pagination */}
        <div className="flex justify-center gap-3 mt-8">
          <button disabled={page === 1} onClick={() => setPage((p) => p - 1)} className="btn btn-outline btn-primary">Prev</button>
          {[...Array(totalPages).keys()].map((p) => (
            <button key={p} onClick={() => setPage(p + 1)} className={`btn ${page === p + 1 ? "btn-primary" : "btn-outline"}`}>{p + 1}</button>
          ))}
          <button disabled={page === totalPages} onClick={() => setPage((p) => p + 1)} className="btn btn-outline btn-primary">Next</button>
        </div>
      </div>
    </section>
  );
};

export default Classes;
