import React from "react";

const TourInformation = ({ information, pdfFile }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-8 text-gray-800">
      <button
        className="bg-blue-500 text-white px-6 py-2 rounded-lg mb-4 hover:bg-blue-600 transition-all"
        onClick={() => window.open(pdfFile, "_blank")} // เปิดไฟล์ PDF
        disabled={!pdfFile} // ปิดปุ่มถ้าไม่มี PDF
      >
        {pdfFile ? "Download Tour Plan" : "No Tour Plan Available"}
      </button>
      <h2 className="text-2xl font-bold mb-4">Information</h2>
      <div className="text-gray-700 leading-relaxed whitespace-pre-line">
        {information || "No information available"}
      </div>
    </div>
  );
};

export default TourInformation;