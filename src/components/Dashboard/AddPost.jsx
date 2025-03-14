import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddPost = () => {
  const [title, setTitle] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [content, setContent] = useState("");
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");
  const [seoKeywords, setSeoKeywords] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // ฟังก์ชันจัดการการอัปโหลดไฟล์
  const handleFileChange = (e) => {
    setCoverImage(e.target.files[0]);
  };

  // ฟังก์ชันจัดการการเพิ่มโพสต์
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // ใช้ FormData เพื่ออัปโหลดไฟล์และข้อมูล
    const formData = new FormData();
    formData.append("title", title);
    formData.append("coverImage", coverImage);
    formData.append("content", content);
    formData.append("seoTitle", seoTitle);
    formData.append("seoDescription", seoDescription);
    formData.append("seoKeywords", seoKeywords);

    try {
      const response = await fetch("{http://gography.website:3004}/api/blogposts", {
        method: "POST",
        body: formData,
      });


      const data = await response.json();
      if (response.ok) {
        alert("✅ โพสต์ถูกเพิ่มเรียบร้อย!");
        navigate("/admin/blogpost"); // ✅ กลับไปที่หน้า Blogpost หลังจากบันทึกสำเร็จ
      } else {
        alert("❌ เกิดข้อผิดพลาด: " + data.error);
      }
    } catch (error) {
      console.error("❌ Error:", error);
      alert("❌ ไม่สามารถเพิ่มโพสต์ได้");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen font-prompt">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">เพิ่มโพสต์ใหม่</h1>
      <form onSubmit={handleSubmit} className="space-y-6 bg-white shadow-md rounded-lg p-6">
        {/* หัวข้อเรื่อง */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">หัวข้อเรื่อง</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="กรอกหัวข้อเรื่อง"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>

        {/* ภาพหน้าปก */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">ภาพหน้าปก</label>
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none"
          />
          {coverImage && (
            <img
              src={URL.createObjectURL(coverImage)}
              alt="Cover Preview"
              className="mt-3 w-64 rounded-lg shadow-md"
            />
          )}
        </div>

        {/* เนื้อหาของโพสต์ */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">เนื้อหา</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="เขียนเนื้อหาโพสต์ของคุณที่นี่..."
            rows="8"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>

        {/* SEO Settings */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-800">ตั้งค่า SEO</h2>
          <div>
            <label className="block text-gray-700 font-medium mb-2">SEO Title</label>
            <input
              type="text"
              value={seoTitle}
              onChange={(e) => setSeoTitle(e.target.value)}
              placeholder="ตั้งค่า SEO Title"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">SEO Description</label>
            <textarea
              value={seoDescription}
              onChange={(e) => setSeoDescription(e.target.value)}
              placeholder="เพิ่มคำอธิบายสำหรับ SEO"
              rows="3"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">SEO Keywords</label>
            <input
              type="text"
              value={seoKeywords}
              onChange={(e) => setSeoKeywords(e.target.value)}
              placeholder="เพิ่มคีย์เวิร์ดสำหรับ SEO (คั่นด้วย ,)"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>

        {/* ปุ่มบันทึกโพสต์ */}
        <div className="text-right">
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-300 disabled:bg-gray-400"
            disabled={loading}
          >
            {loading ? "กำลังบันทึก..." : "เผยแพร่โพสต์"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPost;