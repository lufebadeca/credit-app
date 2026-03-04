import { Router } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { loginSchema } from '../schemas/authSchema.js';
import { validate } from '../middleware/validate.js';

const router = Router();

router.post('/login', validate(loginSchema), async (req, res, next) => {
  try {
    const { email, password } = req.validated;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    return res.json({ token, user: { id: user._id, email: user.email } });
  } catch (err) {
    next(err);
  }
});

export default router;
