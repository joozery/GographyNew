import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FiPlusCircle } from "react-icons/fi";
import TourCard from "../CardData";
import { FaSpinner } from "react-icons/fa";

const API_BASE_URL = "https://servergogo-app-209f1146e735.herokuapp.com/api";
const TOUR_API = `${API_BASE_URL}/tours`;

const ManageTour = () => {
  const [Data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // ✅ เพิ่ม state สำหรับ loading
  const navigate = useNavigate();

  // ✅ โหลดข้อมูลทัวร์
  const GetData = async () => {
    try {
      const response = await axios.get(TOUR_API);
      setData(response.data.tours);
    } catch (error) {
      console.error("Error loading tours:", error);
    } finally {
      setLoading(false); // ✅ ปิด loading เมื่อโหลดข้อมูลเสร็จ
    }
  };

  useEffect(() => {
    GetData();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen w-full">
      {/* ✅ Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Manage Tours</h1>
        <button
          className="bg-purple-600 text-white px-4 py-2 rounded-lg shadow flex items-center gap-2 hover:bg-purple-700 transition"
          onClick={() => navigate("/admin/add-tour")}
        >
          <FiPlusCircle size={20} /> Add New Tour
        </button>
      </div>

      {/* ✅ Filter Tabs */}
      <div className="flex gap-6 border-b-2 border-gray-300 pb-2">
        <button className="pb-2 px-4 font-semibold border-b-4 border-purple-600 text-purple-600">
          Published
        </button>
      </div>

      {/* ✅ Tour List */}
      {loading ? (
        // ✅ แสดง Loading Spinner (CSS animation)
        <div className="flex justify-center items-center py-10">
          <div className="flex items-center gap-3">
            <FaSpinner className="animate-spin text-purple-500 text-2xl" />
            <span className="font-semibold text-xl">กำลังโหลดข้อมูล...</span>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mt-6">
          {Data.length > 0 ? (
            // ✅ แสดงรายการทัวร์
            Data.map((tour) => <TourCard key={tour.id} tour={tour} Success={GetData} />)
          ) : (
            // ✅ ถ้าไม่มีทัวร์ให้แสดงข้อความ
            <div className="col-span-4 text-center text-gray-500">
              No tours found.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ManageTour;
