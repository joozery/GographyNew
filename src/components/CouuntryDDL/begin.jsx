import { Select } from "antd";
// import "flag-icon-css/css/flag-icon.min.css"; // ✅ Import Flag CSS
import { useEffect } from "react";

const CountrySelectBegin = ({
  countries,
  selectedCountry,
  setSelectedCountry,
}) => {
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
        { value: "", label: "ทุกประเทศ" },
        ...countries.map((country) => ({
          value: country.id,
          label: (
            <div className="w-full flex items-center">
              {country.emoji.split(",").map((code, i) => (
                <span key={i} className={`fi fi-${code.trim()} mx-1`}></span>
              ))}
              {country.name}
            </div>
          ),
        })),
      ]}
      dropdownStyle={{
        minWidth: "200px",
        maxHeight: "400px",
        overflowY: "auto",
      }} // ✅ ขยาย dropdown
      dropdownRender={(menu) => (
        <div
          style={{ maxHeight: "500px", overflowY: "auto", padding: "0px" }}
        >
          {menu}
        </div>
      )}
      labelInValue={true}
      className="w-full px-4 py-3 bg-gray-100 min-h-12 rounded-lg appearance-none border-none shadow-none focus:ring-0 focus:border-transparent"
      placeholder="เลือกประเทศ"
      suffixIcon={<span className="fi fi-chevron-down text-gray-500"></span>} // เปลี่ยนไอคอนลูกศร
    />
  );
};

export default CountrySelectBegin;
