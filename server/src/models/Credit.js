import mongoose from 'mongoose';

const creditSchema = new mongoose.Schema({
  nombreCliente: { type: String, required: true },
  cedulaId: { type: String, required: true, unique: true },
  valorCredito: { type: Number, required: true },
  tasaInteres: { type: Number, required: true },
  plazoMeses: { type: Number, required: true },
  comercialRegistra: { type: String, required: true },
  fechaRegistro: { type: Date, default: Date.now }
});

creditSchema.index({ nombreCliente: 'text', cedulaId: 'text', comercialRegistra: 'text' });

export default mongoose.model('Credit', creditSchema);
