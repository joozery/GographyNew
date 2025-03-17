import herobg from "../../assets/herobg.jpg"; // Import พื้นหลัง
import rightImage from "../../assets/right-section.png"; // Import รูปฝั่งขวา
import { FaPlaneDeparture } from "react-icons/fa";
import { LuChevronRight } from "react-icons/lu";

const Hero = () => {
  return (
    <section
      className="w-full h-screen flex items-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${herobg})` }}
    >
      {/* คอนเทนต์หลัก */}
      <div className="relative container mx-auto px-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center mt-72 md:mt-0">
        {/* ข้อความฝั่งซ้าย */}
        <div className="space-y-5 text-left">
          <h1 className="text-4xl md:text-5xl min-h-[110px] font-extrabold bg-gradient-to-r from-[#18283E] to-[#3F72B7] bg-clip-text text-transparent font-bai leading-tight">
            การมอบช่วงเวลา <br /> และความทรงจำที่ดีให้กับคุณ...
          </h1>
          <p className="text-xl font-semibold text-[#18283E]">
            คือจุดหมายของเรา
          </p>
          <p className="text-gray-600 text-lg leading-relaxed font-bai">
            ทุกการเดินทางมีเรื่องราว GOGRAPHY <br />{" "}
            พร้อมพาคุณเก็บความทรงจำในมุมที่งดงามที่สุด <br />{" "}
            ผ่านกล้องและภาพถ่าย
          </p>

          <button 
          onClick={() => window.location.href = "/Trips"}
          className="mt-4 px-6 py-3 flex items-center gap-2 bg-[#3F72B7] text-white rounded-lg shadow-md hover:bg-[#305a92] transition">
            วางแผนท่องเที่ยว<LuChevronRight className="text-xl" />
          </button>
        </div>

        {/* รูปฝั่งขวา */}
        <div className="relative flex justify-center md:justify-end">
          <img
            src={rightImage}
            alt="Right Section"
            className="w-[400px] md:w-[600px] h-auto translate-y-12 md:translate-y-22"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
