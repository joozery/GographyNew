import React, { useState } from "react";

const AddTeamMemberForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    position: "",
    about: "",
    profileImage: null, // State สำหรับไฟล์รูปภาพ
  });

  const [previewImage, setPreviewImage] = useState(null); // แสดงตัวอย่างรูป
  const [successMessage, setSuccessMessage] = useState(""); // แสดงข้อความสำเร็จ

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        profileImage: file,
      }));
      setPreviewImage(URL.createObjectURL(file)); // แสดงตัวอย่างรูป
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData(); // ใช้ FormData สำหรับ multipart/form-data
    formDataToSend.append("firstName", formData.firstName);
    formDataToSend.append("lastName", formData.lastName);
    formDataToSend.append("position", formData.position);
    formDataToSend.append("about", formData.about);

    if (formData.profileImage) {
      formDataToSend.append("profileImage", formData.profileImage); // แนบไฟล์รูปภาพ
    }

    try {
      const response = await fetch("http://gography.website:3004/api/team-members", {
        method: "POST",
        body: formDataToSend, // ส่งข้อมูลในรูปแบบ FormData
      });

      if (!response.ok) {
        throw new Error("Failed to add team member");
      }

      const data = await response.json();
      console.log("Response from server:", data);

      setSuccessMessage("ทีมงานถูกเพิ่มเรียบร้อยแล้ว!"); // แสดงข้อความสำเร็จ

      // รีเซ็ตฟอร์ม
      setFormData({
        firstName: "",
        lastName: "",
        position: "",
        about: "",
        profileImage: null,
      });
      setPreviewImage(null);
    } catch (error) {
      console.error("Error adding team member:", error);
      setSuccessMessage("เกิดข้อผิดพลาดในการเพิ่มทีมงาน");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-center">เพิ่มทีมงาน</h2>

        {successMessage && (
          <div className="bg-green-100 text-green-700 p-3 rounded-lg mb-4">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* ชื่อ */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">ชื่อ</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
              placeholder="กรอกชื่อ"
              required
            />
          </div>

          {/* นามสกุล */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              นามสกุล
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
              placeholder="กรอกนามสกุล"
              required
            />
          </div>

          {/* ตำแหน่ง */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">ตำแหน่ง</label>
            <input
              type="text"
              name="position"
              value={formData.position}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
              placeholder="กรอกตำแหน่ง"
              required
            />
          </div>

          {/* เกี่ยวกับเรา */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              เกี่ยวกับเรา
            </label>
            <textarea
              name="about"
              value={formData.about}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
              placeholder="เพิ่มข้อมูลเกี่ยวกับเรา"
              rows="4"
              required
            ></textarea>
          </div>

          {/* รูปโปรไฟล์ */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              รูปโปรไฟล์
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
            {previewImage && (
              <img
                src={previewImage}
                alt="Profile Preview"
                className="mt-4 w-32 h-32 object-cover rounded-full mx-auto"
              />
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-all duration-200"
          >
            บันทึก
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTeamMemberForm;