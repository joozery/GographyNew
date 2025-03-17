import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import { LuImages } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

const ImageGallery = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const MIN_IMAGES = 12; // กำหนดจำนวนรูปที่ต้องการให้เต็ม

  // เรียก API เพื่อนำข้อมูลมาแสดง
  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await fetch(
          "https://servergogo-app-209f1146e735.herokuapp.com/api/gallery"
        ); // เปลี่ยนเป็น API จริง
        const data = await response.json();

        if (Array.isArray(data)) {
          const imageUrls = data.map((item) => item.image_url);
          setImages(fillImages(imageUrls, MIN_IMAGES)); // เรียกฟังก์ชันให้เติมรูปจนครบ
        }
      } catch (error) {
        console.error("Error fetching gallery:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  // ฟังก์ชันเติมรูปให้ครบตามจำนวนที่กำหนด
  const fillImages = (originalImages, minCount) => {
    if (originalImages.length >= minCount) return originalImages;
    let newImages = [...originalImages];
    while (newImages.length < minCount) {
      newImages = [...newImages, ...originalImages].slice(0, minCount);
    }
    return newImages;
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto">
      <h2 className="relative text-2xl flex z-20 font-bold text-gray-800 text-start mb-10">
        แกลเลอรี่รูปภาพ
      </h2>

      {loading ? (
        <p className="text-center text-gray-500">กำลังโหลด...</p>
      ) : images.length > 0 ? (
        <div className="z-0 space-y-6">
          {/* Swiper Carousel Row 1 */}
          <Swiper
            modules={[Autoplay, FreeMode]}
            // slidesPerView={6}
            spaceBetween={5}
            loop={true}
            autoplay={{ delay: 5000, disableOnInteraction: true }}
            freeMode={true}
            breakpoints={{
              320: { slidesPerView: 2 },  // มือถือเล็ก
              480: { slidesPerView: 3 },  // มือถือใหญ่
              768: { slidesPerView: 4 },  // แท็บเล็ต
              1024: { slidesPerView: 6 }, // หน้าจอปกติ
            }}
            className="w-full"
          >
            {images
              .slice(0, Math.ceil(images.length / 2))
              .map((image, index) => (
                <SwiperSlide key={index}>
                  <div className="w-full h-[130px] rounded-3xl overflow-hidden shadow-lg">
                    <img
                      src={image}
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
            // slidesPerView={6}
            spaceBetween={5}
            loop={true}
            autoplay={{ delay: 5000, disableOnInteraction: true }}
            freeMode={true}
            breakpoints={{
              320: { slidesPerView: 2 },  // มือถือเล็ก
              480: { slidesPerView: 3 },  // มือถือใหญ่
              768: { slidesPerView: 4 },  // แท็บเล็ต
              1024: { slidesPerView: 6 }, // หน้าจอปกติ
            }}
            className="w-full pl-10"
          >
            {images.slice(Math.ceil(images.length / 2)).map((image, index) => (
              <SwiperSlide key={index}>
                <div className="w-full h-[130px] rounded-3xl overflow-hidden shadow-lg">
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
      ) : (
        <p className="text-center text-gray-500">ไม่มีรูปภาพในแกลเลอรี่</p>
      )}

      {/* Left Overlay */}
      <div className="absolute top-0 left-0 h-full w-36 z-10 bg-gradient-to-r from-white to-transparent pointer-events-none"></div>

      {/* Right Overlay */}
      <div className="absolute top-0 right-0 h-full w-36 z-10 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>

      {/* View More Button */}
      <div className="flex justify-center items-center mt-6 text-center">
        <button
          onClick={() => window.location.href = "/Gallery"}
          className="flex items-center justify-center gap-2 border rounded-full shadow-md px-4 py-2 text-[#3F72B7] bg-[#ECF1F8] hover:scale-105 border-[#3F72B7] transition"
        >
          <span>ดูรูปภาพเพิ่มเติม</span>
          <LuImages />
        </button>
      </div>
    </div>
  );
};

export default ImageGallery;
