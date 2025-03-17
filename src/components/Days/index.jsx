import { use, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { LuCalendarX, LuDot, LuMapPin } from "react-icons/lu";

const DayOneItinerary = ({ countDays }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleDay = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    console.log(countDays);
  }, [countDays]);

  return (
    <div className="">
      {countDays
        // .filter((day) => day.location.trim() !== "") // ✅ กรอง location ที่เป็นค่าว่างออก
        .map((day, index) => (
          <div key={day.id} className="my-5">
            {/* ✅ Header ที่คลิกได้ */}
            <button
              onClick={() => toggleDay(index)}
              className={`w-full flex justify-between items-center p-4 bg-[#ECF1F8] ${
                openIndex === index ? "rounded-t-lg" : "rounded-lg"
              } transition duration-300`}
            >
              <div className="flex flex-col items-start gap-2">
                <h2 className="text-lg font-semibold">{`Day ${index}`}</h2>
                <div className="flex text-[#3F72B7] items-center gap-1">
                  <LuMapPin />
                  <span>{day.location}</span>
                  <LuDot />
                  <LuCalendarX />
                  <span>{new Date(day.date).toLocaleDateString("th-TH")}</span>
                </div>
              </div>
              {openIndex === index ? <FaChevronUp /> : <FaChevronDown />}
            </button>

            {/* ✅ เนื้อหาที่หด/ขยายได้ */}
            <motion.div
              initial={false}
              animate={{
                height: openIndex === index ? "auto" : 0,
                opacity: openIndex === index ? 1 : 0,
              }}
              className="overflow-hidden"
            >
              <div className="border border-gray-200 rounded-b-lg border-t-0">
                <div className="p-6">
                  {/* ✅ ตารางเวลา */}
                  <div className="mt-4 space-y-4">
                    {day.time_schedule.map((schedule) => (
                      <div
                        key={schedule.id}
                        // className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                        className="flex flex-col md:flex-row gap-4"
                      >
                        <div className={`${schedule.time === null || schedule.time === "" ? "" : "bg-[#EBF6E8]" } text-[#40B91B] flex items-center justify-center min-w-[150px] h-8 rounded-lg text-center`}>
                          {schedule.time}
                        </div>
                        <div className="flex">
                          <p className="text-sm font-light">
                            {schedule.activity}
                          </p>
                        </div>
                      </div>
                    ))}
                    <div className="flex">
                      {day.description ? (
                        <div
                          className="text-sm font-light"
                          dangerouslySetInnerHTML={{
                            __html: day.description,
                          }}
                        ></div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>

                  {/* ✅ รูปภาพ (ถ้ามี) */}
                  {day.images.length > 0 && (
                    <div className="mt-4 grid grid-cols-2 gap-2">
                      {day.images.map((img, i) => (
                        <img
                          key={i}
                          src={img}
                          alt={`Day ${day.day_number}`}
                          className="rounded-lg shadow"
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        ))}
    </div>
  );
};

export default DayOneItinerary;
