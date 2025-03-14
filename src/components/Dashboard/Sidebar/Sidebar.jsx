import "./Sidebar.css";
import {
  Home,
  Users,
  FileText,
  Settings,
  MapPin,
  LogOut,
  Moon,
  Sun,
  Search,
  ChevronLeft,
  ChevronRight,
  User,
  Briefcase,
  Edit3, // ไอคอนใหม่สำหรับ Blogpost
  Globe, // ✅ เพิ่มไอคอนสำหรับ Manage Country
  Building,
  Image,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const menuItems = [
  { name: "Dashboard", icon: <Home />, path: "/admin/overview" },
  { name: "Notifications", icon: <Users />, path: "/admin/notifications" },
  { name: "Manage Gallery", icon: <Image />, path: "/admin/manage-gallery" }, // ✅ เพิ่มเมนู Manage Gallery
];

const adminMenuItems = [
  { name: "User Management", icon: <User />, path: "/admin/user-management" },
  { name: "Manage Tour", icon: <Briefcase />, path: "/admin/manage-tour" },
  { name: "Manage Country", icon: <Globe />, path: "/admin/manage-country" }, // ✅ เพิ่มเมนู Manage Country
  { name: "Manage Partner", icon: <Building />, path: "/admin/manage-partners" },
  { name: "Blogpost", icon: <Edit3 />, path: "/admin/blogpost" }, // เพิ่มเมนู Blogpost
  { name: "Our Team", icon: <Users />, path: "/admin/ourteam" }, // ✅ เพิ่มเมนู Our Team
  { name: "Settings", icon: <Settings />, path: "/admin/settings" },
];

export default function Sidebar() {
  const [darkMode, setDarkMode] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // State สำหรับเก็บคำค้นหา
  const [adminName, setAdminName] = useState(""); // ชื่อ Admin
  const [adminRole, setAdminRole] = useState(""); // บทบาท Admin
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchAdminInfo = async () => {
      try {
        const response = await fetch("http://gography.website:3004/api/admin/info");
        if (!response.ok) throw new Error("Failed to fetch admin info");
        const data = await response.json();
        setAdminName(data.name);
        setAdminRole(data.role || "Admin");
      } catch (error) {
        console.error("Error fetching admin info:", error);
      }
    };

    fetchAdminInfo();
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
  };

  // ฟังก์ชันกรองเมนูตามคำค้นหา
  const filteredMenuItems = menuItems.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredAdminMenuItems = adminMenuItems.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`sidebar ${darkMode ? "dark" : "light"} ${collapsed ? "collapsed" : ""} overflow-y-auto sidebar-custom`}>
      {/* Sidebar Header */}
      <div className="sidebar-header">
        <span className="logo">CL</span>
        {!collapsed && (
          <div className="header-info">
            <span className="company-name">{adminName || "Admin"}</span>
            <span className="role">{adminRole || "Web Developer"}</span>
          </div>
        )}
        <button
          className="collapse-btn"
          onClick={() => setCollapsed(!collapsed)}
          title="Toggle Sidebar"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      {/* Search Bar */}
      <div className="search-box">
        <Search className="search-icon" />
        {!collapsed && (
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // อัปเดตคำค้นหา
          />
        )}
      </div>

      {/* Menu List */}
      <ul className="sidebar-menu">
        <li className="menu-section">General</li>
        {filteredMenuItems.map((item) => (
          <li
            key={item.name}
            className={`sidebar-item ${location.pathname === item.path ? "active" : ""}`}
            onClick={() => handleNavigation(item.path)}
          >
            {item.icon}
            {!collapsed && <span>{item.name}</span>}
          </li>
        ))}
        <li className="menu-section">Admin</li>
        {filteredAdminMenuItems.map((item) => (
          <li
            key={item.name}
            className={`sidebar-item ${location.pathname === item.path ? "active" : ""}`}
            onClick={() => handleNavigation(item.path)}
          >
            {item.icon}
            {!collapsed && <span>{item.name}</span>}
          </li>
        ))}
      </ul>

      {/* Dark Mode Toggle */}
      <div className="toggle-mode">
        <button onClick={() => setDarkMode(!darkMode)} title="Toggle Theme">
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          {!collapsed && (darkMode ? "Light Mode" : "Dark Mode")}
        </button>
      </div>

      {/* Logout Button */}
      <button className="sidebar-logout" onClick={() => navigate("/login")}>
        <LogOut size={18} /> {!collapsed && "Logout"}
      </button>
    </div>
  );
}