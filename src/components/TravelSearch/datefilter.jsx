import { useState } from "react";

const DateFilter = () => {
  const [range, setRange] = useState("ทั้งหมด");
  const [year, setYear] = useState("2568");

  return (
    <div className="w-full flex justify-center items-center border border-gray-300 rounded-md min-h-12 bg-[#F6F6F6]">
      {/* Dropdown เลือกช่วงเวลา */}
      <select
        value={range}
        onChange={(e) => setRange(e.target.value)}
        className="font-medium w-full mr-2 p-2 focus:border-none focus:outline-none bg-[#F6F6F6]"
      >
        <option value="ทั้งหมด">ทั้งหมด</option>
        <option value="ปีนี้">ปีนี้</option>
        <option value="ปีที่แล้ว">ปีที่แล้ว</option>
      </select>
      {/* Dropdown เลือกปี */}
      <select
        value={year}
        onChange={(e) => setYear(e.target.value)}
        className="font-medium w-full border-s border-gray-300 pl-2 p-2 focus:outline-none bg-[#F6F6F6]"
      >
        {[2567, 2568, 2569].map((y) => (
          <option key={y} value={y}>{y}</option>
        ))}
      </select>
    </div>
  );
};

export default DateFilter;
