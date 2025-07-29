import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useNavigate } from "react-router";
import gym1 from '../../../assets/gym1.jpg'
import gym2 from '../../../assets/gym2.jpg'
import gym3 from '../../../assets/gym3.jpg'


const Banner = () => {
  const navigate = useNavigate();

  const slides = [
    {
      id: 1,
      title: "Track Your Fitness Journey",
      desc: "Monitor your workouts, set goals, and stay motivated every day.",
      img: gym1,
    },
    {
      id: 2,
      title: "Join Expert-Led Classes",
      desc: "Access classes from top trainers and achieve your fitness goals faster.",
      img: gym2,
    },
    {
      id: 3,
      title: "Be Part of a Fitness Community",
      desc: "Connect, share, and grow with like-minded fitness enthusiasts.",
      img: gym3,
    },
  ];

  return (
    <div className="w-full h-[500px] relative">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000 }}
        loop
        className="h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="w-full h-[500px] flex flex-col items-center justify-center text-center bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.img})` }}
            >
              <div className="bg-black bg-opacity-50 p-6 rounded-xl max-w-xl">
                <h2 className="text-4xl font-bold text-white mb-4">
                  {slide.title}
                </h2>
                <p className="text-lg text-gray-200 mb-6">{slide.desc}</p>
                <button
                  onClick={() => navigate("/classes")}
                  className="btn btn-primary px-6 py-2 text-lg"
                >
                  Explore Classes
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
