import {v2 as cloudinary} from "cloudinary"
import fs from "fs"
import { clearLine } from "readline"

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadClodinary = async (localFilePath) => {
    try {
        if(!localFilePath) return null
        //upload the file on cloudinary
       const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        //file has been uploaded successfully
        console.log("file is uploaded on cldinary", response.url);
    } catch (error) {
        fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the uploaded opration got failed
        return null;
    }
}



export {uploadClodinary}