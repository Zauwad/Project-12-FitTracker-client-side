import React from "react";
import { useQuery } from "@tanstack/react-query";
import UseAxios from "../../../../hooks/UseAxios";

const SubscribersDashboard = () => {
    const axiosInstance = UseAxios();

    // Fetch all newsletter subscribers
    const { data: subscribers = [], isLoading, isError } = useQuery({
        queryKey: ["newsletterSubscribers"],
        queryFn: async () => {
            const res = await axiosInstance.get("/newsletter/subscribers");
            return res.data;
        },
    });

    if (isLoading) return <p className="text-center py-10">Loading subscribers...</p>;
    if (isError) return <p className="text-center py-10 text-red-500">Failed to load subscribers.</p>;

    return (
        <section className="max-w-6xl mx-auto p-6 bg-gray-500 rounded-lg shadow-lg mt-10">
            <h2 className="text-3xl font-bold mb-6 text-center">📬 Newsletter Subscribers</h2>

            {subscribers.length === 0 ? (
                <p className="text-center text-gray-600">No subscribers found.</p>
            ) : (
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-500">
                            <th className="border border-gray-300 p-3 text-left">Name</th>
                            <th className="border border-gray-300 p-3 text-left">Email</th>
                            <th className="border border-gray-300 p-3 text-left">Subscribed On</th>
                        </tr>
                    </thead>
                    <tbody>
                        {subscribers.map((sub) => (
                            <tr key={sub._id} className="hover:bg-gray-100">
                                <td className="border border-gray-300 p-3">{sub.name}</td>
                                <td className="border border-gray-300 p-3">{sub.email}</td>
                                <td className="border border-gray-300 p-3">
                                    {new Date(sub.createdAt).toLocaleDateString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </section>
    );
};

export default SubscribersDashboard;
