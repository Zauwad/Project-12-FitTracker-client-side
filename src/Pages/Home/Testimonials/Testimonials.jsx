// src/Pages/Home/Testimonials.jsx
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { FaQuoteLeft, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import UseAxios from "../../../hooks/UseAxios";

const Testimonials = () => {

    const axiosInstance = UseAxios()


    // eslint-disable-next-line no-unused-vars
    const { data: reviews = [], isLoading, isError } = useQuery({
        queryKey: ["testimonials"],
        queryFn: async () => {
            const res = await axiosInstance.get("/testimonials"); // 🔹 Update API base URL if needed
            return res.data;
        },
    });
    return (
        <section className="py-16 bg-base-100">
            <div className="max-w-6xl mx-auto px-6 text-center">
                <h2 className="text-4xl font-bold text-primary mb-6">What Our Members Say</h2>
                <p className="text-lg text-gray-600 mb-10">
                    Hear from our happy users who are achieving their fitness goals with FitTrackerPro.
                </p>

                {/* ✅ Carousel with custom buttons */}
                <Carousel
                    showStatus={false}
                    showThumbs={false}
                    infiniteLoop
                    autoPlay
                    interval={4000}
                    centerMode
                    centerSlidePercentage={33.3} // ✅ shows 3 at once
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
                            key={r.id}
                            className="bg-gray-500 shadow-lg rounded-xl p-6 mx-2 flex flex-col justify-between hover:shadow-2xl transition h-full"
                        >
                            <FaQuoteLeft className="text-3xl text-primary mb-4" />
                            <p className="text-gray-700 italic mb-4">"{r.review}"</p>
                            <div>
                                <h4 className="text-lg font-semibold">{r.name}</h4>
                                <span className="text-sm text-gray-500">{r.role}</span>
                            </div>
                        </div>
                    ))}
                </Carousel>
            </div>
        </section>
    );
};

export default Testimonials;
