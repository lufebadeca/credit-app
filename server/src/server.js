import 'dotenv/config';
import connectDB from './config/db.js';
import { initAgenda } from './config/agenda.js';
import app from './app.js';

const PORT = process.env.PORT || 3000;

const start = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}`);
  });
  initAgenda().then(() => {
    console.log('Agenda (jobs) listo');
  }).catch((err) => {
    console.warn('Agenda no pudo iniciar - los correos no se enviarán:', err.message);
  });
};

start().catch((err) => {
  console.error('Error al iniciar:', err);
  process.exit(1);
});
