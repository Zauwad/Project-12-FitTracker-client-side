import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import UseAxios from "../../hooks/UseAxios";
import useAuth from "../../hooks/UseAuth";


const Community = () => {
    const axiosInstance = UseAxios();
    const { user } = useAuth(); // Get logged-in user
    const [page, setPage] = useState(1);

    // Fetch paginated forum posts
    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: ["forum", page],
        queryFn: async () => {
            const res = await axiosInstance.get(`/forum?page=${page}`);
            return res.data;
        },
    });

    const handleVote = async (postId, type) => {
        if (!user) {
            alert("You need to log in to vote!");
            return;
        }
        await axiosInstance.patch(`/forum/${postId}/vote`, {
            userId: user.id,
            voteType: type,
        });
        refetch();
    };

    if (isLoading) return <p className="text-center">Loading posts...</p>;
    if (isError) return <p className="text-center text-red-500">Error loading forum</p>;

    const { posts, totalPages, currentPage } = data;

    return (
        <section className="max-w-5xl mx-auto py-10 px-4">
            <h2 className="text-3xl font-bold mb-6 text-center">📖 Forum Discussions</h2>

            {/* Posts List */}
            <div className="grid gap-6">
                {posts.map((post) => (
                    <div key={post._id} className="border rounded-lg p-4 shadow-md bg-gray-500">
                        <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                            {post.title}
                            {post.role === "admin" && (
                                <span className="px-2 py-1 text-xs bg-red-600 text-white rounded">Admin</span>
                            )}
                            {post.role === "trainer" && (
                                <span className="px-2 py-1 text-xs bg-blue-600 text-white rounded">Trainer</span>
                            )}
                        </h3>
                        <p className="text-gray-700 mb-3">{post.content}</p>

                        {/* Voting */}
                        <div className="flex items-center gap-3">
                            <button
                                className="btn btn-outline btn-success"
                                onClick={() => handleVote(post._id, "up")}
                            >
                                👍 {post.upvotes || 0}
                            </button>
                            <button
                                className="btn btn-outline btn-error"
                                onClick={() => handleVote(post._id, "down")}
                            >
                                👎 {post.downvotes || 0}
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-6 gap-2">
                {[...Array(totalPages)].map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setPage(i + 1)}
                        className={`btn ${currentPage === i + 1 ? "btn-primary" : "btn-outline"}`}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>
        </section>
    );
};

export default Community;
