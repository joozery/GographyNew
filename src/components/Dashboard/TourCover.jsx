import React, { useState } from "react";

const TourCover = ({ coverImage, title }) => {
  const [imageError, setImageError] = useState(false); // ใช้ state เพื่อตรวจสอบข้อผิดพลาดของรูปภาพ

  // URL fallback หากไม่มีรูปภาพหรือโหลดไม่สำเร็จ
  const fallbackImage = "https://placehold.co/600x400";

  return (
    <div
      className="relative h-96 bg-cover bg-center"
      style={{
        backgroundImage: `url(${
          imageError || !coverImage ? fallbackImage : coverImage
        })`,
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <h1 className="text-white text-4xl font-bold text-center">
          {title || "No Title Available"}
        </h1>
      </div>
    </div>
  );
};

export default TourCover;
