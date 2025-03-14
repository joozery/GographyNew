import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { MdOutlineStars } from "react-icons/md";

const countries = [
  { name: "สวีเดน", flag: "\ud83c\uddf8\ud83c\uddea" },
  { name: "ญี่ปุ่น", flag: "\ud83c\uddef\ud83c\uddf5" },
  { name: "ไทย", flag: "\ud83c\uddf9\ud83c\uddfc" }
];

const months = ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน"];
const years = ["2568", "2569", "2570"];

export default function TravelSearch() {
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [selectedMonth, setSelectedMonth] = useState(months[0]);
  const [selectedYear, setSelectedYear] = useState(years[0]);

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md space-y-4">
      <h2 className="text-2xl font-semibold">เริ่มต้นการท่องเที่ยว</h2>
      <p className="text-gray-600">ค้นหาช่วงเวลาท่องเที่ยวที่คุณต้องการ</p>

      <div className="space-y-2">
        <label className="block font-medium">ประเทศ</label>
        <select
          className="w-full border rounded-md p-2"
          value={selectedCountry.name}
          onChange={(e) =>
            setSelectedCountry(countries.find((c) => c.name === e.target.value))
          }
        >
          {countries.map((country) => (
            <option key={country.name} value={country.name}>
              {country.flag} {country.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block font-medium">ช่วงเวลา</label>
          <select
            className="w-full border rounded-md p-2"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            {months.map((month) => (
              <option key={month} value={month}>{month}</option>
            ))}
          </select>
        </div>
        <div className="flex-1">
          <label className="block font-medium">ปี</label>
          <select
            className="w-full border rounded-md p-2"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            {years.map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
      </div>

      <button className="w-full bg-blue-600 text-white py-2 rounded-md flex items-center justify-center gap-2">
        <FaSearch /> ค้นหา
      </button>

      <div className="relative border border-purple-300 bg-gradient-to-r from-pink-100 to-purple-100 p-4 rounded-md flex items-center gap-2">
        <MdOutlineStars className="text-purple-500 text-2xl" />
        <div>
          <p className="text-purple-600 font-semibold">จัดทริปส่วนตัว</p>
          <p className="text-sm text-gray-600">ประสบการณ์เพื่อคุณโดยเฉพาะ!</p>
        </div>
      </div>
    </div>
  );
}
