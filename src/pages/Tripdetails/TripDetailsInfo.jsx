import { useState } from "react";
import TripInfo from "./TripInfo";
import TripMap from "./TripMap";
import TripIncludes from "./TripIncludes";

import { FaRegMap, FaInfoCircle } from "react-icons/fa";
import { FiInfo } from "react-icons/fi";
import { LuScale } from "react-icons/lu";


// ✅ นำเข้าไฟล์ SVG จาก local
import InfoIcon from "../../assets/Trip/icon/info.svg";
import MapIcon from "../../assets/Trip/icon/map.svg";
import ScaleIcon from "../../assets/Trip/icon/scale.svg";

const TripDetailsTabs = () => {
  const [activeTab, setActiveTab] = useState("info");

  return (
    <section className="container mx-auto md:py-10 md:px-6 font-bai">
      <div className="flex flex-col md:flex-row gap-6">
        
        {/* ✅ Sidebar Tabs */}
        <div className="w-full md:w-1/4 bg-white rounded-lg p-4 space-y-2">
          {[
            { tab: "info", icon: FiInfo, label: "ข้อมูลทริป" },
            { tab: "map", icon: FaRegMap, label: "แผนที่" },
            { tab: "includes", icon: LuScale, label: "สิ่งที่รวม & ไม่รวม" },
          ].map(({ tab, icon: Icon, label }) => (
            <button
              key={tab}
              className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg ${
                activeTab === tab ? "bg-[#F6F6F6] text-black" : "text-[#748193] border-transparent"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {/* ✅ แสดง SVG และกำหนดสี */}
              {/* <img src={icon} alt={label} className="fill-black w-6 h-6 " /> */}
              <Icon className="text-xl" />{label}
            </button>
          ))}
        </div>

        {/* ✅ Render Content */}
        {/* <div className="w-full md:w-3/4 bg-white rounded-lg p-6">
          {activeTab === "info" && <TripInfo />}
          {activeTab === "map" && <TripMap />}
          {activeTab === "includes" && <TripIncludes />}
        </div> */}
      </div>
    </section>
  );
};

export default TripDetailsTabs;
