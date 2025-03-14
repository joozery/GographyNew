import { useState } from "react";
import { FiPhone, FiMenu, FiX } from "react-icons/fi"; // เพิ่ม FiMenu, FiX
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-lg z-50 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-6 md:px-12 py-4">
        
        {/* โลโก้ */}
        <div className="text-2xl font-bold bg-gradient-to-r from-[#18283E] to-[#3F72B7] bg-clip-text text-transparent">
          GOGRAPHY
        </div>

        {/* เมนูสำหรับ Desktop */}
        <ul className="hidden lg:flex gap-x-10 text-[#3F72B7] font-bai text-lg">
          <Link to="/" className="hover:text-[#305a92] transition">หน้าหลัก</Link>
          <Link to="/Trips" className="hover:text-[#305a92] transition">ทริปท่องเที่ยว</Link>
          {/*<Link to="/Aboutus" className="hover:text-[#305a92] transition">เกี่ยวกับเรา</Link>*/}
          <Link to="/Gallery" className="hover:text-[#305a92] transition">แกลเลอรี่</Link>
          <Link to="/Blog" className="hover:text-[#305a92] transition">รีวิว</Link>
        </ul>

        {/* ปุ่มติดต่อเรา */}
        <button className="hidden lg:flex items-center gap-2 border border-gray-500 px-3 py-2 rounded-md text-gray-700 hover:border-[#305a92] hover:text-[#305a92] transition">
          <FiPhone className="text-lg" />
          ติดต่อเรา
        </button>

        {/* Hamburger Menu สำหรับมือถือ */}
        <div className="lg:hidden flex items-center">
          <button onClick={() => setIsOpen(!isOpen)} className="text-2xl text-[#3F72B7]">
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* เมนูสำหรับมือถือ */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white shadow-lg">
          <ul className="flex flex-col text-center text-[#3F72B7] font-bai text-lg py-4">
            <Link to="/" className="py-2 hover:text-[#305a92] transition" onClick={() => setIsOpen(false)}>หน้าหลัก</Link>
            <Link to="/Trips" className="py-2 hover:text-[#305a92] transition" onClick={() => setIsOpen(false)}>ทริปท่องเที่ยว</Link>
            <Link to="/Aboutus" className="py-2 hover:text-[#305a92] transition" onClick={() => setIsOpen(false)}>เกี่ยวกับเรา</Link>
            <Link to="/Gallery" className="py-2 hover:text-[#305a92] transition" onClick={() => setIsOpen(false)}>แกลเลอรี่</Link>
            {/*<Link to="/Blog" className="py-2 hover:text-[#305a92] transition" onClick={() => setIsOpen(false)}>รีวิว</Link>*/}
            <button className="flex items-center justify-center gap-2 border border-gray-500 mx-6 px-3 py-2 rounded-md text-gray-700 hover:border-[#305a92] hover:text-[#305a92] transition" onClick={() => setIsOpen(false)}>
              <FiPhone className="text-lg" />
              ติดต่อเรา
            </button>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;