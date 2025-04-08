const validateRequest = (Schema) => (req, res, next) => {
  const result = Schema.safeParse(req.body)

  if (!result.success) {
    const message = result.error.errors.map((e) => e.message).join(", ")
    return res.status(400).json({ success: false, message })
  }
  req.body = result.data
  next()
}

export default validateRequest
