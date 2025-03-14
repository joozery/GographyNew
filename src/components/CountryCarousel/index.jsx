import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";

const countries = [
  { name: "Georgia", flag: "🇬🇪" },
  { name: "Japan", flag: "🇯🇵" },
  { name: "Iceland", flag: "🇮🇸" },
  { name: "Argentina", flag: "🇦🇷" },
  { name: "New Zealand", flag: "🇳🇿" },
  { name: "India", flag: "🇮🇳" },
  { name: "Norway", flag: "🇳🇴" },
  { name: "France", flag: "🇫🇷" },
];

const CountryCarousel = () => {
  return (
    <div className="relative w-full max-w-5xl mx-auto p-5 lg:p-0">
      <div className="flex relative z-20 flex-col justify-start items-start">
        <h2 className="text-xl font-bold text-gray-800">13 ประเทศ</h2>
        <p className="text-gray-500 mb-6">ที่พร้อมพาคุณไปพบกับความสุข</p>
      </div>
      <Swiper
        modules={[Autoplay, FreeMode]}
        grabCursor={true}
        slidesPerView={6} // ✅ แสดงอย่างน้อย 6 ชิ้น
        spaceBetween={20} // ✅ เพิ่มระยะห่าง
        loop={true}
        // autoplay={{ delay: 2500, disableOnInteraction: false }}
        // coverflowEffect={{
        //   rotate: 20,
        //   stretch: 0,
        //   depth: 200,
        //   modifier: 1,
        //   slideShadows: false,
        // }}
        freeMode={true} // ✅ ให้ไหลต่อเนื่องแบบธรรมชาติ
        className="w-full"
      >
        {countries.map((country, index) => (
          <SwiperSlide
            key={index}
            className={`flex justify-center items-center rounded-md px-10 py-5 ${
              index % 2 === 0 ? "" : "bg-[#D4D9E01A]"
            }`}
          >
            <div className="text-center">
              <div className="text-4xl">{country.flag}</div>
              <p className="mt-2 text-sm text-[#3F72B7]">{country.name}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      {/* Left Overlay */}
      <div className="absolute top-0 left-0 h-full w-32 z-10 bg-gradient-to-r from-white to-transparent pointer-events-none"></div>

      {/* Right Overlay */}
      <div className="absolute top-0 right-0 h-full w-32 z-10 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
    </div>
  );
};

export default CountryCarousel;
