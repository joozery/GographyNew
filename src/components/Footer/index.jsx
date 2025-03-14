import { Link } from "react-router-dom";
import iconlink from "../../assets/icon/external-link.svg";
import iconline from "../../assets/Footer/line-icon.svg";
import iconphone from "../../assets/Footer/phone.svg";
import iconemail from "../../assets/Footer/mail.svg";
import iconmap from "../../assets/Footer/map-pin-house.svg";

export default function Footer() {
  return (
    <footer className="bg-white w-full text-gray-700 mt-20 px-4 md:px-12">
      <div className="flex flex-col md:grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-10 md:gap-20 py-5">
        {/* Left Section */}
        <div className="order-2 lg:order-1 flex flex-col justify-between py-4 px-3 lg:ml-16 text-center md:text-left">
          <h2 className="text-lg md:text-xl font-semibold bg-gradient-to-r from-[#18283E] to-[#3F72B7] bg-clip-text text-transparent font-bai leading-tight">
            การมอบช่วงเวลา<br />และความทรงจำที่ดีให้กับคุณ <br/>คือจุดหมายของเรา
          </h2>
          <span className="text-[12px] text-[#18283E]">
            Gography – ทริปถ่ายภาพที่ออกแบบโดยช่างภาพ เพื่อนักเดินทางตัวจริง
          </span>
          <div className="flex flex-col mt-4 text-sm text-gray-500 space-y-1">
            <a href="#" className="text-[#748193] underline">เงื่อนไขและข้อตกลง</a>
            <a href="#" className="text-[#748193] underline">นโยบายความเป็นส่วนตัว</a>
            <a href="#" className="text-[#748193] underline">นโยบายการคืนเงินและการยกเลิกทริป</a>
          </div>
          <p className="text-[14px] text-[#748193] mt-4 md:mt-0">
            Copyright © [2025] Gography. All Rights Reserved.
          </p>
        </div>

        {/* Middle Section */}
        <div className="order-1 lg:order-2 flex flex-col justify-between py-4 px-3 lg:ml-16 text-left">
          <h3 className="font-semibold">สื่อของเรา</h3>
          <ul className="mt-2 text-sm space-y-1">
            <li>
              <a 
                href="https://www.instagram.com/gographyth" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex gap-1 text-[#3F72B7] underline justify-start"
              >
                Instagram <img src={iconlink} className="w-4" alt="Instagram" />
              </a>
            </li>
            <li>
              <a 
                href="https://www.facebook.com/gographyy" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex gap-1 text-[#3F72B7] underline justify-start"
              >
                Facebook <img src={iconlink} className="w-4" alt="Facebook" />
              </a>
            </li>
            <li>
              <a 
                href="https://www.youtube.com/c/yourchannel" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex gap-1 text-[#3F72B7] underline justify-start"
              >
                Youtube <img src={iconlink} className="w-4" alt="YouTube" />
              </a>
            </li>
          </ul>

          <h3 className="font-semibold mt-4">ติดต่อ</h3>
          <ul className="mt-2 text-sm space-y-1">
            <li className="flex items-start gap-2 justify-start md:justify-start">
              <img src={iconmap} alt="" /> 79/579 รามคำแหง 150 แขวง/เขตสะพานสูง กรุงเทพ 10240
            </li>
            <li className="flex gap-2 justify-start md:justify-start">
              <img src={iconphone} alt="" /> +66 928780919
            </li>
            <li className="flex gap-2 justify-start md:justify-start">
              <img src={iconemail} alt="" /> info@gography.com
            </li>
            <li className="flex gap-2 justify-start md:justify-start">
              <img src={iconline} alt="" /> @gography
            </li>
          </ul>
        </div>

        {/* Right Section */}
        <div className="order-1 lg:order-3 grid grid-cols-2 md:grid-cols-2 gap-2 text-sm lg:ml-24 text-center">
          <a href="#" className="flex justify-center items-center bg-[#ECF1F8] hover:bg-neutral-200  p-2 rounded-md">🏠 ไปหน้าแรก</a>
          <a href="#" className="flex justify-center items-center bg-[#3F72B70A] hover:bg-neutral-200 p-2 rounded-md">📸 ดูแพ็กเกจทัวร์</a>
          <a href="#" className="flex justify-center items-center bg-[#3F72B70A] hover:bg-neutral-200 p-2 rounded-md">📆 ดูตารางทริป</a>
          <Link to="/Blog" className="flex justify-center items-center bg-[#ECF1F8] hover:bg-neutral-200 p-2 rounded-md">⭐ ดูรีวิวจากลูกค้า</Link>
          <a href="#" className="flex justify-center items-center bg-[#ECF1F8] hover:bg-neutral-200 p-2 rounded-md">📢 ติดต่อเรา</a>
          <a href="#" className="flex justify-center items-center bg-[#3F72B70A] hover:bg-neutral-200 p-2 rounded-md">📖 ดูบทความ</a>
        </div>
      </div>
    </footer>
  );
}