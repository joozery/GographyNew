
function CountryFlag({ countryCodes }) {
  if (!countryCodes) return null; // ถ้ายังไม่มีข้อมูล ไม่แสดงอะไรเลย

  // แปลง String ที่มี "," ให้เป็น Array และลบช่องว่าง
  const codesArray = countryCodes
    .split(",")
    .map((code) => code.trim().toLowerCase());

  return (
    <div className="flex gap-2">
      {codesArray.map((code, index) => (
        <span key={index} className={`fi fi-${code} mx-1 mb-2 rounded-[4px] shadow`}></span>
      ))}
    </div>
  );
}

export default CountryFlag;
