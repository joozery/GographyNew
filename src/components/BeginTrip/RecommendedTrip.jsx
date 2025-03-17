import { FaArrowRight } from "react-icons/fa";
import tripImage1 from "../../assets/gallery/g1.png"; // ✅ ตรวจสอบให้แน่ใจว่าไฟล์อยู่ถูกที่
import flahsweden from "../../assets/flag/sweden-trip.svg";
import { LuArrowRight } from "react-icons/lu";
import { useEffect, useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";

const RecommendedTrip = ({ data }) => {
  if (!data) {
    return null;
  }
  const navigate = useNavigate();
  const [tour, setTour] = useState(data);
  // useEffect(() => {
  //   console.log("data", tour[0]);
  // },[])
  function calculateDaysUntil(targetDate) {
    // แปลง targetDate เป็น Date object ถ้าหากเป็น string
    const target =
      typeof targetDate === "string" ? new Date(targetDate) : targetDate;

    // ตรวจสอบว่า target เป็น Date object ที่ถูกต้องหรือไม่
    if (!(target instanceof Date) || isNaN(target)) {
      return "Invalid date";
    }

    const now = new Date();
    const diffTime = target - now;

    // ตรวจสอบว่า targetDate เป็นวันที่ในอดีตหรือไม่
    if (diffTime < 0) {
      return "The date has already passed.";
    }

    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }

  function formatDateToThai(dateString) {
    const datadate = dateString.split("T")[0];
    // 1. ตรวจสอบรูปแบบวันที่เบื้องต้น
    const dateParts = datadate.split("-");
    if (dateParts.length !== 3) {
      return "รูปแบบวันที่ไม่ถูกต้อง"; // หรือ throw error
    }

    // 2. แยกปี, เดือน, และวัน
    const year = parseInt(dateParts[0]);
    const month = parseInt(dateParts[1]);
    const day = parseInt(dateParts[2]);

    // 3. แปลงปี ค.ศ. เป็นปี พ.ศ.
    const thaiYear = year + 543;

    // 4. สร้างสตริงวันที่ใหม่
    const formattedDate = `${day.toString().padStart(2, "0")}/${month
      .toString()
      .padStart(2, "0")}/${thaiYear}`;

    return formattedDate;
  }

  return (
    <section className="max-w-6xl mx-auto py-10 px-6 font-bai">
      {/* ✅ หัวข้อ */}
      <h2 className="text-xl font-semibold text-[#18283E]">
        ทริปด่วน{" "}
        <span className="text-[#3F72B7] ml-2 cursor-pointer hover:underline">
          ใกล้หมดเวลาแล้ว!
        </span>
      </h2>

      {/* ✅ กล่องทริปแนะนำ */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-[1.2fr_2fr] bg-transparent rounded-xl p-4 items-center">
        {/* ✅ รูปภาพ */}
        <div className="relative w-full">
          <img
            src={tour[0].image}
            alt="Sweden"
            className="w-full h-[300px] rounded-lg object-cover"
          />
          <span className="absolute top-3 left-3 bg-[#808080B2] opacity-95 text-white px-3 py-2 rounded-xl text-sm">
            Sweden
          </span>
        </div>

        {/* ✅ รายละเอียด */}
        <div className="flex flex-col md:flex-row justify-between items-start">
          <div>
            {" "}
            <div className="flex flex-col gap-5 ps-2 md:ps-10 pe-0 py-4">
              {/* 🇸🇪 หัวข้อประเทศและราคา */}
              <div className="flex items-end justify-between">
                <div className="flex flex-col text-lg font-bold gap-2">
                  {/* <img src={flahsweden} alt="" className="w-8" /> */}
                  <span>{tour[0].country_emoji}</span>
                  <span className="text-2xl">
                    {tour[0].country_name_th}{" "}
                    <span className="text-[#748193]">•</span> {tour[0].price} ฿
                  </span>
                </div>
              </div>

              {/* 📍 สถานที่ */}
              <p className="text-gray-500 text-lg font-bold">
                {tour && tour[0] && tour[0].locations && tour[0].locations[0]
                  ? tour[0].locations[0]
                  : "ไม่มีข้อมูลสถานที่"}
              </p>

              {/* 📅 วันที่เดินทาง */}
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>{formatDateToThai(tour[0].start_date)}</span>
                <LuArrowRight />
                <span>{formatDateToThai(tour[0].end_date)}</span>
              </div>

              <p>
                <span className="text-[#545556] cursor-pointer hover:underline mr-2">
                  เดินทางในอีก
                </span>
                <span className="text-[#3F72B7] bg-[#ECF1F8] px-2 py-1 rounded-md">
                  {calculateDaysUntil(tour[0].start_date)} วัน
                </span>
              </p>

              {/* 📖 คำอธิบาย */}
              <div className="text-md text-gray-500 leading-relaxed line-clamp-3">
                {tour[0].highlight ? (
                  <div
                    dangerouslySetInnerHTML={{ __html: tour[0].highlight }}
                  ></div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
          <div className="py-4">
            <button
              className="text-[#748193] min-w-24 font-normal hover:underline flex items-center"
              onClick={() => navigate(`/Trips/Details/${tour[0].id}`)}
            >
              ดูข้อมูล <FaArrowRight className="ml-1" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecommendedTrip;
