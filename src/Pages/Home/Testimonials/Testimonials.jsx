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
        <section className="py-12 sm:py-16 lg:py-20">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

                <h3 className="text-[#17CF63] opacity-80 text-xs mb-2 uppercase tracking-widest">Reviews</h3>
                
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-3">What Our Members Say</h2>

                <h3 className="text-[#9F9FA8] opacity-80 text-sm sm:text-base mb-8 sm:mb-12">Hear from our happy users who are achieving their fitness goals with FitTrackerPro.</h3>

                <Carousel
                    showStatus={false}
                    showThumbs={false}
                    infiniteLoop
                    autoPlay
                    interval={4000}
                    centerMode
                    centerSlidePercentage={80}
                    swipeable
                    emulateTouch
                    renderArrowPrev={(onClickHandler, hasPrev, label) =>
                        hasPrev && (
                            <button
                                onClick={onClickHandler}
                                className="absolute left-0 top-1/2 transform -translate-y-1/2 btn-primary text-white p-3 flex items-center justify-center  rounded-full shadow-lg hover:bg-primary/80 z-10 transition-transform duration-300"
                                title={label}
                            >
                                <FaArrowLeft size={10} />
                            </button>
                        )
                    }
                    renderArrowNext={(onClickHandler, hasNext, label) =>
                        hasNext && (
                            <button
                                onClick={onClickHandler}
                                className="absolute right-0 top-1/2 transform -translate-y-1/2 btn-primary text-white p-3 flex items-center justify-center rounded-full shadow-lg hover:bg-primary/80 z-10"
                                title={label}
                            >
                                <FaArrowRight size={10} />
                            </button>
                        )
                    }
                >
                    {reviews.map((r) => (
                        <div
                            key={r._id}
                            className="card bg-[#2C2C30]/20 shadow-xl p-6 mx-2 flex flex-col justify-between hover:shadow-2xl transition h-full"
                        >
                            <FaQuoteLeft className="text-3xl mb-4" />
                            <p className="italic mb-4">"{r.feedback}"</p>

                            {/* ✅ Star Rating */}
                            <div className="flex justify-center mb-2 gap-1">
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
