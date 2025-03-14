import React, { useState } from "react";

const ConfirmDeletePopup = ({ isOpen, onClose, onConfirm }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  if (!isOpen) return null;

  const handleConfirm = async () => {
    setIsDeleting(true);
    try {
      await onConfirm();
      onClose(); // ปิด Popup ยืนยัน และให้ Popup ลบสำเร็จแสดงผลต่อ
    } catch (error) {
      console.error("Error deleting tour:", error);
      alert("เกิดข้อผิดพลาดในการลบทัวร์");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-80">
        <h2 className="text-lg font-bold text-gray-800 mb-4">ยืนยันการลบ</h2>
        <p className="text-gray-600 mb-6">คุณแน่ใจหรือไม่ว่าต้องการลบทัวร์นี้?</p>
        <div className="flex justify-end space-x-4">
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded"
            onClick={onClose}
            disabled={isDeleting}
          >
            ยกเลิก
          </button>
          <button
            className={`bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded ${
              isDeleting ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleConfirm}
            disabled={isDeleting}
          >
            {isDeleting ? "กำลังลบ..." : "ลบ"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeletePopup;