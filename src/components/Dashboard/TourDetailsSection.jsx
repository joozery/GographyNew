import React, { useEffect, useState } from "react";

const API_BASE_URL = "https://servergogo-app-209f1146e735.herokuapp.com/api";

const TourDetailsSection = ({ tourData, handleChange, requirefield }) => {
  const [countries, setCountries] = useState([]);

  // ✅ โหลดข้อมูลประเทศจาก API
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/countries`);
        if (!response.ok) throw new Error("โหลดรายชื่อประเทศล้มเหลว");
        const data = await response.json();
        
        console.log("🌍 Countries API Response:", data); // ✅ Debug API Response
        
        if (!Array.isArray(data)) throw new Error("ข้อมูลประเทศไม่ใช่ Array");
        setCountries(data);
      } catch (error) {
        console.error("❌ Error fetching countries:", error);
      }
    };
  
    fetchCountries();
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      {/* ชื่อทัวร์ */}
      <div>
        <label>ชื่อทัวร์ {requirefield}</label>
        <input
          type="text"
          name="tour_name"
          value={tourData.tour_name || ""}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          required
        />
      </div>

      {/* ประเทศ (ภาษาไทย) */}
      <div>
        <label>ประเทศ (TH) {requirefield}</label>
        <input
          type="text"
          name="country_th"
          value={tourData.country_th || ""}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          required
        />
      </div>

      {/* ✅ ประเทศ (EN) ดึงจาก API */}
      <div>
        <label>ประเทศ (EN)</label>
        <select
          name="country_en"
          value={tourData.country_en || ""}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        >
          <option value="">เลือกประเทศ</option>
          {countries.map((country) => (
            <option key={country.code} value={country.name_en}>
              {country.name_en}
            </option>
          ))}
        </select>
      </div>

      {/* ไฮไลท์ของทริป */}
      <div>
        <label>ไฮไลท์</label>
        <input
          type="text"
          name="highlight"
          value={tourData.highlight || ""}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
      </div>

      {/* วันที่เริ่มทัวร์ */}
      <div>
        <label>วันที่เริ่มเดินทาง</label>
        <input
          type="date"
          name="start_date"
          value={tourData.start_date || ""}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
      </div>

      {/* วันที่สิ้นสุดทัวร์ */}
      <div>
        <label>วันที่สิ้นสุดเดินทาง</label>
        <input
          type="date"
          name="end_date"
          value={tourData.end_date || ""}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
      </div>

      {/* ระยะเวลาของทริป */}
      <div>
        <label>ระยะเวลา</label>
        <input
          type="text"
          name="duration"
          value={tourData.duration || ""}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          placeholder="เช่น 7 วัน / 5 คืน"
        />
      </div>

      {/* ประเภทการเดินทาง */}
      <div>
        <label>ประเภทการเดินทาง</label>
        <input
          type="text"
          name="travel_type"
          value={tourData.travel_type || ""}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          placeholder="เช่น ทัวร์แบบกลุ่ม (15)"
        />
      </div>

      {/* สถานที่ที่รวมในทัวร์ */}
      <div>
        <label>สถานที่ในทัวร์ (คั่นด้วย `,`)</label>
        <input
          type="text"
          name="locations"
          value={(tourData.locations || []).join(", ")}
          onChange={(e) =>
            handleChange({
              target: {
                name: "locations",
                value: e.target.value.split(",").map((loc) => loc.trim()),
              },
            })
          }
          className="border p-2 rounded w-full"
          placeholder="Lofoten, Senja, Tromso"
        />
      </div>

      {/* สิ่งที่รวมในทัวร์ */}
      <div>
        <label>สิ่งที่รวม</label>
        <input
          type="text"
          name="included"
          value={tourData.included || ""}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          placeholder="รวมตั๋วเครื่องบิน, ที่พัก, อาหารเช้า"
        />
      </div>

      {/* สิ่งที่ไม่รวมในทัวร์ */}
      <div>
        <label>สิ่งที่ไม่รวม</label>
        <input
          type="text"
          name="not_included"
          value={tourData.not_included || ""}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          placeholder="ไม่รวมทิปไกด์, ค่าใช้จ่ายส่วนตัว"
        />
      </div>

      {/* เพิ่มรูปปกทัวร์ */}
      <div>
        <label>เพิ่มรูปปกทัวร์</label>
        <input
          type="file"
          name="cover_image"
          accept="image/*"
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
      </div>

      {/* เพิ่มไฟล์ PDF */}
      <div>
        <label>เพิ่มไฟล์ PDF</label>
        <input
          type="file"
          name="pdf_file"
          accept=".pdf"
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
      </div>
    </div>
  );
};

export default TourDetailsSection;