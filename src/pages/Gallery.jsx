import { useState, useEffect } from "react";
import axios from "axios";
import { FaSpinner } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import CountryFlag from "../components/CountryFlag";

const API_URL = "https://servergogo-app-209f1146e735.herokuapp.com/api/gallery";

const Gallery = () => {
  const [galleryData, setGalleryData] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ โหลดข้อมูลจาก API
  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => {
        // ✅ จัดกลุ่มข้อมูลตาม `category_name`
        const groupedData = response.data.reduce((acc, item) => {
          const key = item.category_name;
          if (!acc[key]) {
            acc[key] = {
              name: item.category_name,
              nameth: item.category_name_th || item.category_name,
              emoji: item.emoji,
              images: [],
            };
          }
          acc[key].images.push(item.image_url);
          return acc;
        }, {});

        setGalleryData(Object.values(groupedData)); // ✅ แปลง Object → Array
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading gallery:", error);
        setLoading(false);
      });
  }, []);

  return (
    <section className="max-w-6xl mx-auto py-28 px-6 font-baijam min-h-screen">
      {/* ✅ หัวข้อแกลเลอรี่ */}
      <div className="text-left">
        <h2 className="text-4xl font-extrabold bg-gradient-to-r from-[#82b2f4] to-[#020811] text-transparent bg-clip-text leading-tight">
          <span className="block">แกลเลอรี่ความทรงจำของ</span>
          <span className="block">GOGRAPHY</span>
        </h2>
        <p className="text-[#18283E] text-lg font-medium mt-2">
          ทุกรอยยิ้มคือความสำเร็จของเรา
        </p>
      </div>

      {/* ✅ Loading */}
      {loading ? (
        <div className="flex justify-center items-center mt-6">
          <FaSpinner className="animate-spin text-blue-500 text-3xl" />
          <p className="ml-2 text-blue-500 font-semibold">กำลังโหลดรูปภาพ...</p>
        </div>
      ) : (
        galleryData.map((country, index) => (
          <div key={index} className="mt-12">
            {/* ✅ ชื่อประเทศ */}
            <div className="flex items-center gap-2">
              {/* <span className="text-2xl">{country.emoji}</span> */}
              {country && <CountryFlag countryCodes={country.emoji} />}
              <h3 className="text-lg font-bold text-[#18283E]">
                {country.name} / {country.nameth}
              </h3>
            </div>

            {/* ✅ แสดงรูปภาพ */}
            {country.images.length <= 4 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                {country.images.map((img, imgIndex) => (
                  <img
                    key={imgIndex}
                    src={img}
                    alt={`${country.name} ${imgIndex + 1}`}
                    className="rounded-lg shadow-md w-full h-64 object-cover"
                  />
                ))}
              </div>
            ) : (
              <Swiper
                modules={[Autoplay]}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                slidesPerView={4} // ✅ แสดงทีละ 4 รูป
                spaceBetween={10} // ✅ ระยะห่างระหว่างรูป
                breakpoints={{
                  // เมื่อขนาดหน้าจอ >= 1024px (lg) แสดง 4 รูป
                  1024: {
                    slidesPerView: 4,
                  },
                  // เมื่อขนาดหน้าจอ >= 768px (md) แสดง 3 รูป
                  768: {
                    slidesPerView: 4,
                  },
                  // เมื่อขนาดหน้าจอ >= 640px (sm) แสดง 2 รูป
                  640: {
                    slidesPerView: 2,
                  },
                  // เมื่อขนาดหน้าจอ < 640px แสดง 1 รูป
                  320: {
                    slidesPerView: 1,
                  },
                }}
                className="mySwiper"
              >
                {country.images.map((img, imgIndex) => (
                  <SwiperSlide key={imgIndex} className="mt-4">
                    <img
                      src={img}
                      alt={`${country.name} ${imgIndex + 1}`}
                      className="rounded-lg shadow-md w-full h-64 object-cover"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>
        ))
      )}
    </section>
  );
};

export default Gallery;
