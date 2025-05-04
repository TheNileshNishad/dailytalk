import multer from "multer"
import fs from "fs"
import path from "path"

const tempDir = "./temp"
if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir)

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir)
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`
    const extName = path.extname(file.originalname)
    cb(null, `${file.fieldname}-${uniqueSuffix}${extName}`)
  },
})

export const avatarUpload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedMimes = ["image/jpeg", "image/png"]
    if (allowedMimes.includes(file.mimetype)) cb(null, true)
    else cb(new Error("Only jpeg and png files allowed!"))
  },
})
