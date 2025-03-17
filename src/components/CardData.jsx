import React, { use, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Swal from "sweetalert2";
import axios from "axios";
import CountryFlag from "./CountryFlag";

const API_BASE_URL =
  "https://servergogo-app-209f1146e735.herokuapp.com/api/tours";

const TourCard = ({ tour, Success }) => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log(tour);
  }, []);
  // ✅ ฟังก์ชันลบ
  const handleDelete = async () => {
    Swal.fire({
      title: "คุณแน่ใจหรือไม่?",
      text: "ทัวร์นี้จะถูกลบและไม่สามารถกู้คืนได้!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "ใช่, ลบเลย!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const result = await axios.delete(`${API_BASE_URL}/${tour.id}`);
          console.log(result);
          if (result.status === 200) {
            Swal.fire("ลบสำเร็จ!", "ทัวร์ถูกลบแล้ว", "success");
          }
          Success();
        } catch (error) {
          // Swal.fire("เกิดข้อผิดพลาด!", "ลบทัวร์ไม่สำเร็จ", "error");
          console.log(error);
        }
      }
    });
  };

  return (
    <div className="w-full rounded overflow-hidden shadow-lg mt-2 bg-white">
      {tour.image ? (
        <img
          className="w-full h-40 object-cover"
          src={tour.image}
          alt={tour.tour_name}
        />
      ) : (
        <img
          className="w-full h-40 object-cover"
          src="https://placehold.co/600x400"
          alt="placeholder"
        />
      )}
      <div className="flex flex-col gap-2 px-5 pt-4">
        <div className="font-bold text-xl mb-1">{tour.tour_name}</div>
        <CountryFlag countryCodes={tour.country_emoji} />
        <span className="text-gray-700 text-base">
          ประเทศ: {tour.country_name_th} ({tour.country_name})
        </span>
        <span className="text-gray-700 text-base">ราคา: {tour.price} บาท</span>
        <span className="text-gray-700 text-base">
          วันที่เริ่มต้น: {new Date(tour.start_date).toLocaleDateString()}
        </span>
        <span className="text-gray-700 text-base">
          วันที่สิ้นสุด: {new Date(tour.end_date).toLocaleDateString()}
        </span>
        <span className="text-gray-700 text-base">
          สถานที่: {tour.locations?.join(", ") || "ไม่ระบุ"}
        </span>
      </div>

      {/* ✅ ปุ่มแก้ไข & ลบ */}
      <div className="flex items-center justify-between px-5 py-3">
        <button
          onClick={() => navigate(`/admin/edit-tour/${tour.id}`)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-blue-600"
        >
          <FiEdit /> แก้ไข
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-red-600"
        >
          <FiTrash2 /> ลบ
        </button>
      </div>
    </div>
  );
};

export default TourCard;
