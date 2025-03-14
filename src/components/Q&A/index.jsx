import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import iconlink from "../../assets/icon/external-link.svg";
import imggrid from "../../assets/grid.png";

const faqs = [
  {
    question: "ทำไมถึงไม่รวมอาหาร ?",
    answer:
      "เรามุ่งเน้นการให้บริการที่ยืดหยุ่น ลูกค้าสามารถเลือกอาหารตามความต้องการของตนเองได้",
  },
  {
    question: "ทัวร์ถ่ายภาพของเราคืออะไร และมีการเก็บค่าบริการหรือไม่ ?",
    answer:
      "ทัวร์ถ่ายภาพของเราเป็นบริการนำเที่ยวพร้อมแนะนำสถานที่ถ่ายภาพสวย ๆ โดยมีค่าบริการขึ้นอยู่กับแพ็กเกจที่เลือก",
  },
  {
    question: "บริษัทเปิดมานานแค่ไหนแล้ว มีความน่าเชื่อถือหรือไม่ ?",
    answer:
      "เราเปิดให้บริการมานานกว่า 10 ปี และมีรีวิวจากลูกค้ามากมายที่สามารถตรวจสอบได้",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-center max-w-6xl mx-auto p-6">
      <div className="w-full md:w-1/3 h-[250px] pb-10 flex flex-col justify-center items-center" style={{ backgroundImage: `url('${imggrid}')`, backgroundSize: "cover", backgroundPosition: "center"}}>
        <h2 className="text-xl md:text-3xl min-h-[90px] font-semibold bg-gradient-to-r from-[#18283E] to-[#3F72B7] bg-clip-text text-transparent font-bai leading-tight">
          คำถามที่
          <br />
          ถูกถามบ่อยครั้ง
        </h2>
        <div className="flex justify-start items-center space-x-1">
          <p className="font-semibold text-base text-[#18283E]">
            ยังมีคำถามอื่นเพิ่มเติม?
          </p>
          <a href="#" className="text-[#3F72B7] flex gap-1">
            ถามเราที่นี่
            <img src={iconlink} alt="" />
          </a>
        </div>
      </div>
      <div className="w-2/3">
        <div className="space-y-2">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border-b border-dashed border-gray-300 pb-2"
            >
              <button
                className="w-full flex justify-between items-center text-left text-gray-800 font-medium py-2"
                onClick={() => toggleFAQ(index)}
              >
                {faq.question}
                {openIndex === index ? <Minus size={18} /> : <Plus size={18} />}
              </button>
              {openIndex === index && (
                <p className="text-gray-600 mt-2">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
