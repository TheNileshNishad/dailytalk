import { Schema, model } from "mongoose"
import bcrypt from "bcryptjs"

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
    },
    bio: {
      type: String,
    },
    gender: {
      type: String,
      enum: ["male", "female", "prefer not to say"],
    },
  },
  {
    timestamps: true,
  }
)

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next()

  this.password = await bcrypt.hash(this.password, 10)
  next()
})

userSchema.methods.comparePassword = async function (clientSentPassword) {
  return await bcrypt.compare(clientSentPassword, this.password)
}

export default model("User", userSchema)
