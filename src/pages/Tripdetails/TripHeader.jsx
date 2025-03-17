import { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import axios from "axios";
import { LuArrowLeft } from "react-icons/lu";
import CountryFlag from "../../components/CountryFlag";

const TripHeader = ({ tourId , HeaderData }) => {
  const scrollRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [tourimage, setTourimage] = useState([]);

  const GetGallery = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://servergogo-app-209f1146e735.herokuapp.com/api/gallery/${tourId}`
      );
      console.log("response header", response.data);
      setTourimage(response.data);
    } catch (error) {
      console.error("Error fetching gallery:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    GetGallery();
  }, [tourId]); // เพิ่ม tourId เป็น dependency

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  function formatPrice(price) {
    // 1. แปลงเป็น String
    let priceString = price.toString();
  
    // 2. ตัด ".00" ออก (ถ้ามี)
    if (priceString.endsWith(".00")) {
      priceString = priceString.slice(0, -3);
    }
  
    // 3. แบ่งหลักด้วยเครื่องหมายจุลภาค
    const parts = priceString.split("."); // แบ่งส่วนจำนวนเต็มและทศนิยม (ถ้ามี)
    const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ","); // แบ่งหลักจำนวนเต็ม
  
    // 4. ประกอบกลับ (ถ้ามีทศนิยม)
    if (parts.length > 1) {
      return integerPart + "." + parts[1];
    } else {
      return integerPart;
    }
  }

  return (
    <section className="relative w-full md:px-12 md:pb-14 md:pt-5 font-bai">
      <div className="flex justify-start items-center mb-2"> 
          <span className="flex items-center gap-2 font-bai text-[#748193] text-sm cursor-pointer hover:scale-95 transition duration-300 px-2 py-1 rounded-md"
          onClick={() => window.history.back()}>
          <LuArrowLeft/>
            ย้อนกลับ
          </span>
        </div>
      <div className="max-w-[1480px] mx-auto w-full">
        <div className="w-full flex justify-between items-end mb-6">
          <div className="flex flex-col justify-start items-start gap-3">
            <div>
              {/* <span className="text-xl mr-2">{HeaderData.emoji}</span> */}
              <CountryFlag countryCodes={HeaderData.emoji} />
              <span className="text-gray-500 text-sm">{HeaderData.name_th} / {HeaderData.name}</span>
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#3F72B7] to-[#18283E] bg-clip-text text-transparent font-bai leading-tight">
                {HeaderData.title}
              </h2>
            </div>
          </div>
          <div className="text-3xl font-bold text-[#18283E]">{formatPrice(HeaderData.price)} ฿</div>
        </div>

        <div className="relative mt-4">
          <div className="relative flex items-center">
            <button
              onClick={() => handleScroll("left")}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10"
            >
              <FaChevronLeft className="text-gray-700" />
            </button>

            <div
              ref={scrollRef}
              className="flex space-x-4 overflow-hidden whitespace-nowrap px-10"
            >
              {loading ? (
                <p>Loading...</p>
              ) : (
                tourimage.map((item, index) => (
                  <img
                    key={index}
                    src={item.image_url} // ✅ ใช้ URL จาก API
                    alt={`Trip ${index + 1}`}
                    className="w-44 h-32 rounded-lg shadow-md"
                  />
                ))
              )}
            </div>

            <button
              onClick={() => handleScroll("right")}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10"
            >
              <FaChevronRight className="text-gray-700" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TripHeader;