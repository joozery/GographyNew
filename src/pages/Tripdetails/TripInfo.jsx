import { useState } from "react";
import {
  FaTrophy,
  FaCalendarAlt,
  FaUsers,
  FaMapMarkedAlt,
  FaClipboardList,
  FaCheckCircle,
  FaTimesCircle,
  FaBook,
  FaMountain,
  FaCity,
  FaDownload,
  FaMapMarkerAlt,
} from "react-icons/fa";

import {
  LuTrophy,
  LuCalendarDays,
  LuCalendarRange,
  LuCircleDashed,
  LuLandPlot,
  LuCheck,
  LuCircleCheck,
  LuNotebookPen,
  LuCircleX,
} from "react-icons/lu";

const TripInfo = ({ data }) => {
  if (!data) {
    return null;
  }
  const [DataTour, setDataTour] = useState(data);
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
    <div className="">
      {/* ✅ ไฮไลท์ทริป */}
      <h2 className="flex items-center gap-2 mb-3">
        <div className="bg-[#DB8C1E0D] p-2 rounded-lg">
          <LuTrophy className="text-[#DB8C1E] text-xl" />{" "}
        </div>
        <span className="text-[#DB8C1E] text-lg font-normal">ไฮไลท์ทริป</span>
      </h2>
      <span className="text-gray-700 leading-relaxed">
        {DataTour.highlight ? (
          <div dangerouslySetInnerHTML={{ __html: DataTour.highlight }}></div>
        ) : (
          "ไม่มีไฮไลท์ทริป"
        )}
      </span>

      {/* ✅ วันที่ & จำนวนวัน */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {/* วันที่ */}
        <div className="flex flex-col items-start gap-2 border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <div className="bg-[#F6F6F6] p-2 rounded-lg">
              <LuCalendarRange className="text-xl" />
            </div>
            <span className="font-semibold text-[#748193]">วันที่</span>
          </div>
          <p className="text-lg font-semibold mt-1">
            {formatDateToThai(DataTour.start_date)} →{" "}
            {formatDateToThai(DataTour.end_date)}
          </p>
          {/* <p className="text-blue-600 text-sm cursor-pointer hover:underline">
            ลงปฏิทิน
          </p> */}
        </div>

        {/* จำนวนวัน */}
        <div className="flex flex-col items-start gap-2 border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <div className="bg-[#F6F6F6] p-2 rounded-lg">
              <LuCalendarDays className="text-xl" />
            </div>
            <span className="font-semibold text-[#748193]">จำนวนวัน</span>
          </div>
          <p className="text-lg font-semibold mt-1">{DataTour.duration}</p>
        </div>

        {/* จำนวนสมาชิก */}
        <div className="flex flex-col items-start gap-2 border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <div className="bg-[#F6F6F6] p-2 rounded-lg">
              <LuCircleDashed className="text-xl" />
            </div>
            <span className="font-semibold text-[#748193]">จำนวนสมาชิก</span>
          </div>
          <p className="text-lg font-semibold mt-1">{DataTour.travel_type}</p>
        </div>

        {/* พื้นที่ */}
        <div className="flex flex-col items-start gap-2 border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <div className="bg-[#F6F6F6] p-2 rounded-lg">
              <LuLandPlot className="text-xl" />
            </div>
            <span className="font-semibold text-[#748193]">พื้นที่</span>
          </div>
          <div className="flex flex-wrap gap-2 mt-1">
            {DataTour.locations
              .filter((city) => city !== "")
              .map((location, index) => (
                <div key={index}>
                  <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                    {location}
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* ✅ สิ่งที่รวม & ไม่รวม */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {/* ✅ สิ่งที่รวม */}
        <div className="p-4">
          <h3 className="flex items-center gap-2">
            <div className="bg-[#EBF6E8] p-2 rounded-lg">
              <LuCheck className="text-[#40B91B] text-xl" />{" "}
            </div>
            <span className="text-[#40B91B] font-semibold">สิ่งที่รวม</span>
          </h3>
          <ul className="mt-2 bg-[#EBF6E840] min-h-[200px] text-base p-4 rounded-lg space-y-3">
            {DataTour.included.split(",,").map((item, index) => (
              <li key={index} className="flex items-start gap-2">
                <LuCircleCheck className="text-[#40B91B] text-xl min-w-[20px] mt-1" />
                {item.trim()}
              </li>
            ))}
          </ul>
        </div>

        {/* ❌ สิ่งที่ไม่รวม */}
        <div className="p-4">
          <h3 className="flex items-center gap-2">
            <div className="bg-[#F6E8E8] p-2 rounded-lg">
              <LuCheck className="text-[#B91B1B] text-xl" />{" "}
            </div>
            <span className="text-[#B91B1B] font-semibold">สิ่งที่ไม่รวม</span>
          </h3>
          <ul className="mt-2 bg-[#F6E8E840] min-h-[200px] text-base p-4 rounded-lg space-y-3">
            {DataTour.not_included.split(",,").map((item, index) => (
              <li key={index} className="flex items-start gap-2">
                <LuCircleX className="text-[#B91B1B] text-xl min-w-[20px] mt-1" />
                {item.trim()}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-8">
        {/* โน้ต Header */}

        <div className="border rounded-lg">
          <div className="flex items-center border-b p-3 gap-2">
            <div className="bg-[#ECF1F8] p-2 rounded-lg">
              <LuNotebookPen className="text-[#3F72B7]" size={20} />
            </div>
            <span className="text-[#3F72B7] font-semibold">โน้ต</span>
          </div>

          {/* หัวข้อทริป */}
          <div className="p-3 bg-[#F6F6F680]">
            {/* <h2 className="text-3xl font-bold flex items-center gap-2 mt-4 text-black">
              🌌 ทริปล่าแสงเหนือ: Lofoten, Senja, Tromsø
            </h2>
            <p className="text-gray-600 text-sm mt-1">
              21 กุมภาพันธ์ - 1 มีนาคม 2025
            </p>

            <div className="mt-8">
              <div className="flex flex-col items-start space-y-4 mt-10">
                <h2 className="font-semibold text-2xl">
                  🏔️ หมู่เกาะ Lofoten – สวรรค์แห่งการถ่ายภาพในอาร์กติก
                </h2>
                <p>
                  หมู่เกาะ Lofoten ตั้งอยู่ทางตอนเหนือของนอร์เวย์
                  เป็นหนึ่งในสถานที่ที่งดงามที่สุดในโลก
                  และเป็นที่หมายปองของนักถ่ายภาพและนักเดินทางทั่วโลก
                </p>
                <p>
                  ・ 🏞️ ทิวทัศน์อันน่าทึ่ง:
                  ภูเขาสูงตระหง่านทอดยาวจรดหาดทรายขาวละเอียด
                </p>
                <p>
                  ・ 🎣 หมู่บ้านชาวประมงเก่าแก่:
                  บ้านไม้สีสันสดใสเรียงรายตามแนวชายฝั่ง
                </p>
                <p>
                  ・ 🌠 จุดชมแสงเหนือชั้นเยี่ยม:
                  โอกาสเห็นแสงเหนือเต้นระบำบนท้องฟ้า
                </p>
                <p>
                  ความผสมผสานระหว่างธรรมชาติอันงดงามและวัฒนธรรมท้องถิ่นที่เป็นเอกลักษณ์
                  ทำให้ Lofoten
                  <br />
                  เป็นสถานที่ที่สมบูรณ์แบบสำหรับการถ่ายภาพและการพักผ่อนท่ามกลางธรรมชาติ
                </p>
              </div>

              <div className="flex flex-col items-start space-y-4 mt-10">
                <h2 className="font-semibold text-2xl">
                  🌊 เกาะ Senja – นอร์เวย์จิ๋
                </h2>
                <p>
                  Senja เป็นเกาะที่ใหญ่เป็นอันดับสองของนอร์เวย์
                  มักถูกขนานนามว่าเป็น “นอร์เวย์ขนาดย่อม”
                  ด้วยความหลากหลายของภูมิประเทศ
                </p>
                <p>
                  ・ 🏞️ ภูมิทัศน์หลากหลาย: ฟยอร์ด ภูเขา ชายหาด
                  และป่าไม้อุดมสมบูรณ์
                </p>
                <p>
                  ・ ‍🧘‍♀️ บรรยากาศสงบ:
                  สถานที่เหมาะแก่การพักผ่อนและดื่มด่ำกับธรรมชาติ
                </p>
                <p>
                  ・ 🚶‍♂️ เส้นทางเดินป่า: หลากหลายเส้นทางให้สำรวจ
                  เหมาะกับทุกระดับความสามารถ
                </p>
                <p>
                  Senja
                  เป็นสถานที่ที่เหมาะสำหรับผู้ที่ต้องการสัมผัสกับธรรมชาติของนอร์เวย์อย่างแท้จริง
                  โดยไม่พลุกพล่านเท่าสถานที่ท่องเที่ยวยอดนิยมอื่นๆ
                </p>
              </div>

              <div className="flex flex-col items-start space-y-4 mt-10">
                <h2 className="font-semibold text-2xl">
                  🏙️ Tromsø – เมืองหลวงแห่งแสงเหนือ
                </h2>
                <p>
                  Tromsø เป็นจุดหมายปลายทางสำคัญสำหรับผู้ที่ต้องการชมแสงเหนือ
                  ด้วยตำแหน่งที่ตั้งใกล้เส้นอาร์กติกเซอร์เคิล
                </p>
                <p>・ 🌠 โอกาสเห็นแสงเหนือสูง: ตั้งอยู่ในเขต “Aurora Oval”</p>
                <p>
                  ・ ‍🏛️ ศูนย์กลางวิชาการ: มหาวิทยาลัยที่อยู่เหนือสุดของโลก
                  เชี่ยวชาญด้านการวิจัยแสงเหนือและดาราศาสตร์
                </p>
                <p>
                  ・ 🏮 วัฒนธรรมเมือง: พิพิธภัณฑ์ ร้านอาหาร
                  และสถานบันเทิงหลากหลาย
                </p>
                <p>
                  ทริปนี้จะพาคุณสัมผัสกับความมหัศจรรย์ของธรรมชาติในแถบอาร์กติก
                  ตั้งแต่หมู่บ้านชาวประมงที่สวยงามของ Lofoten
                  ไปจนถึงความเงียบสงบของ Senja และสิ้นสุดที่เมืองแห่งแสงเหนือ
                  Tromsø
                  การเดินทางนี้จะมอบประสบการณ์ที่น่าจดจำและโอกาสในการถ่ายภาพที่สวยงามตลอดเส้นทาง
                  📸🌟
                </p>
              </div>
            </div>
          </div> */}
            {DataTour.information ? (
              <div
                dangerouslySetInnerHTML={{ __html: DataTour.information }}
              ></div>
            ) : (
              <>
                <span>ไม่มีข้อมูล</span>
              </>
            )}
          </div>
        </div>
        {/* ปุ่มดาวน์โหลด PDF */}
        <div className="w-full mt-6 text-center">
          {DataTour.pdf_url ? (
            <a
              href={DataTour.pdf_url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#3F72B7] hover:bg-[#285695] text-white py-3 px-6 rounded-lg flex items-center justify-center gap-2 text-lg transition"
            >
              {/* <FaDownload /> */}
              ดาวน์โหลด PDF
            </a>
          ) : (
            <button
              disabled //ปิดปุ่ม
              className="w-full bg-gray-300 text-gray-500 py-3 px-6 rounded-lg flex items-center justify-center gap-2 text-lg"
            >
              ดาวน์โหลด PDF
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TripInfo;
