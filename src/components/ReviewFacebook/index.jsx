const ReviewFacebook = () => {
  return (
    <>
      <div className="flex flex-col items-center container mx-auto">
        <div className="flex justify-between items-center w-full ">
          <span className="text-lg font-semibold text-[#18283E]">
            100+ รีวิวจากลูกค้าจริง
          </span>
          <span className="bg-[#D4D9E033] text-[#3F72B7] text-sm font-semibold px-2.5 py-1.5 rounded-full">
            100% แนะนำ
          </span>
        </div>
        <div className="flex w-full items-start">
          <span className="w-1/2 text-lg font-light  text-[#748193]">
            มั่นใจทุกการเดินทาง กับรีวิวจากนักเดินทางที่ประทับใจ 100%
            แนะนำให้คุณสัมผัสประสบการณ์สุดพิเศษไปกับเรา
          </span>
        </div>
      </div>
      <div className="relative w-full max-w-6xl mx-auto">
        <div
          className="elfsight-app-d63cd569-4cfe-48f0-bbba-280a8b25752b"
          data-elfsight-app-lazy
        ></div>

        {/* Left Overlay */}
        <div className="absolute top-0 left-0 h-full w-12 z-10 bg-gradient-to-r from-white to-transparent pointer-events-none"></div>

        {/* Right Overlay */}
        <div className="absolute top-0 right-0 h-full w-12 z-10 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
      </div>
    </>
  );
};
export default ReviewFacebook;
