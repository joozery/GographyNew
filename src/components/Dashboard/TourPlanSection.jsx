import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./AddTourForm.css";

const TourPlanSection = ({ tourPlan, setTourPlan }) => {
  // เพิ่มวันใหม่
  const addDay = () => {
    setTourPlan((prevPlan) => {
      const nextId = prevPlan.length + 1;
      return [
        ...prevPlan,
        { id: nextId, day: nextId, date: "", description: "", images: "" },
      ];
    });
  };

  // ลบวันสุดท้าย
  const removeDay = () => {
    if (tourPlan.length > 1) {
      setTourPlan((prevPlan) => prevPlan.slice(0, -1));
    }
  };

  // อัปเดตรายละเอียดของแต่ละวัน
  const handleDescriptionChange = (value, index) => {
    setTourPlan((prevPlan) =>
      prevPlan.map((day, i) =>
        i === index ? { ...day, description: value } : day
      )
    );
  };

  // อัปโหลดรูปภาพ
  const handleImageUpload = (e, index) => {
    // const files = Array.from(e.target.files);

    // if (files.length > 0) {
    //   setTourPlan((prevPlan) =>
    //     prevPlan.map((day, i) => {
    //       if (i === index) {
    //         const newImages = files.map((file) => ({
    //           file,
    //           preview: URL.createObjectURL(file),
    //         }));
    //         return { ...day, images: [...day.images, ...newImages] };
    //       }
    //       return day;
    //     })
    //   );
    // }
    const file = e.target.files[0]; // รับไฟล์รูปจาก input
    setTourPlan((prevPlans) =>
      prevPlans.map((plan, i) =>
        i === index ? { ...plan, image: file } : plan
      )
    );
  };

  // ลบรูปภาพ
  // const removeImage = (dayIndex, imageIndex) => {
  //   setTourPlan((prevPlan) =>
  //     prevPlan.map((day, i) => {
  //       if (i === dayIndex) {
  //         const updatedImages = day.images.filter(
  //           (_, imgIdx) => imgIdx !== imageIndex
  //         );
  //         return { ...day, images: updatedImages };
  //       }
  //       return day;
  //     })
  //   );
  // };
  const removeImage = (index) => {
    setTourPlan((prevPlans) =>
      prevPlans.map((plan, i) =>
        i === index ? { ...plan, image: null } : plan
      )
    );
  };

  return (
    <div className="p-6">
      <h2 className="text-lg font-bold mt-6">แผนวันทัวร์</h2>
      {tourPlan.map((day, index) => (
        <div key={day.id} className="border p-4 rounded-lg shadow mb-4">
          <div className="flex items-center space-x-4 mb-2">
            <span className="font-bold p-2 bg-black text-white rounded-lg">
              DAY {day.day}
            </span>
            <input
              type="date"
              className="border p-2 rounded-md w-32 text-center"
              value={day.date}
              onChange={(e) => {
                setTourPlan((prevPlan) =>
                  prevPlan.map((d, i) =>
                    i === index ? { ...d, date: e.target.value } : d
                  )
                );
              }}
            />
          </div>

          {/* 🔹 ใช้ ReactQuill แทน textarea */}
          <ReactQuill
            theme="snow"
            value={day.description}
            onChange={(value) => handleDescriptionChange(value, index)}
            className="custom-quill-editor"
          />

          {/* 🔹 แสดงผล description โดยแปลง HTML ให้ถูกต้อง */}
          {day.description && day.description !== "<p><br></p>" && (
            <div
              className="border p-4 rounded-md bg-gray-100 mt-4"
              dangerouslySetInnerHTML={{ __html: day.description }}
            />
          )}

          <div className="border p-4 rounded-md mt-4">
            <label
              className="flex flex-col items-center justify-center cursor-pointer text-gray-500 h-full"
              style={{ height: "100px", border: "2px dashed gray" }}
            >
              <input
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={(e) => handleImageUpload(e, index)}
              />
              <span>เพิ่มภาพ (ลากมาวางได้)</span>
            </label>
            {/* <div className="grid grid-cols-4 gap-2 mt-4">
              {day.images.map((image, imgIndex) => (
                <div key={imgIndex} className="relative">
                  <img
                    src={image.preview}
                    alt={`Tour Day ${day.day}`}
                    className="w-70 h-90 object-cover rounded-md"
                  />
                  <button
                    className="absolute top-1 right-1 bg-red-500 text-white text-xs px-1 rounded"
                    onClick={() => removeImage(index, imgIndex)}
                  >
                    ลบ
                  </button>
                </div>
              ))}
            </div> */}
            {day.image && (
              <div className="relative">
                <img
                  src={day.image.preview || URL.createObjectURL(day.image)}
                  alt={`Tour Day ${day.day}`}
                  className="w-70 h-90 object-cover rounded-md"
                />
                <button
                  className="absolute top-1 right-1 bg-red-500 text-white text-xs px-1 rounded"
                  onClick={() => removeImage(index)}
                >
                  ลบ
                </button>
              </div>
            )}
          </div>
        </div>
      ))}

      <div className="flex space-x-4 mt-4">
        <button
          type="button"
          className="bg-black text-white px-4 py-2 rounded"
          onClick={addDay}
        >
          เพิ่มวันทัวร์
        </button>
        {tourPlan.length > 1 && (
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={removeDay}
          >
            ลบวัน
          </button>
        )}
      </div>
    </div>
  );
};

export default TourPlanSection;
