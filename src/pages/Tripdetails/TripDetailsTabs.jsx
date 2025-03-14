import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TripInfo from "./TripInfo";
import TripMap from "./TripMap";
import TripIncludes from "./TripIncludes";

import { FaRegMap } from "react-icons/fa";
import { FiInfo } from "react-icons/fi";
import { LuScale } from "react-icons/lu";

const TripDetailsTabs = ({ data }) => {
  const [activeTab, setActiveTab] = useState("info");

  return (
    <section className="container mx-auto md:py-10 md:px-6 font-bai">
      <div className="flex flex-col md:flex-row gap-6">
        {/* ✅ Sidebar Tabs */}
        <div className="w-full md:w-1/4 bg-white rounded-lg p-4 space-y-2">
          {[
            { tab: "info", icon: FiInfo, label: "ข้อมูลทริป" },
            { tab: "map", icon: FaRegMap, label: "แผนที่ท่องเที่ยว" },
            { tab: "includes", icon: LuScale, label: "เงื่อนไขและข้อกำหนด" },
          ].map(({ tab, icon: Icon, label }) => (
            <button
              key={tab}
              className={`flex items-center hover:bg-[#F6F6F6] hover:text-black gap-3 w-full px-4 py-3 rounded-lg ${
                activeTab === tab
                  ? "bg-[#F6F6F6] text-black"
                  : "text-[#748193] border-transparent"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              <Icon className="text-xl" />
              {label}
            </button>
          ))}
        </div>

        {/* ✅ Render Content with Fade Effect */}
        <div className="w-full md:w-3/4 bg-white rounded-lg p-2 md:p-6">
          <AnimatePresence mode="wait">
            {activeTab === "info" && (
              <motion.div
                key="info"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <TripInfo data={data.tour} />
              </motion.div>
            )}
            {activeTab === "map" && (
              <motion.div
                key="map"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <TripMap data={data.tour_days} />
              </motion.div>
            )}
            {activeTab === "includes" && (
              <motion.div
                key="includes"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <TripIncludes data={data.tour.terms_conditions} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default TripDetailsTabs;
