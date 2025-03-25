import React, { useEffect, useState } from "react";
import "./Header.css";
import { Bell, Mail, Search } from "lucide-react";

export default function Header() {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    // ดึงข้อมูลการแจ้งเตือน
    const fetchNotifications = async () => {
      try {
        const response = await fetch("http://gography.website:3004/api/notifications");
        if (!response.ok) throw new Error("Failed to fetch notifications");
        const data = await response.json();
        setNotifications(data.notifications);
        setUnreadCount(data.notifications.filter((n) => !n.read).length);
      } catch (error) {
        console.error("❌ Error fetching notifications:", error);
      }
    };

    // fetchNotifications();

    // ✅ เปิด WebSocket สำหรับแจ้งเตือนเรียลไทม์
    // const ws = new WebSocket("ws://localhost:3003"); // แก้ไขพอร์ตให้ตรง
// ws.onmessage = (event) => {
//   const newNotification = JSON.parse(event.data);
//   setNotifications((prev) => [newNotification, ...prev]);
//   setUnreadCount((prev) => prev + 1);
//   playNotificationSound(); // เล่นเสียงแจ้งเตือน
// };

//     return () => ws.close();
  }, []);

  // ✅ ฟังก์ชันเล่นเสียงแจ้งเตือน
  // const playNotificationSound = () => {
  //   const audio = new Audio("/sounds/notification.mp3"); // เสียงแจ้งเตือน
  //   audio.play();
  // };

  return (
    <header className="header">
      <div className="header-left">
        <div className="search-bar">
          <Search size={18} />
          <input type="text" placeholder="Search..." />
        </div>
      </div>

      <div className="header-right">
        <div className="notification">
          <Bell className="notification-icon" size={22} />
          {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}
        </div>

        <div className="message-box">
          <Mail size={20} />
          <span>Messages</span>
        </div>
      </div>
    </header>
  );
}