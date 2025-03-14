import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import parse from "html-react-parser";
import { getTourById, updateTour } from "./tourService";
import "./AddTourForm.css";

const EditTourForm = () => {
  const { tourId } = useParams(); // รับ tourId จาก URL
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [tourData, setTourData] = useState({
    title: "",
    country: "",
    month: "",
    cover_image: null,
    pdf_file: null,
    information: "",
    terms_conditions: "",
    price: "",
    included: "",
    not_included: "",
    gallery: [],
  });

  const [errors, setErrors] = useState({
    information: false,
    terms_conditions: false,
    included: false,
    not_included: false,
  });

  const loadTourData = async () => {
    setLoading(true);
    try {
      const response = await getTourById(tourId);
      console.log(response);
      return;
      if (response) {
        setTourData({
          ...response,
          information: response.information || "",
          terms_conditions: response.terms_conditions || "",
          included: response.included || "",
          not_included: response.not_included || "",
        });
      }
    } catch (error) {
      console.error("Error fetching tour:", error);
      alert("เกิดข้อผิดพลาดในการโหลดข้อมูล");
    } finally {
      setLoading(false);
    }
  };

  // ✅ ดึงข้อมูลจาก Backend เมื่อเปิดหน้า Edit
  useEffect(() => {
    loadTourData();
  }, []);

  const handleQuillChange = (name, value) => {
    setTourData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: false,
    }));
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setTourData({
      ...tourData,
      [name]: type === "file" ? files[0] : value,
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);

    let missingFields = [];

    if (tourData.title.trim() === "") missingFields.push("ชื่อทัวร์");
    if (
      !tourData.information ||
      tourData.information.trim() === "" ||
      tourData.information === "<p><br></p>"
    )
      missingFields.push("รายละเอียดทัวร์");
    if (
      !tourData.terms_conditions ||
      tourData.terms_conditions.trim() === "" ||
      tourData.terms_conditions === "<p><br></p>"
    )
      missingFields.push("Terms & Conditions");
    if (tourData.price.trim() === "") missingFields.push("ราคา");
    if (
      !tourData.included ||
      tourData.included.trim() === "" ||
      tourData.included === "<p><br></p>"
    )
      missingFields.push("Included");
    if (
      !tourData.not_included ||
      tourData.not_included.trim() === "" ||
      tourData.not_included === "<p><br></p>"
    )
      missingFields.push("Not Included");

    if (missingFields.length > 0) {
      alert(`โปรดกรอกข้อมูลให้ครบถ้วน:\n- ${missingFields.join("\n- ")}`);
      setLoading(false);
      return;
    }

    try {
      await updateTour(tourId, tourData);
      alert("อัปเดตโปรแกรมทัวร์สำเร็จ!");
      navigate("/admin/manage-tour");
    } catch (error) {
      console.error("Error updating tour:", error);
      alert("เกิดข้อผิดพลาดในการอัปเดตข้อมูล");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">แก้ไขโปรแกรมทัวร์</h1>
      <form onSubmit={handleSave}>
        <div className="mb-6">
          <label>
            ชื่อทัวร์ <span className="text-red-700">*</span>
          </label>
          <input
            type="text"
            name="title"
            value={tourData.title}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
        </div>

        <div className="mb-6">
          <label>
            รายละเอียดทัวร์ <span className="text-red-700">*</span>
          </label>
          <ReactQuill
            theme="snow"
            value={tourData.information}
            onChange={(value) => handleQuillChange("information", value)}
            className={`border rounded bg-white ${
              errors.information ? "border-red-500" : ""
            }`}
          />
        </div>

        <div className="mb-6">
          <label>
            Terms & Conditions <span className="text-red-700">*</span>
          </label>
          <ReactQuill
            theme="snow"
            value={tourData.terms_conditions}
            onChange={(value) => handleQuillChange("terms_conditions", value)}
            className={`border rounded bg-white ${
              errors.terms_conditions ? "border-red-500" : ""
            }`}
          />
        </div>

        <div className="mb-6">
          <label>
            Included <span className="text-red-700">*</span>
          </label>
          <ReactQuill
            theme="snow"
            value={tourData.included}
            onChange={(value) => handleQuillChange("included", value)}
            className={`border rounded bg-white ${
              errors.included ? "border-red-500" : ""
            }`}
          />
        </div>

        <div className="mb-6">
          <label>
            Not Included <span className="text-red-700">*</span>
          </label>
          <ReactQuill
            theme="snow"
            value={tourData.not_included}
            onChange={(value) => handleQuillChange("not_included", value)}
            className={`border rounded bg-white ${
              errors.not_included ? "border-red-500" : ""
            }`}
          />
        </div>

        <div className="flex justify-end space-x-2 mt-6">
          <button
            type="submit"
            className={`bg-black text-white px-4 py-2 rounded ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "กำลังอัปเดต..." : "อัปเดตโปรแกรม"}
          </button>
          <button
            type="button"
            className="bg-gray-400 text-white px-4 py-2 rounded"
            onClick={() => navigate("/admin/manage-tour")}
          >
            ยกเลิก
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTourForm;
