import { Router } from 'express';
import Credit from '../models/Credit.js';
import { creditSchema } from '../schemas/creditSchema.js';
import { validate } from '../middleware/validate.js';
import { protect } from '../middleware/auth.js';
import { notifyCreditRegistered, hasWebhook } from '../lib/notifyCredit.js';

const router = Router();

router.use(protect);

router.post('/', validate(creditSchema), async (req, res) => {
  try {
    const validated = req.validated;
    const data = {
      ...validated,
      valorCredito: Number(validated.valorCredito),
      tasaInteres: Number(validated.tasaInteres),
      plazoMeses: Number(validated.plazoMeses)
    };
    const credit = await Credit.create(data);

    // Notificación en segundo plano: webhook (Zapier/Make) o Agenda
    const sent = notifyCreditRegistered({
      nombreCliente: credit.nombreCliente,
      valorCredito: credit.valorCredito,
      comercialRegistra: credit.comercialRegistra,
      fechaRegistro: credit.fechaRegistro
    });
    if (!sent && req.agenda) {
      req.agenda.now('sendCreditEmail', {
        nombreCliente: credit.nombreCliente,
        valorCredito: credit.valorCredito,
        comercialRegistra: credit.comercialRegistra,
        fechaRegistro: credit.fechaRegistro
      }).catch((err) => console.warn('Error al encolar email:', err.message));
    }

    res.status(201).json(credit);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Ya existe un crédito con esta cédula/ID' });
    }
    res.status(500).json({ error: err.message });
  }
});

router.get('/count', async (req, res) => {
  try {
    const count = await Credit.countDocuments();
    res.json({ count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const credit = await Credit.findById(req.params.id);
    if (!credit) return res.status(404).json({ error: 'Crédito no encontrado' });
    res.json(credit);
  } catch (err) {
    if (err.name === 'CastError') return res.status(400).json({ error: 'ID inválido' });
    res.status(500).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const { nombre, cedula, comercial, sort = 'fechaRegistro', order = 'desc' } = req.query;
    const filter = {};
    if (nombre) filter.nombreCliente = { $regex: nombre, $options: 'i' };
    if (cedula) filter.cedulaId = { $regex: cedula, $options: 'i' };
    if (comercial) filter.comercialRegistra = { $regex: comercial, $options: 'i' };

    const sortField = sort === 'valor' ? 'valorCredito' : 'fechaRegistro';
    const sortOrder = order === 'asc' ? 1 : -1;

    const credits = await Credit.find(filter).sort({ [sortField]: sortOrder });
    res.json(credits);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
