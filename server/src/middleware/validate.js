export const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({
      error: 'Validación fallida',
      details: result.error.flatten().fieldErrors
    });
  }
  req.validated = result.data;
  next();
};
