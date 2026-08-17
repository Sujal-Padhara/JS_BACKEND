import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { clearLine } from "readline";

const uploadOnClodinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    //upload the file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    //file has been uploaded successfully
    // console.log("file is uploaded on cldinary", response.url);
    fs.unlinkSync(localFilePath)
    return response;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    fs.unlinkSync(localFilePath);
    return null;
  }
};

export { uploadOnClodinary };