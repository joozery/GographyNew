import React from "react";

const GalleryUpload = ({ gallery, setTourData }) => {
  const handleGalleryChange = (e) => {
    const files = Array.from(e.target.files).map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setTourData((prevData) => {
      // ตรวจสอบไฟล์ที่ซ้ำ
      const existingFiles = prevData.gallery.map((item) => item.file.name);
      const uniqueFiles = files.filter((file) => !existingFiles.includes(file.file.name));

      return {
        ...prevData,
        gallery: [...prevData.gallery, ...uniqueFiles], // เพิ่มเฉพาะไฟล์ที่ไม่ซ้ำ
      };
    });
  };

  const removeImage = (index) => {
    setTourData((prevData) => {
      const newGallery = [...prevData.gallery];
      const removedImage = newGallery.splice(index, 1)[0];

      // ล้าง memory ของรูปที่ลบออก
      if (removedImage.preview) {
        URL.revokeObjectURL(removedImage.preview);
      }

      return { ...prevData, gallery: newGallery };
    });
  };

  return (
    <div>
      <h2 className="text-lg font-bold mt-6">Gallery</h2>
      <div className="border p-4 rounded-md flex items-center space-x-4">
        <label className="cursor-pointer bg-gray-200 px-4 py-2 rounded">
          <input
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={handleGalleryChange}
          />
          เลือกรูป
        </label>
        <span className="text-gray-400">เลือกภาพแกลอรี่ (รองรับหลายไฟล์)</span>
      </div>

      {/* แสดงภาพที่อัปโหลด */}
      {gallery.length > 0 ? (
        <div className="grid grid-cols-4 gap-4 mt-4">
          {gallery.map((image, index) => (
            <div key={index} className="relative">
              <img
                src={image.preview}
                alt="Gallery"
                className="w-full h-32 object-cover rounded-md"
              />
              <button
                className="absolute top-1 right-1 bg-red-500 text-white text-xs px-1 rounded"
                onClick={() => removeImage(index)}
              >
                ลบ
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 mt-4">ยังไม่มีภาพในแกลอรี่</p>
      )}
    </div>
  );
};

export default GalleryUpload;