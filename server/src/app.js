import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import helmet from 'helmet';
import cors from 'cors';
import mongoSanitize from 'express-mongo-sanitize';
import authRoutes from './routes/auth.js';
import creditRoutes from './routes/credits.js';
import testEmailRoutes from './routes/testEmail.js';
import { getAgenda } from './config/agenda.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Ruta al frontend build (cwd = server/ al hacer "cd server && npm start")
const possiblePaths = [
  path.join(__dirname, '..', '..', 'client', 'dist'),
  path.join(process.cwd(), '..', 'client', 'dist'),
  path.join(process.cwd(), 'client', 'dist')
];
const clientDist = possiblePaths.find((p) => fs.existsSync(p));

const app = express();

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      imgSrc: ["'self'", 'data:', 'blob:'],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      connectSrc: ["'self'", 'https://generativelanguage.googleapis.com'],
      fontSrc: ["'self'", 'data:'],
      baseUri: ["'self'"]
    }
  }
}));
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

// Servir frontend si existe client/dist
if (clientDist) {
  app.use(express.static(clientDist));
  app.get('*', (req, res) => {
    if (req.path.startsWith('/api')) {
      return res.status(404).json({ error: 'Not found' });
    }
    res.sendFile(path.join(clientDist, 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.type('text').send('Frontend no encontrado. Ejecuta: npm run build en client/');
  });
}

app.use((err, req, res, next) => {
  console.error('Error:', err.message || err);
  if (res.headersSent) return next(err);
  res.status(err.status || 500).json({
    error: String(err?.message || 'Error interno del servidor')
  });
});

export default app;
