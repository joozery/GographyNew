import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const API_URL = "http://gography.website:3004";
const IMAGE_BASE_URL = `${API_URL}/uploads/`;

const SingleTourDetails = () => {
  const { id } = useParams(); // รับค่า `id` จาก URL
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTourDetails = async () => {
      try {
        const response = await fetch(`${API_URL}/api/tours/${id}`);
        if (!response.ok) throw new Error("ไม่สามารถโหลดข้อมูลทัวร์ได้");

        const data = await response.json();
        setTour(data.tour);
      } catch (err) {
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูลทัวร์:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTourDetails();
  }, [id]);

  if (loading) return <div className="text-center mt-10">กำลังโหลดข้อมูล...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;

  const coverImageUrl = tour?.cover_image
    ? `${API_URL}${tour.cover_image}`
    : "https://placehold.co/1920x1080"; // ใช้รูป Placeholder ถ้าไม่มี cover_image

  return (
    <div className="min-h-screen bg-gray-100">
      {/* ส่วนแสดงภาพปกพร้อมชื่อ */}
      <div
        className="relative h-[50vh] bg-cover bg-center"
        style={{
          backgroundImage: `url(${coverImageUrl})`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-white text-4xl md:text-6xl font-bold text-center px-4">
            {tour?.title || "ไม่มีชื่อเรื่อง"}
          </h1>
        </div>
      </div>

      {/* รายละเอียดทัวร์ */}
      <div className="container mx-auto px-6 py-10">
        <h2 className="text-2xl font-bold mb-4">ข้อมูลทัวร์</h2>
        <p className="text-gray-700 leading-relaxed mb-6">
          {tour?.information || "ไม่มีข้อมูลเพิ่มเติมสำหรับทัวร์นี้"}
        </p>

        {/* ปุ่มดาวน์โหลด PDF */}
        {tour?.pdf_file && (
          <a
            href={`${IMAGE_BASE_URL}${tour.pdf_file}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-all"
          >
            ดาวน์โหลดแผนการเดินทาง
          </a>
        )}
      </div>
    </div>
  );
};

export default SingleTourDetails;