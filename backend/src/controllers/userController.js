const getMyProfile = (req, res) => {
  res.send(`Welcome ${req.user.name}`)
}

export { getMyProfile }
