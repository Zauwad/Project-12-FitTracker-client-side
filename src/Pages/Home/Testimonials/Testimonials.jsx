// src/Pages/Home/Testimonials.jsx
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { FaQuoteLeft, FaArrowLeft, FaArrowRight, FaStar } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import UseAxios from "../../../hooks/UseAxios";

const Testimonials = () => {
    const axiosInstance = UseAxios();

    // ✅ Fetch reviews from reviews collection
    const { data: reviews = [], isLoading, isError } = useQuery({
        queryKey: ["reviews"],
        queryFn: async () => {
            const res = await axiosInstance.get("/reviews"); // ✅ updated endpoint
            return res.data;
        },
    });

    if (isLoading) return <p className="text-center py-10">Loading testimonials...</p>;
    if (isError) return <p className="text-center py-10 text-red-500">Failed to load testimonials</p>;

    return (
        <section className="py-16 bg-base-100">
            <div className="max-w-6xl mx-auto px-6 text-center">
                <h2 className="text-4xl font-bold text-primary mb-6">What Our Members Say</h2>
                <p className="text-lg text-gray-600 mb-10">
                    Hear from our happy users who are achieving their fitness goals with FitTrackerPro.
                </p>

                <Carousel
                    showStatus={false}
                    showThumbs={false}
                    infiniteLoop
                    autoPlay
                    interval={4000}
                    centerMode
                    centerSlidePercentage={33.3}
                    swipeable
                    emulateTouch
                    renderArrowPrev={(onClickHandler, hasPrev, label) =>
                        hasPrev && (
                            <button
                                onClick={onClickHandler}
                                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-primary text-white p-3 rounded-full shadow-lg hover:bg-primary/80 z-10"
                                title={label}
                            >
                                <FaArrowLeft size={20} />
                            </button>
                        )
                    }
                    renderArrowNext={(onClickHandler, hasNext, label) =>
                        hasNext && (
                            <button
                                onClick={onClickHandler}
                                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-primary text-white p-3 rounded-full shadow-lg hover:bg-primary/80 z-10"
                                title={label}
                            >
                                <FaArrowRight size={20} />
                            </button>
                        )
                    }
                >
                    {reviews.map((r) => (
                        <div
                            key={r._id}
                            className="bg-gray-500 shadow-lg rounded-xl p-6 mx-2 flex flex-col justify-between hover:shadow-2xl transition h-full"
                        >
                            <FaQuoteLeft className="text-3xl text-primary mb-4" />
                            <p className="text-gray-700 italic mb-4">"{r.feedback}"</p>

                            {/* ✅ Star Rating */}
                            <div className="flex justify-center mb-2">
                                {[...Array(5)].map((_, i) => (
                                    <FaStar
                                        key={i}
                                        className={i < r.rating ? "text-yellow-400" : "text-gray-300"}
                                    />
                                ))}
                            </div>

                            <div>
                                <h4 className="text-lg font-semibold">{r.userName}</h4>
                                <span className="text-sm text-gray-400">Reviewed Trainer: {r.trainerName}</span>
                            </div>
                        </div>
                    ))}
                </Carousel>
            </div>
        </section>
    );
};

export default Testimonials;
