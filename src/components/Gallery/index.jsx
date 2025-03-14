import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import img from "../../assets/gallery/g2.png";
import { LuImages } from "react-icons/lu";

const ImageGallery = () => {
  const images = [
    img,
    img,
    img,
    img,
    img,
    img,
    img,
    img,
    img,
    img,
    img,
    img,
    img,
    img,
  ]
  return (
    <div className="relative w-full max-w-6xl mx-auto">
      <h2 className="relative text-2xl flex z-20 font-bold text-gray-800 text-start mb-10">
        แกลเลอรี่รูปภาพ
      </h2>

      <div className="z-0 space-y-6">
        {/* Swiper Carousel Row 1 */}
        <Swiper
          modules={[Autoplay, FreeMode]}
          slidesPerView={6}
          spaceBetween={5}
          loop={true}
          autoplay={{ delay: 5000, disableOnInteraction: true }}
          freeMode={true}
          className="w-full"
        >
          {images.slice(0, images.length / 2).map((image, index) => (
            <SwiperSlide key={index}>
              <div className="w-full h-auto rounded-3xl overflow-hidden shadow-lg">
                <img
                  src={img}
                  alt={`Gallery ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Swiper Carousel Row 2 with Offset */}
        <Swiper
          modules={[Autoplay, FreeMode]}
          slidesPerView={6}
          spaceBetween={5}
          loop={true}
          autoplay={{ delay: 5000, disableOnInteraction: true }}
          freeMode={true}
          className="w-full pl-10"
        >
          {images.slice(images.length / 2).map((image, index) => (
            <SwiperSlide key={index}>
              <div className="w-full h-auto rounded-3xl overflow-hidden shadow-lg">
                <img
                  src={image}
                  alt={`Gallery ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Left Overlay */}
      <div className="absolute top-0 left-0 h-full w-36 z-10 bg-gradient-to-r from-white to-transparent pointer-events-none"></div>

      {/* Right Overlay */}
      <div className="absolute top-0 right-0 h-full w-36 z-10 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>

      {/* View More Button */}
      <div className="flex justify-center items-center mt-6 text-center ">
        <button className="flex items-center justify-center gap-2 border rounded-full shadow-md px-4 py-2 text-[#3F72B7] bg-[#ECF1F8] hover:scale-105 border-[#3F72B7] transition">
          <span>ดูรูปภาพเพิ่มเติม</span>
            <LuImages/>
        </button>
      </div>
    </div>
  );
};

export default ImageGallery;
