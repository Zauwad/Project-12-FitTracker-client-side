import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useNavigate } from "react-router";

const Banner = () => {
  const navigate = useNavigate();

  const slides = [
    {
      id: 1,
      title: "Track. Train. Transform.",
      desc: "FitTrack combines powerful workout tracking with studio classes and world-class trainers. Built for results.",
    },
    {
      id: 2,
      title: "Join Expert-Led Classes",
      desc: "Access classes from top trainers and achieve your fitness goals faster.",
    },
    {
      id: 3,
      title: "Be Part of a Fitness Community",
      desc: "Connect, share, and grow with like-minded fitness enthusiasts.",
    },
  ];

  return (
    <section className="py-12 sm:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          loop
          navigation={{
            nextEl: ".custom-next",
            prevEl: ".custom-prev",
          }}
          pagination={{ clickable: true }}
          className="h-[250px] sm:h-[350px] md:h-[400px] lg:h-[420px] rounded-2xl shadow-[0_0_30px_rgba(255,255,255,0.2)] relative"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div
                className="w-full h-full rounded-2xl flex flex-col items-center justify-center text-center px-4 sm:px-8
                bg-[#0E0E11] bg-[radial-gradient(400px_200px_at_20%_-10%,rgba(23,207,99,0.15),transparent_60%),radial-gradient(400px_200px_at_120%_120%,rgba(0,255,150,0.1),transparent_60%)]"
              >
                <div className="max-w-3xl mx-auto">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 leading-tight">
                    {slide.title}
                  </h2>
                  <p className="text-xs sm:text-sm md:text-base text-[#9F9FA8] mb-4">
                    {slide.desc}
                  </p>
                  <button
                    onClick={() => navigate("/classes")}
                    className="btn btn-primary px-3 sm:px-5 py-1.5 sm:py-2 text-sm sm:text-base"
                  >
                    Explore Classes
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}

          {/* Navigation Arrows */}
          <div className="custom-prev absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 z-10 bg-[#09090B] text-white p-2 sm:p-3 rounded-full cursor-pointer hover:scale-110 transition flex items-center justify-center size-10">
            ❮
          </div>
          <div className="custom-next absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 z-10 bg-[#09090B] text-white p-2 sm:p-3 rounded-full cursor-pointer hover:scale-110 transition flex items-center justify-center size-10">
            ❯
          </div>
        </Swiper>
      </div>
    </section>
  );
};

export default Banner;
