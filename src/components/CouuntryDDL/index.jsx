import { Select } from "antd";
// import "flag-icon-css/css/flag-icon.min.css"; // ✅ Import Flag CSS
import { useEffect } from "react";

const CountrySelect = ({ countries, selectedCountry, setSelectedCountry }) => {
  // ✅ ตรวจสอบว่าถ้าไม่มีค่าที่เลือก ให้ตั้งเป็น "ทุกประเทศ"
  useEffect(() => {
    if (!selectedCountry) {
      setSelectedCountry({ label: "ทุกประเทศ", value: "" });
    }
  }, [selectedCountry]);

  return (
    <Select
      value={selectedCountry}
      onChange={(value) => setSelectedCountry(value)}
      options={[
        { value: "", label: "ทุกประเทศ" }, // ✅ เพิ่ม "ทุกประเทศ" เป็นค่าเริ่มต้น
        ...countries.map((country) => ({
          value: country.id,
          label: (
            <div className="flex items-center">
              {/* ✅ ถ้า `country.emoji` มีหลายค่า ("th,en") ให้แสดงหลายธง */}
              {country.emoji.split(",").map((code, i) => (
                <span key={i} className={`fi fi-${code.trim()} mx-1`}></span>
              ))}
              {country.name}
            </div>
          ),
        })),
      ]}
      labelInValue={true} // ✅ คืนค่า { label, value }
      className="w-full min-h-[38px]"
      placeholder="เลือกประเทศ"
    />
  );
};

export default CountrySelect;
