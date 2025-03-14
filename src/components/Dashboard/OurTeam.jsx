import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate
import { Plus, Filter, Trash } from "lucide-react";

const API_URL = "http://gography.website:3004"; // URL สำหรับดึงข้อมูลทีมงาน

const OurTeam = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [activeTab, setActiveTab] = useState("Published");
  const navigate = useNavigate(); // ✅ Initialize useNavigate

  useEffect(() => {
    // Fetch team members from API
    const fetchTeamMembers = async () => {
      try {
        const response = await fetch(`${API_URL}/api/team-members`);
        if (!response.ok) throw new Error("Failed to fetch team members");
        const data = await response.json();
        setTeamMembers(data.teamMembers); // สมมติ API คืนค่า { teamMembers: [...] }
      } catch (error) {
        console.error("Error fetching team members:", error);
      }
    };

    fetchTeamMembers();
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleAddTeamMember = () => {
    navigate("/admin/add-team-member"); // ✅ Navigate to the add-team-member page
  };

  const handleDeleteMember = async (id) => {
    const confirmDelete = window.confirm("คุณต้องการลบทีมงานคนนี้หรือไม่?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`${API_URL}/api/team-members/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete team member");

      // Remove deleted member from the list
      setTeamMembers((prevMembers) =>
        prevMembers.filter((member) => member.id !== id)
      );
      alert("ลบทีมงานสำเร็จแล้ว!");
    } catch (error) {
      console.error("Error deleting team member:", error);
      alert("เกิดข้อผิดพลาดในการลบทีมงาน กรุณาลองใหม่อีกครั้ง");
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">ทีมงานของเรา</h1>
        <div className="flex space-x-4">
          <button
            className="bg-black text-white px-5 py-2 rounded-lg flex items-center shadow-md hover:bg-gray-800"
            onClick={handleAddTeamMember} // ✅ Link to add team member
          >
            <Plus size={16} className="mr-2" /> เพิ่มทีมงาน
          </button>
          <button className="bg-white border border-gray-500 px-5 py-2 rounded-lg flex items-center shadow-md hover:bg-white">
            <Filter size={16} className="mr-2" /> Filter
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center border-b border-gray-300 mb-6">
        <button
          onClick={() => handleTabChange("Published")}
          className={`px-4 py-2 text-lg font-semibold ${
            activeTab === "Published"
              ? "text-black border-b-2 border-black"
              : "text-gray-500"
          }`}
        >
          Published
        </button>
        <button
          onClick={() => handleTabChange("Draft")}
          className={`px-4 py-2 text-lg font-semibold ${
            activeTab === "Draft"
              ? "text-black border-b-2 border-black"
              : "text-gray-500"
          }`}
        >
          Draft
        </button>
      </div>

      {/* Team Members */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {teamMembers.map((member) => (
          <div
            key={member.id}
            className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition duration-300"
          >
            <img
              src={member.image ? API_URL + member.image : "https://via.placeholder.com/300x200?text=No+Image"}
              alt={member.name}
              className="w-full h-150 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-bold text-gray-800">{`${member.firstName} ${member.lastName}`}</h2>
              <p className="text-gray-500">{`ตำแหน่ง: ${member.position}`}</p>
              <button
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all"
                onClick={() => handleDeleteMember(member.id)} // ✅ Call delete function
              >
                <Trash size={16} className="inline mr-2" />
                ลบ
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurTeam;