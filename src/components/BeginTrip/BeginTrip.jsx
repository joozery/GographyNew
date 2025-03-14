import { FaSearch } from "react-icons/fa";
import { HiOutlineSparkles } from "react-icons/hi2";
import { FiGlobe, FiCalendar } from "react-icons/fi"; // ✅ Import ไอคอน
import bgImage from "../../assets/Maskgroup.jpg"; // ✅ Import รูปพื้นหลัง
import DateFilter from "../TravelSearch/datefilter";

const BeginTrip = () => {
  return (
    <section 
      className="relative w-full min-h-[80vh] flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* กล่องฟอร์ม */}
      <div className="bg-white/30 backdrop-blur-xl shadow-lg rounded-xl p-8 w-[90%] max-w-2xl mx-auto font-bai">
        <h2 className="text-2xl font-bold text-[#18283E] text-center">
          เริ่มต้นการท่องเที่ยว
        </h2>
        <p className="text-gray-600 text-center text-sm font-medium">
          ค้นหาช่วงเวลาท่องเที่ยวที่ดีที่สุดที่คุณต้องการ
        </p>

        {/* ฟอร์มค้นหา */}
        <div className="mt-4 space-y-3">
          <div className="grid grid-cols-3 gap-3">
            {/* ประเทศ */}
            <div className="flex items-center border border-gray-300 p-2 rounded-md bg-white font-medium">
              <FiGlobe className="text-gray-600 mr-2" /> {/* ✅ ไอคอนประเทศ */}
              🇸🇪 <span className="ml-2 text-gray-700">สวีเดน</span>
            </div>

            {/* ช่วงเวลา */}
            <div className="flex items-center border border-gray-300 p-2 rounded-md bg-white font-medium">
              <DateFilter/>
            </div>

            {/* ปี */}
            {/* <select className="border border-gray-300 p-2 rounded-md bg-white font-medium">
              <option>2568</option>
              <option>2569</option>
            </select> */}
          </div>

          {/* ปุ่มค้นหา */}
          <button className="w-full flex justify-center items-center bg-[#3F72B7] text-white py-2 rounded-md shadow-md hover:bg-[#305a92] transition font-semibold">
            <FaSearch className="mr-2" /> ค้นหา
          </button>

          {/* หรือ */}
          <div className="text-center text-gray-500 text-sm">หรือ</div>

          {/* จัดทริปส่วนตัว */}
          <div className="bg-gradient-to-r from-pink-300 to-blue-200 p-3 flex items-center justify-between rounded-md shadow-md border border-pink-400">
            <div>
              <p className="text-[#18283E] font-semibold">จัดทริปส่วนตัว</p>
              <p className="text-xs text-gray-700 font-medium">ประสบการณ์ดีเพื่อคุณโดยเฉพาะ!</p>
            </div>
            <HiOutlineSparkles className="text-[#18283E] text-xl" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeginTrip;