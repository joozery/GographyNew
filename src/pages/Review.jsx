import { FaStar } from "react-icons/fa";

const ReviewPage = () => {
  return (
    <section className="max-w-6xl mx-auto py-28 px-6 font-baijam">
      {/* ✅ หัวข้อรีวิว */}
      <div className="text-center mb-10">
        <h2 className="text-4xl font-extrabold bg-gradient-to-r from-[#18283E] to-[#3F72B7] text-transparent bg-clip-text leading-tight">
          รีวิวจากลูกค้าของเรา
        </h2>
        <p className="text-gray-600 text-lg mt-2">
          ความคิดเห็นจริงจากลูกค้าของเรา บริการที่ได้รับการยืนยันแล้ว!
        </p>
      </div>

      {/* ✅ พื้นที่สำหรับรีวิว */}
      <div className="bg-white  rounded-xl p-6">
        {/* 🔹 Facebook Review Widget */}
        <div
          className="elfsight-app-1d3c061e-0daf-458a-9bc1-844f8cd763dd"
          data-elfsight-app-lazy
        ></div>
      </div>

      {/* ✅ คะแนนเฉลี่ย (Optional) */}
      <div className="mt-10 text-center">
        <p className="text-xl font-bold text-gray-800">คะแนนเฉลี่ยจากลูกค้า</p>
        <div className="flex justify-center items-center mt-2">
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} className="text-yellow-500 text-2xl" />
          ))}
        </div>
        <p className="text-gray-600 text-sm mt-1">
          จากรีวิวทั้งหมด 250+ รายการ
        </p>
      </div>
    </section>
  );
};

export default ReviewPage;
