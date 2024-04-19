import {v2 as cloudinary} from 'cloudinary';
import fs from "fs";
          
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET, 
});

const uploadOnCloudinary = async (filepath) => {
    try {
        if(!filepath) return null;
        // uploading files
        const response = await cloudinary.uploader.upload(filepath , {
            resource_type:"auto"
        })
        // File has been successfully uploaded 
        console.log("File is uploaded successfully" , response.url);
        return response;
    } catch (error) {
        fs.unlink(filepath);
        // if error occurs the file will be removed from the server.
        return null;
    }
}

cloudinary.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
  { public_id: "olympic_flag" }, 
  function(error, result) {console.log(result); });



export {uploadOnCloudinary};