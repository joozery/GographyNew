import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiUploadCloud, FiTrash2, FiXCircle } from "react-icons/fi";

const API_BASE_URL = "https://servergogo-app-209f1146e735.herokuapp.com/api";
const GALLERY_API = `${API_BASE_URL}/gallery`;
const COUNTRY_API = `${API_BASE_URL}/countries`;

const ManageGallery = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [titleTh, setTitleTh] = useState(""); // ✅ ช่องชื่อไทย
  const [imageFiles, setImageFiles] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]); // ✅ เก็บรายการรูปภาพที่อัปโหลด

  // ✅ ดึงรายการหมวดหมู่จาก API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(COUNTRY_API);
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
    fetchGalleryImages(); // ✅ ดึงรูปภาพจาก API
  }, []);

  // ✅ ดึงรายการรูปภาพจาก API
  const fetchGalleryImages = async () => {
    try {
      const response = await axios.get(GALLERY_API);
      setGalleryImages(response.data);
    } catch (error) {
      console.error("Error fetching gallery images:", error);
    }
  };

  // ✅ ฟังก์ชันอัปโหลดไฟล์
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles([...imageFiles, ...files]);

    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages([...previewImages, ...newPreviews]);
  };

  // ✅ ฟังก์ชันลบรูปก่อนอัปโหลด
  const handleRemoveImage = (index) => {
    const updatedFiles = [...imageFiles];
    const updatedPreviews = [...previewImages];

    updatedFiles.splice(index, 1);
    updatedPreviews.splice(index, 1);

    setImageFiles(updatedFiles);
    setPreviewImages(updatedPreviews);
  };

  // ✅ ฟังก์ชันอัปโหลดรูปภาพ
  const handleUpload = async () => {
    if (!selectedCategory || !titleTh || imageFiles.length === 0) {
      alert("กรุณาเลือกหมวดหมู่ กรอกชื่อภาพ และอัปโหลดรูปภาพ");
      return;
    }

    const formData = new FormData();
    formData.append("category_id", selectedCategory);
    formData.append("title_th", titleTh);
    imageFiles.forEach((file) => {
      formData.append("images", file);
    });

    try {
      await axios.post(`${GALLERY_API}/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("อัปโหลดแกลเลอรีสำเร็จ!");
      setImageFiles([]);
      setPreviewImages([]);
      setSelectedCategory("");
      setTitleTh("");
      fetchGalleryImages(); // ✅ โหลดรูปใหม่หลังอัปโหลด
    } catch (error) {
      console.error("Upload failed:", error);
      alert("อัปโหลดไม่สำเร็จ!");
    }
  };

  // ✅ ฟังก์ชันลบรูปภาพ
  const handleDeleteImage = async (id) => {
    if (!window.confirm("คุณต้องการลบรูปนี้ใช่หรือไม่?")) return;
    try {
      await axios.delete(`${GALLERY_API}/${id}`);
      alert("ลบรูปภาพสำเร็จ!");
      fetchGalleryImages(); // ✅ รีโหลดหลังลบ
    } catch (error) {
      console.error("Failed to delete image:", error);
      alert("ลบไม่สำเร็จ!");
    }
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">จัดการแกลเลอรี</h1>

      {/* ✅ เลือกหมวดหมู่ */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">เลือกหมวดหมู่</label>
        <select
          className="mt-1 block w-full border-black-700 rounded-md shadow-sm p-2"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">-- เลือกหมวดหมู่ --</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.emoji} {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* ✅ กรอกชื่อภาพภาษาไทย */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">ชื่อภาพ (ภาษาไทย)</label>
        <input
          type="text"
          placeholder="กรอกชื่อภาพ"
          value={titleTh}
          onChange={(e) => setTitleTh(e.target.value)}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
        />
      </div>

      {/* ✅ อัปโหลดรูป */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700">อัปโหลดรูปภาพ</label>
        <div className="flex items-center gap-3 mt-2">
          <input
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            id="fileUpload"
            onChange={handleFileChange}
          />
          <label
            htmlFor="fileUpload"
            className="cursor-pointer bg-indigo-500 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-600 transition flex items-center gap-2"
          >
            <FiUploadCloud size={20} /> เลือกรูป
          </label>
        </div>
      </div>

      {/* ✅ แสดงรูปที่อัปโหลด */}
      {previewImages.length > 0 && (
        <div className="grid grid-cols-3 md:grid-cols-4 gap-4 mb-6">
          {previewImages.map((src, index) => (
            <div key={index} className="relative">
              <img src={src} alt="Preview" className="w-full h-32 object-cover rounded-lg shadow" />
              <button
                className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full shadow hover:bg-red-700"
                onClick={() => handleRemoveImage(index)}
              >
                <FiXCircle size={18} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* ✅ ปุ่มอัปโหลด */}
      <button
        className="bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 transition w-full mb-6"
        onClick={handleUpload}
      >
        อัปโหลดแกลเลอรี
      </button>

      {/* ✅ แสดงรายการรูปภาพจาก Database */}
      <h2 className="text-2xl font-bold text-gray-800 mb-4">รายการแกลเลอรี</h2>
      <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
        {galleryImages.map((image) => (
          <div key={image.id} className="relative bg-white p-3 rounded-lg shadow">
            <img src={image.image_url} alt={image.title_th} className="w-full h-32 object-cover rounded-lg" />
            <p className="text-sm text-gray-700 mt-2">{image.title_th}</p>
            <button
              className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full shadow hover:bg-red-700"
              onClick={() => handleDeleteImage(image.id)}
            >
              <FiTrash2 size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageGallery;