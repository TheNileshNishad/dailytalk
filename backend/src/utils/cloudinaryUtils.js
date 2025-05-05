import cloudinary from "../config/cloudinary.js"

const uploadToCloudinary = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: "dailytalk",
    })
    return {
      public_id: result.public_id,
      secure_url: result.secure_url,
    }
  } catch (error) {
    console.error("Cloudinary upload error:", error)
    throw new Error("Failed to upload file to Cloudinary!")
  }
}

export default uploadToCloudinary
