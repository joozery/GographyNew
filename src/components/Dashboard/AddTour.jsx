import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FaSpinner, FaTrash } from "react-icons/fa";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // ✅ ใช้ธีม snow
import { FiUploadCloud } from "react-icons/fi";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import CountryFlag from "../CountryFlag";

function AddTour() {
  const navigate = useNavigate();
  const { tourId } = useParams(); // ✅ รับค่า tourId จาก URL
  const [formData, setFormData] = useState({
    tour_name: "",
    // country_th: "",
    // country_en: "",
    country_id: "",
    highlight: "",
    price: "",
    start_date: "",
    end_date: "",
    duration: "",
    travel_type: "",
    locations: "",
    included: "",
    not_included: "",
    information: "",
    terms_conditions: "",
  });
  const [countries, setCountries] = useState([]); // ✅ รายการประเทศ
  const [days, setDays] = useState([]);
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [previewPdf, setPreviewPdf] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // ✅ ตรวจสอบสถานะการโหลดข้อมูล
  const [saving, setSaving] = useState(false); // ✅ ตรวจสอบสถานะการบันทึก

  const requirefield = <span className="text-red-700">*</span>;

  // ✅ โหลดประเทศจาก API
  useEffect(() => {
    axios
      .get("https://servergogo-app-209f1146e735.herokuapp.com/api/countries")
      .then((response) => setCountries(response.data))
      .catch((error) => console.error("Error loading countries:", error));
  }, []);

  const LoadData = async () => {
    if (tourId) {
      setLoading(true);
      axios
        .get(
          `https://servergogo-app-209f1146e735.herokuapp.com/api/tours/${tourId}`
        )
        .then((response) => {
          const tourData = response.data.tour;
          setFormData({
            ...tourData,
            start_date: tourData.start_date.split("T")[0],
            end_date: tourData.end_date.split("T")[0],
          });

          // setPdfFile(tourData.pdf_url);

          setDays(
            response.data.tour_days.map((day) => ({
              ...day,
              date: day.date.split("T")[0],
              time_schedule: day.time_schedule || [],
              images: day.images,
              //   images: day.images ? JSON.parse(day.images) : [], // ✅ แปลงให้เป็น Array
            }))
          );
          // ✅ ถ้ามีรูปจาก API → ตั้งค่า previewImage
          if (tourData.image) {
            setPreviewImage(tourData.image);
          }
          if (tourData.pdf_url) {
            setPreviewPdf(tourData.pdf_url);
          } // ✅ โหลด PDF
        })
        .catch((error) => console.error("Error loading tour:", error))
        .finally(() => setLoading(false));
    }
  };
  // ✅ โหลดข้อมูลเดิมจาก API (ใช้เมื่อแก้ไข)
  useEffect(() => {
    LoadData();
  }, []);

  //   useEffect(() => {
  //     console.log("formData",formData);
  //     console.log("days",days);
  //   }, [formData , days])

  useEffect(() => {
    console.log("day", days);
  }, [days]);

  // ✅ เพิ่มวันเดินทาง
  const addDay = () => {
    setDays([
      ...days,
      {
        day_number: days.length + 1,
        date: "",
        location: "",
        description: "",
        time_schedule: [],
        images: [],
      },
    ]);
  };

  // ✅ ลบวันเดินทาง
  const removeDay = (index) => {
    const updatedDays = [...days];
    updatedDays.splice(index, 1);
    setDays(updatedDays.map((day, i) => ({ ...day, day_number: i + 1 }))); // รีเซ็ต day_number
  };

  // ✅ อัปเดตค่าของวันเดินทาง
  const handleDayChange = (index, field, value) => {
    const updatedDays = [...days];

    if (
      typeof value === "string" &&
      value.includes("T") &&
      !isNaN(Date.parse(value))
    ) {
      updatedDays[index][field] = value.split("T")[0]; // ตัด "T" ถ้าเป็น datetime
    } else {
      updatedDays[index][field] = value; // เก็บค่าเดิม ถ้าไม่ใช่ datetime
    }

    setDays(updatedDays);
  };

  // ✅ เพิ่มตารางเวลา
  const addSchedule = (dayIndex) => {
    const updatedDays = [...days];
    updatedDays[dayIndex].time_schedule.push({ time: "", activity: "" });
    setDays(updatedDays);
  };

  // ✅ ลบตารางเวลา
  const removeSchedule = (dayIndex, scheduleIndex) => {
    const updatedDays = [...days];
    updatedDays[dayIndex].time_schedule.splice(scheduleIndex, 1);
    setDays(updatedDays);
  };

  // ✅ อัปเดตค่าของตารางเวลา
  const handleScheduleChange = (dayIndex, scheduleIndex, field, value) => {
    const updatedDays = [...days];
    updatedDays[dayIndex].time_schedule[scheduleIndex][field] = value;
    setDays(updatedDays);
  };

  // const handleFileChange = (e, type) => {
  //   const file = e.target.files[0];
  //   if (!file) return;

  //   if (type === "image") {
  //     setImage(file);
  //     setPreviewImage(URL.createObjectURL(file)); // ✅ แสดง Preview ทันที
  //   }

  //   if (type === "pdf_url") {
  //     setPdfFile(file);
  //     setPreviewPdf(URL.createObjectURL(file)); // ✅ อัปเดต Preview PDF ทันที
  //   }
  // };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    if (type === "image") {
      const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
      if (!allowedTypes.includes(file.type)) {
        alert("กรุณาเลือกไฟล์ที่เป็น .png, .jpg หรือ .jpeg เท่านั้น");
        return;
      }

      setImage(file);
      setPreviewImage(URL.createObjectURL(file)); // ✅ แสดง Preview
    }

    if (type === "pdf_url") {
      if (file.type !== "application/pdf") {
        alert("กรุณาเลือกไฟล์ PDF เท่านั้น");
        return;
      }

      setPdfFile(file);
      setPreviewPdf(URL.createObjectURL(file)); // ✅ แสดง Preview PDF
    }
  };

  const removeSingleImage = (dayIndex, imgIndex) => {
    setDays((prevDays) => {
      const updated = [...prevDays];
  
      const currentImages = [...(updated[dayIndex].images || [])]; // ✅ clone รูป
      const filtered = currentImages.filter((_, i) => i !== imgIndex); // ✅ ไม่ใช้ splice
  
      updated[dayIndex] = {
        ...updated[dayIndex], // ✅ เผื่อมี field อื่นด้วย
        images: filtered,
      };
  
      return updated;
    });
  };

  // ✅ ลบ PDF
  const handleRemovePdf = () => {
    setPdfFile(null);
    setPreviewPdf(null);
    setFormData({ ...formData, pdf_url: "" }); // ✅ ส่ง "" เพื่อให้ API ลบ PDF
  };

  const handleFileChangeDay = (dayIndex, files) => {
    const updatedDays = [...days];
    const currentImages = updatedDays[dayIndex].images || [];

    const newFiles = Array.from(files);

    // ✅ รวมภาพเดิม + ใหม่
    const combined = [...currentImages, ...newFiles];

    if (combined.length > 4) {
      Swal.fire({
        icon: "warning",
        title: "อัปโหลดได้สูงสุด 4 รูป",
        text: "คุณสามารถอัปโหลดได้ไม่เกิน 4 รูปต่อวัน",
        confirmButtonText: "ตกลง",
      });

      // ✅ ตัดให้เหลือ 4 รูป แล้วไม่อัปเดต state
      return;
    }

    updatedDays[dayIndex].images = combined;
    setDays(updatedDays);
    // console.log(`📷 Day ${dayIndex} now has ${combined.length} image(s)`);
  };

  // ✅ อัปเดตข้อมูลฟอร์มหลัก (Tour)
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle Change จาก ReactQuill
  const handleQuillChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  // ✅ ลบรูปของแต่ละวัน
  const clearDayImages = (dayIndex) => {
    const updatedDays = [...days];
    updatedDays[dayIndex].images = []; // ✅ เคลียร์รูปทั้งหมด
    setDays(updatedDays);
  };

  // ✅ ส่งข้อมูลทั้งหมดไป API
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true); // 🔄 กำลังบันทึก...
    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) =>
      formDataToSend.append(key, formData[key])
    );
    if (image) formDataToSend.append("image", image);
    if (pdfFile) {
      formDataToSend.append("pdf_url", pdfFile);
    } else {
      formDataToSend.append("pdf_url", ""); // ✅ ลบ PDF → ส่งค่าว่าง
    }

    // ✅ เพิ่มข้อมูลวันเดินทาง พร้อมส่งรูปภาพไปยัง `images`
    formDataToSend.append(
      "tour_days",
      JSON.stringify(
        days.map((day) => ({
          ...day,
          images: day.images.filter((img) => typeof img === "string"), // ✅ เก็บเฉพาะ URL เดิม
        }))
      )
    );

    // ✅ แนบไฟล์รูปภาพของแต่ละวัน (`day_images_X`)
    days.forEach((day, index) => {
      if (day.images.length > 0) {
        day.images.forEach((file) => {
          if (typeof file !== "string") {
            formDataToSend.append(`day_images_${index}`, file); // ✅ ส่งเฉพาะไฟล์ใหม่
          }
        });
      }
    });

    console.log("🚀 Data being sent to API:", {
      ...formData,
      image: image ? image.name : "No Image",
      tour_days: days.map((day, index) => ({
        ...day,
        images: day.images.map((img) =>
          typeof img === "string" ? img : img.name
        ), // ✅ ตรวจสอบไฟล์ที่ถูกส่ง
      })),
    });
    // return;

    try {
      if (tourId) {
        // ✅ แก้ไขข้อมูล (PUT)
        const response = await axios.put(
          `https://servergogo-app-209f1146e735.herokuapp.com/api/tours/${tourId}`,
          formDataToSend,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        setMessage(response.data.message);
        if (response.data.message) {
          // ✅ แสดง SweetAlert2 และกลับไปที่หน้า /admin/manage-tour
          Swal.fire({
            icon: "success",
            title: "สำเร็จ!",
            text: "แก้ไขข้อมูลแล้ว",
            showConfirmButton: false,
            timer: 2000, // ✅ แสดง 2 วินาทีแล้วเด้งกลับ
          }).then(() => {
            // navigate("/admin/manage-tour"); // ✅ กลับไปหน้าจัดการทัวร์
            setPreviewPdf(response.data.pdf_url || null); // ✅ อัปเดต Preview PDF ทันที
            LoadData();
          });
        }
      } else {
        const response = await axios.post(
          "https://servergogo-app-209f1146e735.herokuapp.com/api/tours",
          formDataToSend,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        console.log(response);
        setMessage(response.data.message);
        if (response.data.message) {
          // ✅ แสดง SweetAlert2 และกลับไปที่หน้า /admin/manage-tour
          Swal.fire({
            icon: "success",
            title: "สำเร็จ!",
            text: "บันทึกข้อมูลเรียบร้อยแล้ว",
            showConfirmButton: false,
            timer: 2000, // ✅ แสดง 2 วินาทีแล้วเด้งกลับ
          }).then(() => {
            navigate("/admin/manage-tour"); // ✅ กลับไปหน้าจัดการทัวร์
          });
        }
      }
    } catch (error) {
      setMessage(error.response?.data?.error || "เกิดข้อผิดพลาด");
    } finally {
      setSaving(false); // ❌ โหลดเสร็จ → ปิดสถานะ saving
    }
  };

  return (
    <div>
      <h2>{tourId ? "แก้ไขทัวร์" : "เพิ่มทัวร์"}</h2>

      {/* ✅ Loading ตอนโหลดข้อมูล */}
      {loading ? (
        <div className="flex justify-center items-center py-10">
          <div className="flex items-center gap-3">
            <FaSpinner className="animate-spin text-purple-500 text-2xl" />
            <span className="font-semibold text-xl">กำลังโหลดข้อมูล...</span>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          {/* 🔹 ข้อมูลทัวร์ */}
          <div className="">
            <div className="grid grid-cols-3 gap-3">
              <div className="flex flex-col justify-start items-start gap-2">
                <label className="block mt-4 font-bold">
                  ชื่อทัวร์ {requirefield}
                </label>
                <input
                  value={formData.tour_name}
                  className="border border-gray-200 rounded-lg p-2 h-12 w-full"
                  type="text"
                  name="tour_name"
                  placeholder="ชื่อทัวร์"
                  onChange={handleChange}
                  required
                />
              </div>
              {/* 🔹 Dropdown เลือกประเทศ */}
              <div className="flex flex-col justify-start items-start gap-2">
                <label className="block mt-4 font-bold">
                  เลือกประเทศ {requirefield}
                </label>
                <select
                  value={formData.country_id}
                  onChange={handleChange}
                  name="country_id"
                  className="border border-gray-200 rounded-lg p-2 h-12 w-full"
                  required
                >
                  <option value="">เลือกประเทศ</option>
                  {countries.map((country) => (
                    <option key={country.id} value={country.id}>
                      {country.name} ({country.name_th})
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col justify-start items-start gap-2">
                <label className="block mt-4 font-bold">
                  พื้นที่ {requirefield}
                </label>
                <input
                  value={formData.locations}
                  className="border border-gray-200 rounded-lg p-2 h-12 w-full"
                  type="text"
                  name="locations"
                  placeholder="กรอกแบบ thai,canada,china เท่านั้น"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex flex-col justify-start items-start gap-2">
                <label className="block mt-4 font-bold">
                  วันที่เริ่มต้น {requirefield}
                </label>
                <input
                  value={formData.start_date}
                  className="border border-gray-200 rounded-lg p-2 h-12 w-full"
                  type="date"
                  name="start_date"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex flex-col justify-start items-start gap-2">
                <label className="block mt-4 font-bold">
                  วันที่สิ้นสุด {requirefield}
                </label>
                <input
                  value={formData.end_date}
                  className="border border-gray-200 rounded-lg p-2 h-12 w-full"
                  type="date"
                  name="end_date"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex flex-col justify-start items-start gap-2">
                <label className="block mt-4 font-bold">จำนวนสมาชิก</label>
                <input
                  value={formData.travel_type}
                  className="border border-gray-200 rounded-lg p-2 h-12 w-full"
                  type="text"
                  name="travel_type"
                  placeholder="จำนวนสมาชิก"
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col justify-start items-start gap-2">
                <label className="block mt-4 font-bold">
                  ราคา ฿ {requirefield} (ไม่ต้องกรอกสกุลเงิน)
                </label>
                <input
                  value={formData.price}
                  className="border border-gray-200 rounded-lg p-2 h-12 w-full"
                  type="text"
                  name="price"
                  placeholder="ราคา"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="flex flex-col justify-start items-start gap-2">
                <label className="block mt-4 font-bold">จำนวนวัน</label>
                <input
                  value={formData.duration}
                  className="border border-gray-200 rounded-lg p-2 h-12 w-full"
                  type="text"
                  name="duration"
                  placeholder="เช่น 7 วัน 5 คืน"
                  onChange={handleChange}
                />
              </div>

              <div className="flex flex-col justify-start items-start gap-2">
                <label className="block mt-4 font-bold">สิ่งที่มี</label>
                <input
                  value={formData.included}
                  className="border border-gray-200 rounded-lg p-2 h-12 w-full"
                  type="text"
                  name="included"
                  placeholder="กรอกแบบ ประกัน,,ช่างภาพ,,รวมค่าที่พัก เท่านั้น"
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col justify-start items-start gap-2">
                <label className="block mt-4 font-bold">สิ่งที่ไม่มี</label>
                <input
                  value={formData.not_included}
                  className="border border-gray-200 rounded-lg p-2 h-12 w-full"
                  type="text"
                  name="not_included"
                  placeholder="กรอกแบบ กิจกรรม,,ค่าอาหาร,,ตั๋วเครื่องบิน เท่านั้น"
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col justify-start items-start gap-2">
                <label className="block mt-4 font-bold">รูปภาพปก</label>
                <input
                  className="hidden"
                  type="file"
                  name="image"
                  id="fileUploadCover"
                  onChange={(e) => handleFileChange(e, "image")}
                  accept=".png, .jpg, .jpeg"
                />
                <label
                  htmlFor="fileUploadCover"
                  className="cursor-pointer w-1/2 h-12   flex justify-center items-center bg-indigo-500 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-600 transition gap-2"
                >
                  <FiUploadCloud size={20} /> อัพโหลดภาพหน้าปก
                </label>
              </div>
              <div className="flex flex-col justify-start items-start gap-2">
                <label className="block mt-4 font-bold">ไฟล์ PDF</label>
                <input
                  className="hidden"
                  type="file"
                  name="pdf_url"
                  id="fileUploadPDF"
                  onChange={(e) => handleFileChange(e, "pdf_url")}
                  accept="application/pdf"
                />
                <label
                  htmlFor="fileUploadPDF"
                  className="cursor-pointer w-1/2 h-12   flex justify-center items-center bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 transition gap-2"
                >
                  <FiUploadCloud size={20} /> อัพโหลด PDF
                </label>
                {previewPdf && (
                  <div className="flex items-center gap-3 mt-2">
                    <a
                      href={previewPdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      ดูไฟล์ PDF
                    </a>
                    <button
                      type="button"
                      onClick={handleRemovePdf}
                      className="text-red-500"
                    >
                      <FaTrash size={16} />
                    </button>
                  </div>
                )}
              </div>
              {previewImage && (
                <div className="mt-3">
                  <img
                    src={previewImage}
                    alt="Tour Preview"
                    className="w-40 h-40 object-cover border"
                  />
                </div>
              )}
            </div>
            <div>
              {/* ✅ Rich Text Editor - Highlight */}
              <div className="flex flex-col gap-2">
                <label className="block mt-4 font-bold">Highlight</label>
                <ReactQuill
                  value={formData.highlight}
                  onChange={(value) => handleQuillChange("highlight", value)}
                />
              </div>

              {/* ✅ Rich Text Editor - ข้อมูลเพิ่มเติม */}
              <div className="flex flex-col gap-2">
                <label className="block mt-4 font-bold">ข้อมูลเพิ่มเติม</label>
                <ReactQuill
                  value={formData.information}
                  onChange={(value) => handleQuillChange("information", value)}
                />
              </div>

              {/* ✅ Rich Text Editor - เงื่อนไขการเดินทาง */}
              <div className="flex flex-col gap-2">
                <label className="block mt-4 font-bold">
                  เงื่อนไขการเดินทาง
                </label>
                <ReactQuill
                  value={formData.terms_conditions}
                  onChange={(value) =>
                    handleQuillChange("terms_conditions", value)
                  }
                />
              </div>
            </div>
          </div>

          <div className="my-5">
            <h2 style={{ margin: 0 }}>เพิ่มวันเดินทาง</h2>
            {days.map((day, index) => (
              <div key={index} className="border p-3 my-2 rounded-lg shadow-md">
                <h4 className="font-semibold text-md">Day {day.day_number}</h4>
                <div className="grid grid-cols-3 gap-2 my-2">
                  <input
                    value={day.date}
                    className="border border-gray-200 rounded-lg p-2 h-12"
                    type="date"
                    onChange={(e) =>
                      handleDayChange(index, "date", e.target.value)
                    }
                  />
                  <input
                    value={day.location}
                    className="border border-gray-200 rounded-lg p-2 h-12"
                    type="text"
                    placeholder="Location"
                    onChange={(e) =>
                      handleDayChange(index, "location", e.target.value)
                    }
                  />
                  {/* <textarea
                    value={day.description}
                    className="border border-gray-200 rounded-lg p-2 h-12"
                    placeholder="Description"
                    onChange={(e) =>
                      handleDayChange(index, "description", e.target.value)
                    }
                  ></textarea> */}
                  <ReactQuill
                    value={day.description}
                    placeholder="Description"
                    onChange={(value) =>
                      handleDayChange(index, "description", value)
                    }
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <h4>อัปโหลดรูปภาพของวันเดินทาง (สูงสุด 4 รูป)</h4>

                  <div className="flex gap-4 overflow-x-auto my-4">
                    {days[index]?.images?.map((img, imgIndex) => (
                      <div
                        key={imgIndex}
                        className="relative w-[300px] h-[200px] rounded overflow-auto border shadow"
                      >
                        <button
                          type="button"
                          onClick={() => removeSingleImage(index, imgIndex)}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                        >
                          &times;
                        </button>
                        <img
                          src={
                            typeof img === "string"
                              ? img
                              : URL.createObjectURL(img)
                          }
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      className="hidden"
                      type="file"
                      multiple
                      id={`fileUpload${index}`}
                      accept=".png, .jpg, .jpeg"
                      onChange={(e) =>
                        handleFileChangeDay(index, e.target.files)
                      }
                    />
                    <label
                      htmlFor={`fileUpload${index}`}
                      className="cursor-pointer w-1/6 flex justify-center items-center bg-indigo-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-indigo-600 transition gap-2"
                    >
                      <FiUploadCloud size={20} /> อัพโหลดภาพ
                    </label>
                    <button
                      type="button"
                      className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg shadow-md"
                      onClick={() => clearDayImages(index)}
                    >
                      ลบรูปทั้งหมด
                    </button>
                  </div>
                </div>
                <h4 className="font-semibold text-md my-4">ตารางเวลา</h4>
                {day.time_schedule.map((schedule, sIndex) => (
                  <div key={sIndex} className="flex gap-2 mt-1 mb-3">
                    <input
                      value={schedule.time}
                      className="border border-gray-200 rounded-lg p-2"
                      type="time"
                      onChange={(e) =>
                        handleScheduleChange(
                          index,
                          sIndex,
                          "time",
                          e.target.value
                        )
                      }
                    />
                    <input
                      value={schedule.activity}
                      className="border border-gray-200 rounded-lg p-2 w-full"
                      type="text"
                      placeholder="Activity"
                      onChange={(e) =>
                        handleScheduleChange(
                          index,
                          sIndex,
                          "activity",
                          e.target.value
                        )
                      }
                    />
                    <button
                      type="button"
                      className="bg-red-500 hover:bg-red-600 rounded-lg text-white p-3 shadow-md"
                      onClick={() => removeSchedule(index, sIndex)}
                    >
                      ลบ
                    </button>
                  </div>
                ))}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="bg-green-500 hover:bg-green-600 rounded-lg text-white px-3 py-2 shadow-md"
                    onClick={() => addSchedule(index)}
                  >
                    เพิ่มเวลา
                  </button>
                  <button
                    type="button"
                    className="bg-red-500 hover:bg-red-600 rounded-lg text-white px-3 py-2 shadow-md"
                    onClick={() => removeDay(index)}
                  >
                    ลบวัน
                  </button>
                </div>
              </div>
            ))}
            <button
              className="bg-blue-300 hover:bg-blue-400 text-white shadow-md rounded-lg px-2 py-1 mt-2"
              type="button"
              onClick={addDay}
            >
              เพิ่มวัน
            </button>
          </div>
          {/* ✅ Loading ตอนกดบันทึก */}
          <div className="w-full flex justify-end items-center">
            <button
              type="submit"
              className={`bg-purple-500 hover:bg-purple-600 text-white p-2 px-4 rounded-lg shadow-sm mt-3 ${
                saving ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={saving}
            >
              {saving ? (
                <>
                  <FaSpinner className="animate-spin mr-2" /> กำลังบันทึก...
                </>
              ) : tourId ? (
                "อัปเดต"
              ) : (
                "บันทึก"
              )}
            </button>
          </div>
        </form>
      )}
      {message && <p>{message}</p>}
    </div>
  );
}

export default AddTour;
