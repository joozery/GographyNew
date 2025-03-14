import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TourDetailsSection from "./TourDetailsSection";
import TourPlanSection from "./TourPlanSection";
import GalleryUpload from "./GalleryUpload";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { saveTour, saveTourPlan } from "./tourService";

const AddTourForm = () => {
  const navigate = useNavigate();
  const [tourData, setTourData] = useState({
    title: "",
    country: "Norway",
    month: "January",
    cover_image: null,
    pdf_file: null,
    information: "",
    terms_conditions: "",
    price: "",
    included: "",
    not_included: "",
    gallery: [],
  });

  const [tourPlan, setTourPlan] = useState([{ id: 1, day: 1, date: "", description: "", images: null }]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setTourData({ ...tourData, [name]: type === "file" ? files[0] : value });
  };

  const requirefield = <span className="text-red-700">*</span>;

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await saveTour(tourData);
      const tourId = result.tourId;

      if (!tourId) throw new Error("ไม่สามารถสร้างโปรแกรมทัวร์ได้");

      await saveTourPlan(tourId, tourPlan);
      alert("โปรแกรมทัวร์บันทึกสำเร็จ!");
      navigate("/admin/manage-tour");
    } catch (error) {
      console.error("Failed to save tour:", error);
      alert(error.message || "เกิดข้อผิดพลาด กรุณาลองใหม่");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">เพิ่มโปรแกรมทัวร์</h1>
      <form onSubmit={handleSave}>
        {/* ✅ ใช้ Component ที่แยกออกมา */}
        <TourDetailsSection tourData={tourData} handleChange={handleChange} requirefield={requirefield} />

        <div className="mb-6">
          <label>รายละเอียดทัวร์ {requirefield}</label>
          <ReactQuill
            theme="snow"
            value={tourData.information}
            onChange={(value) => setTourData({ ...tourData, information: value })}
            className="border rounded bg-white"
          />
        </div>

        <TourPlanSection tourPlan={tourPlan} setTourPlan={setTourPlan} />
        <GalleryUpload gallery={tourData.gallery} setTourData={setTourData} />

        <div className="flex justify-end space-x-2 mt-6">
          <button type="submit" className={`bg-black text-white px-4 py-2 rounded ${loading ? "opacity-50 cursor-not-allowed" : ""}`} disabled={loading}>
            {loading ? "กำลังบันทึก..." : "บันทึกโปรแกรม"}
          </button>
          <button type="button" className="bg-gray-400 text-white px-4 py-2 rounded" onClick={() => navigate("/admin/manage-tour")}>
            ยกเลิก
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTourForm;