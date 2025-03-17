import bgtrip from "../../assets/background1.png";
import earth from "../../assets/icon/earth.svg";
import icondown from "../../assets/icon/chevron-down.svg";
import calendar from "../../assets/icon/calendar.svg";
import search from "../../assets/icon/search.svg";

import card1 from "../../assets/Card/card.svg";
import card2 from "../../assets/Card/card2.svg";
import card3 from "../../assets/Card/card3.svg";
const BeginTrip = () => {
  return (
    <div className="w-full max-w-5xl mx-auto">
      <div
        className="relative bg-cover object-cover bg-center bg-no-repeat w-full h-[600px] rounded-3xl"
        style={{ backgroundImage: `url(${bgtrip})` }}
      >
        <div className="flex justify-center items-center top-50 left-50 w-full h-full">
          <div className="bg-transparent backdrop-blur-md rounded-none md:rounded-3xl p-0 md:p-5">
            <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-2xl">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                เริ่มต้นการท่องเที่ยว
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                <div className="col-span-1">
                  <label className="text-gray-500 text-base flex items-center gap-1 mb-2">
                    ประเทศ
                    <img src={earth} className="w-4" alt="" />
                  </label>
                  <div className="relative">
                    <select className="w-full px-4 py-3 bg-gray-100 min-h-12 rounded-lg appearance-none focus:ring-2 focus:ring-blue-300">
                      <option value="norway">🇳🇴 นอร์เวย์</option>
                      <option value="japan">🇯🇵 ญี่ปุ่น</option>
                      <option value="france">🇫🇷 ฝรั่งเศส</option>
                      <option value="usa">🇺🇸 สหรัฐอเมริกา</option>
                    </select>
                    <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                      <img src={icondown} alt="" />
                    </div>
                  </div>
                </div>

                <div className="col-span-1">
                  <label className="text-gray-500 text-base flex items-center gap-1 mb-2">
                    ช่วงเดือน
                    <img src={calendar} className="w-4" alt="" />
                  </label>
                  <div className="relative">
                    <select className="w-full px-4 py-3 bg-gray-100 rounded-lg min-h-12 appearance-none focus:ring-2 focus:ring-blue-300">
                      <option value="january">มกราคม</option>
                      <option value="february">กุมภาพันธ์</option>
                      <option value="march">มีนาคม</option>
                      <option value="april">เมษายน</option>
                    </select>
                    <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                      <img src={icondown} alt="" />
                    </div>
                  </div>
                </div>

                <div className="col-span-1 flex justify-end items-end">
                  <button className="w-full flex items-center justify-center min-h-12 bg-[#3F72B7] text-[#FFFFFF] rounded-lg shadow-md hover:bg-[#305a92] gap-2 transition">
                    ค้นหา
                    <img src={search} alt="" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <img
          className="hidden lg:flex absolute top-[-60px] z-10 left-[130px] w-[300px]"
          src={card2}
          alt=""
        />
        <img
          className="hidden lg:flex absolute top-[-25px] left-[-60px] w-[300px]"
          src={card3}
          alt=""
        />
        <img
          className="hidden lg:flex absolute bottom-[-35px] right-[-60px] w-[300px]"
          src={card1}
          alt=""
        />
      </div>
    </div>
  );
};

export default BeginTrip;
