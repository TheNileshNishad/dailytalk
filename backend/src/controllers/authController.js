import User from "../models/userModel.js"

const register = async (req, res) => {
  try {
    const { name, userName, password } = req.body
    const user = await User.create({
      name,
      userName,
      password,
    })
    res.send("created")
  } catch (error) {
    res.send("not created")
  }
}

const login = (req, res) => {
  res.send("login")
}

export { register, login }
