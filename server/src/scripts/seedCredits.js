import 'dotenv/config';
import mongoose from 'mongoose';
import Credit from '../models/Credit.js';

const sampleCredits = [
  { nombreCliente: 'Pepito Perez', cedulaId: '1', valorCredito: 7800000, tasaInteres: 2, plazoMeses: 10, comercialRegistra: 'Admin' },
  { nombreCliente: 'Maria Perez', cedulaId: '2', valorCredito: 12500000, tasaInteres: 2, plazoMeses: 5, comercialRegistra: 'Admin' },
  { nombreCliente: 'Antonio Rodriguez', cedulaId: '3', valorCredito: 10312673, tasaInteres: 2, plazoMeses: 5, comercialRegistra: 'Admin' },
  { nombreCliente: 'Giselle López', cedulaId: '4', valorCredito: 8628510, tasaInteres: 2, plazoMeses: 12, comercialRegistra: 'Admin' },
  { nombreCliente: 'Martha Perez', cedulaId: '5', valorCredito: 5889085, tasaInteres: 2, plazoMeses: 24, comercialRegistra: 'Admin' }
];

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);
  const count = await Credit.countDocuments();
  if (count === 0) {
    await Credit.insertMany(sampleCredits);
    console.log('Créditos de ejemplo insertados');
  } else {
    console.log('Ya existen créditos en la base de datos');
  }
  await mongoose.disconnect();
}

seed().catch(console.error);
