import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {
  Navigation,
  Pagination,
  Mousewheel,
  Keyboard,
  Autoplay,
} from "swiper/modules";
import axios from "axios";

const Partner = () => {
  const [partners, setPartners] = useState([]);
  const GetPartner = async () => {
    try {
      const response = await axios.get(
        "https://servergogo-app-209f1146e735.herokuapp.com/api/partners"
      ); // หรือ URL ของ API endpoint ของคุณ
      console.log(response.data); // แสดงข้อมูลพาร์ทเนอร์ใน console
      // นำข้อมูล response.data ไปใช้งาน
      setPartners(response.data);
    } catch (error) {
      console.error("Error fetching partners:", error);
    }
  };

  useEffect(() => {
    GetPartner();
  }, []);
  return (
    <>
      <div className="flex flex-col items-center container mx-auto">
        <div className="flex justify-between items-center w-full md:px-10">
          <span className="text-lg font-semibold text-[#18283E]">
            พาร์ทเนอร์ของเรา
          </span>
          {/* <span className="bg-[#D4D9E033] text-[#3F72B7] text-xs font-semibold px-2 py-1 rounded-full">
              100% แนะนำ
            </span> */}
        </div>
        <div className="flex w-full items-start">
          {/* <span className="w-1/2 text-lg font-light  text-[#748193]">
            มั่นใจทุกการเดินทาง กับรีวิวจากนักเดินทางที่ประทับใจ 100%
            แนะนำให้คุณสัมผัสประสบการณ์สุดพิเศษไปกับเรา
          </span> */}
        </div>
      </div>
      <Swiper
        spaceBetween={50} // ระยะห่างระหว่าง slide
        slidesPerView={3} // จำนวน slide ที่แสดงพร้อมกัน
        navigation={false} // แสดงปุ่มนำทาง
        mousewheel={true} // เปิดใช้งานการเลื่อนด้วย mousewheel
        keyboard={true} // เปิดใช้งานการเลื่อนด้วย keyboard
        modules={[Navigation, Pagination, Mousewheel, Keyboard, Autoplay]} // กำหนด modules ที่ใช้
        autoplay={{
          delay: 2500, // ระยะเวลาในการสไลด์ (milliseconds)
          disableOnInteraction: false, // ให้ autoplay ทำงานต่อเมื่อมีการ interaction
        }}
        loop={true}
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          480: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          640: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 50,
          },
        }} // กำหนด breakpoints เพื่อให้แสดงผล responsive
      >
        {partners.map((partner) => (
          <SwiperSlide key={partner.id}>
            <div
              className="p-2 rounded-lg border shadow-md"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="max-w-full h-[150px] object-cover"
                // style={{ maxWidth: "100%", maxHeight: "150px" }}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};
export default Partner;
