import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
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
import AddTourForm from "./components/Dashboard/AddTourForm";
import EditTourForm from "./components/Dashboard/EditTourForm";
import AddPost from "./components/Dashboard/AddPost";
import OurTeam from "./components/Dashboard/OurTeam";
import AddTeamMemberForm from "./components/Dashboard/AddTeamMemberForm";
import ManageCountry from "./components/Dashboard/ManageCountry"; // ✅ นำเข้า Manage Country
import ManagePartner from "./components/Dashboard/ManagePartner";
import ManageGallery from "./components/Dashboard/ManageGallery";
import TourForm from "./components/Dashboard/TourForm";
import AddTour from "./components/Dashboard/AddTour";

// ✅ ฟังก์ชันสำหรับป้องกันเส้นทาง Admin
const ProtectedRoute = ({ children }) => {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    setAuth(isLoggedIn);
  }, []);

  if (auth === null) {
    return <div>Loading...</div>; // Loading ระหว่างตรวจสอบสถานะ
  }

  return auth ? children : <Navigate to="/login" />; // Redirect ถ้ายังไม่ได้ล็อกอิน
};

// ✅ ฟังก์ชันตรวจสอบว่าเป็นหน้า Admin หรือไม่
const Layout = ({ children }) => {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminPage && <Navbar />} {/* ✅ ซ่อน Navbar ถ้าอยู่ใน /admin */}
      {children}
      {!isAdminPage && <Footer />} {/* ✅ ซ่อน Footer ถ้าอยู่ใน /admin */}
    </>
  );
};

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* ✅ Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/Trips" element={<TripPage />} />
          <Route path="/Trips/Details/:id" element={<TripDetails />} />
          <Route path="/Aboutus" element={<AboutUsPage />} />
          <Route path="/Gallery" element={<GalleryPage />} />
          <Route path="/Blog" element={<ReviewPage />} />

          {/* ✅ Protected Route for Dashboard */}
          <Route
            path="/admin"
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
            {/* <Route path="add-tour" element={<AddTourForm />} /> */}
            {/* <Route path="add-tour2" element={<TourForm />} /> */}
            <Route path="add-tour" element={<AddTour />} />
            <Route path="edit-tour/:tourId" element={<AddTour />} />
            {/* <Route path="edit-tour/:id" element={<EditTourForm />} /> */}
            <Route path="add-post" element={<AddPost />} />
            <Route path="ourteam" element={<OurTeam />} />
            <Route path="add-team-member" element={<AddTeamMemberForm />} />
            <Route path="manage-country" element={<ManageCountry />} /> {/* ✅ เส้นทาง Manage Country */}
            <Route path="/admin/manage-partners" element={<ManagePartner />} />
            <Route path="/admin/manage-gallery" element={<ManageGallery />} />
          </Route>
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;