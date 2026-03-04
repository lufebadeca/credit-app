import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import mongoSanitize from 'express-mongo-sanitize';
import authRoutes from './routes/auth.js';
import creditRoutes from './routes/credits.js';
import testEmailRoutes from './routes/testEmail.js';
import { getAgenda } from './config/agenda.js';

const app = express();

app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN || 'http://localhost:5173' }));
app.use(express.json());
app.use(mongoSanitize());

app.use((req, res, next) => {
  req.agenda = getAgenda();
  next();
});

app.get('/api/health', (req, res) => res.json({ ok: true }));

app.use('/api/auth', authRoutes);
app.use('/api/credits', creditRoutes);
app.use('/api/test-email', testEmailRoutes);

app.use((err, req, res, next) => {
  console.error('Error:', err.message || err);
  if (res.headersSent) return next(err);
  res.status(err.status || 500).json({
    error: String(err?.message || 'Error interno del servidor')
  });
});

export default app;
