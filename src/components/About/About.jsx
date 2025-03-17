import bg2 from "../../assets/about.jpg"; // พื้นหลัง
import ratingIconGold from "../../assets/gold.svg";
import ratingIconSilver from "../../assets/silver.svg";
import CheckIcon from "../../assets/icon/circle-check-big.svg";
import { FaCheckCircle } from "react-icons/fa";

const About = () => {
  return (
    <section
      className="w-full min-h-[90vh] flex flex-col items-center text-center bg-cover bg-center bg-scroll"
      style={{ backgroundImage: `url(${bg2})` }}
    >
      {/* คอนเทนต์หลัก */}
      <div className="container mx-auto px-6 md:px-12 space-y-12 md:space-y-48 mt-48 md:mt-0">
        <div>
          {/* หัวข้อ */}
          <h2 className="text-3xl md:text-2xl font-semibold text-[#18283E] font-bai">
            เกี่ยวกับเรา
          </h2>
          <p className="text-[#748193] text-lg max-w-2xl mx-auto mt-4 leading-relaxed font-bai">
            Gography เกิดจากการรวมตัวของกลุ่มช่างภาพที่รักการเดินทาง
            เราเดินทางไปในหลายที่ทั่วโลก ผ่านประสบการณ์ที่หลากหลาย
            และเข้าใจดีว่า อะไรที่ทำให้การเดินทางสมบูรณ์แบบ
            เราจึงออกแบบเส้นทางทุกทริปโดยใช้มุมมองของ นักเดินทางตัวจริง
            ที่รู้ว่าควรเติมอะไรลงไปในทริป
            เพื่อให้ทุกคนที่ร่วมเดินทางกับเราได้รับ
            ช่วงเวลาที่ดีและความทรงจำที่คุ้มค่าที่สุด
          </p>
        </div>

        {/* การ์ดสถิติ */}
        <div className="bg-transparent backdrop-blur-[50px] shadow-sm rounded-3xl mt-0 md:mt-10 max-w-3xl mx-auto px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-2">
            {/* การ์ด 1 */}
            <div className="flex flex-col justify-center items-center space-y-2">
              <img
                src={ratingIconSilver}
                alt="People Icon"
                className="w-14 h-14"
              />
              <h3 className="text-2xl font-semibold mt-4 text-[#18283E]">
                3,000+ คน
              </h3>
              <p className="text-[#748193] text-sm">
                ที่เราได้พาไปเก็บช่วงเวลา <br />
                ที่ดีที่สุดช่วงเวลาหนึ่งในชีวิต
              </p>
            </div>

            {/* การ์ด 2 */}
            <div className="flex flex-col justify-center items-center space-y-2">
              <img
                src={ratingIconGold}
                alt="Rating Icon"
                className="w-14 h-14"
              />
              <h3 className="text-2xl font-semibold mt-4 text-[#18283E]">100%</h3>
              <p className="text-[#748193] text-sm">
                จำนวนรีวิวที่ผู้คน
                <br /> แนะนำบริการของเรา
              </p>
            </div>

            {/* การ์ด 3 */}
            <div className="flex flex-col justify-center items-center space-y-2">
              <img
                src={ratingIconSilver}
                alt="Experience Icon"
                className="w-14 h-14"
              />
              <h3 className="text-2xl font-semibold mt-4 text-[#18283E]">8 ปี</h3>
              <p className="text-[#748193] text-sm">
                คือระยะเวลาที่เราได้สร้าง
                <br /> ความทรงจำให้คนมากมาย
              </p>
            </div>
          </div>

          {/* รายการจุดเด่น */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-6">
            <div className="flex items-center justify-center bg-white py-5 px-4 rounded-xl shadow-sm gap-3">
              <img src={CheckIcon} alt="" />
              <p className="text-gray-700 text-sm">
                ทุกทริปได้รับความประทับใจจริง
              </p>
            </div>
            <div className="flex items-center justify-center bg-white py-5 px-4 rounded-xl shadow-sm gap-3">
              <img src={CheckIcon} alt="" />
              <p className="text-gray-700 text-sm">
                ประสบการณ์ที่ดีจากการเดินทาง
              </p>
            </div>
            <div className="flex items-center justify-center bg-white py-5 px-4 rounded-xl shadow-sm gap-3">
              <img src={CheckIcon} alt="" />
              <p className="text-gray-700 text-sm">จุดหมายพิเศษสำหรับช่างภาพ</p>
            </div>
            <div className="flex items-center justify-center bg-white py-5 px-4 rounded-xl shadow-sm gap-3">
              <img src={CheckIcon} alt="" />
              <p className="text-gray-700 text-sm">ทำให้การเดินทางสมบูรณ์แบบ</p>
            </div>
          </div>
        </div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-b from-transparent to-white"></div>
    </section>
  );
};

export default About;
