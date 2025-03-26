import React, { useState } from "react";
import { Switch } from "antd";
import axios from "axios";

const TourStatusSwitch = ({ tour, Success }) => {
  const [status, setStatus] = useState(tour.status.toString());
  const [loading, setLoading] = useState(false); // ✅ สร้าง state loading

  const handleChange = async (checked) => {
    const newStatus = checked ? "1" : "0";
    setStatus(newStatus);
    setLoading(true); // ✅ เริ่มโหลด

    try {
      const res = await axios.patch(
        `https://servergogo-app-209f1146e735.herokuapp.com/api/tours/${tour.id}/status`,
        { status: newStatus }
      );
      console.log("Status updated:", res.data);
      Success();
    } catch (err) {
      console.error("Error updating status:", err);
    } finally {
      setLoading(false); // ✅ หยุดโหลด
    }
  };

  return (
    <Switch
      checked={status === "1"}
      onChange={handleChange}
      checkedChildren="✓"
      unCheckedChildren="✗"
      loading={loading} // ✅ ใช้ loading กับ Switch
      style={{
        backgroundColor: status === "1" ? "#22c55e" : "#d1d5db",
      }}
    />
  );
};

export default TourStatusSwitch;
