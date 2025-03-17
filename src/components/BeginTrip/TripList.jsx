import { FaFlag, FaArrowRight } from "react-icons/fa";
import tripImage1 from "../../assets/gallery/g1.png";
import tripImage2 from "../../assets/gallery/g2.png";
import tripImage3 from "../../assets/gallery/g3.png";

import swedenimg from "../../assets/flag/sweden-trip.svg";
import { tr } from "framer-motion/client";
import { LuArrowRight } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import CountryFlag from "../CountryFlag";

const TripList = ({ trips }) => {
  const navigate = useNavigate();
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
      <h2 className="text-xl font-semibold text-[#18283E] flex items-center gap-2">
        <span className="bg-[#ECF1F8] text-[#3F72B7] px-3 py-1 rounded-lg text-xl">
          {trips.length}
        </span>
        รายการ
      </h2>

      {/* ✅ รายการทริป */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
        {trips.length > 0 &&
          trips.map((trip, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:scale-105 duration-300 transition"
              onClick={() => navigate(`/Trips/Details/${trip.id}`)}
            >
              {/* ✅ รูปภาพ */}
              <div className="relative">
                <img
                  src={trip.image || ""}
                  alt={trip.locations === null ? "" : trip.locations[0]}
                  className="w-full h-48 object-cover"
                />
                <span className="absolute top-3 left-3 bg-[#808080d3] opacity-95 text-white px-2 py-1 rounded-lg text-sm">
                  {trip.country_name}
                </span>
              </div>

              {/* ✅ รายละเอียด */}
              <div className="flex flex-col gap-3 p-4">
                <div className="flex justify-between items-center">
                  {/* <img src={trip.country_emoji} alt="" className="w-5" /> */}
                  <div key={index}>
                    {trip.country_emoji && (
                      <CountryFlag countryCodes={trip.country_emoji} />
                    )}
                  </div>
                  <span className="bg-[#ECF1F8] text-[#3F72B7] px-3 py-1 rounded-md text-xs">
                    {trip.tour_name}
                  </span>
                </div>
                <div className="flex flex-col gap-0">
                  <div className="flex justify-between items-center text-xl font-semibold">
                    <span>{trip.country_name_th}</span>
                    <span>{trip.price}</span>
                  </div>
                  <div className="flex justify-between items-center text-base text-[#748193] font-medium">
                    <span>{trip.locations[0]}</span>
                    {/* <span>{trip.price}</span> */}
                  </div>
                </div>

                <div className="flex justify-start items-center gap-2 text-base text-[#748193] font-medium">
                  <span>{formatDateToThai(trip.start_date)}</span>
                  <span>
                    <LuArrowRight />
                  </span>
                  <span>{formatDateToThai(trip.end_date)}</span>
                </div>

                {/* <p className="text-gray-500 text-sm flex items-center gap-2">
                <FaFlag className="text-blue-500" /> {trip.country}
              </p>
              <h3 className="text-lg font-bold text-[#18283E]">{trip.location}</h3>
              <p className="text-gray-700 text-sm mt-1">{trip.date}</p>
              <p className="text-lg font-bold text-[#3F72B7] mt-2">{trip.price}</p>
              <p className="text-xs text-gray-500 mt-2">{trip.tripName}</p>
              <button className="mt-3 flex items-center text-blue-500 font-semibold hover:underline">
                ดูรายละเอียด <FaArrowRight className="ml-1" />
              </button> */}
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default TripList;
