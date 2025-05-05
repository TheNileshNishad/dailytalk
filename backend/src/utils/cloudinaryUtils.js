import cloudinary from "../config/cloudinary.js"
import fs from "fs"

const uploadToCloudinary = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: "dailytalk",
    })
    fs.unlinkSync(filePath)
    return {
      public_id: result.public_id,
      secure_url: result.secure_url,
    }
  } catch (error) {
    fs.unlinkSync(filePath)
    throw new Error("Failed to upload file to Cloudinary! " + error.message)
  }
}

const deleteFromCloudinary = async (public_id) => {
  try {
    const result = await cloudinary.uploader.destroy(public_id)
    return result
  } catch (error) {
    throw new Error("Failed to delete file from Cloudinary! " + error.message)
  }
}

export { uploadToCloudinary, deleteFromCloudinary }
