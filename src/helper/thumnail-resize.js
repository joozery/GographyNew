// src/helpers/cloudinary.js
// export const thumbnailURL = (originalUrl, width = 400) => {
//   if (!originalUrl || typeof originalUrl !== "string") return "";

//   // เช็คว่าเป็น Cloudinary URL หรือไม่
//   if (!originalUrl.includes("cloudinary.com")) return originalUrl;

//   return originalUrl.replace("/upload/", `/upload/w_${width},c_fill,q_auto/`);
// };

export const thumbnailURL = (originalUrl, width = 1024) => {
  if (!originalUrl || typeof originalUrl !== "string") return "";

  if (!originalUrl.includes("cloudinary.com")) return originalUrl;

  return originalUrl.replace(
    "/upload/",
    `/upload/w_${width},c_fill,f_auto,q_auto:best,dpr_auto/`
  );
};
