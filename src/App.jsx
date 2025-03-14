import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, Outlet } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import AboutUsPage from "./pages/AboutUs";
import TripPage from "./pages/Trip";
import GalleryPage from "./pages/Gallery";
import ReviewPage from "./pages/Review";
import TripDetails from "./pages/Tripdetails";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer";

// ✅ Import Dashboard และ Components ที่เกี่ยวข้อง
import Dashboard from "./components/Dashboard/Dashboard";
import DashboardOverview from "./components/Dashboard/DashboardOverview";
import UserManagement from "./components/Dashboard/UserManagement";
import ManageTour from "./components/Dashboard/ManageTour";
import Blogpost from "./components/Dashboard/Blogpost";
import AddTour from "./components/Dashboard/AddTour";
import EditTourForm from "./components/Dashboard/EditTourForm";
import AddPost from "./components/Dashboard/AddPost";
import OurTeam from "./components/Dashboard/OurTeam";
import AddTeamMemberForm from "./components/Dashboard/AddTeamMemberForm";
import ManageCountry from "./components/Dashboard/ManageCountry";
import ManagePartner from "./components/Dashboard/ManagePartner";
import ManageGallery from "./components/Dashboard/ManageGallery";
import Login from "./components/Dashboard/Login"; // ตรวจสอบให้แน่ใจว่ามีไฟล์ Login.js

// ✅ ฟังก์ชันสำหรับป้องกันเส้นทาง Admin
const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  return isLoggedIn ? children : <Navigate to="/login" />;
};

// ✅ ฟังก์ชัน Layout สำหรับกำหนด Navbar และ Footer
const Layout = () => {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminPage && <Navbar />} {/* ✅ ซ่อน Navbar ถ้าอยู่ใน /admin */}
      <main>
        <Outlet /> {/* ✅ ใช้ Outlet เพื่อแสดงหน้าที่อยู่ภายใน Layout */}
      </main>
      {!isAdminPage && <Footer />} {/* ✅ ซ่อน Footer ถ้าอยู่ใน /admin */}
    </>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        {/* ✅ Public Routes */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/Trips" element={<TripPage />} />
          <Route path="/Trips/Details/:id" element={<TripDetails />} />
          <Route path="/Aboutus" element={<AboutUsPage />} />
          <Route path="/Gallery" element={<GalleryPage />} />
          <Route path="/Blog" element={<ReviewPage />} />
        </Route>

        <Route path="/login" element={<Login />} />

        {/* ✅ Protected Routes for Dashboard */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          {/* ✅ Nested Routes สำหรับ Dashboard */}
          <Route index element={<DashboardOverview />} />
          <Route path="overview" element={<DashboardOverview />} />
          <Route path="user-management" element={<UserManagement />} />
          <Route path="manage-tour" element={<ManageTour />} />
          <Route path="blogpost" element={<Blogpost />} />
          <Route path="add-tour" element={<AddTour />} />
          <Route path="edit-tour/:tourId" element={<EditTourForm />} />
          <Route path="add-post" element={<AddPost />} />
          <Route path="ourteam" element={<OurTeam />} />
          <Route path="add-team-member" element={<AddTeamMemberForm />} />
          <Route path="manage-country" element={<ManageCountry />} />
          <Route path="manage-partners" element={<ManagePartner />} />
          <Route path="manage-gallery" element={<ManageGallery />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;