import { Router } from 'express';
import { protect } from '../middleware/auth.js';
import { sendCreditEmail } from '../jobs/sendCreditEmail.js';

const router = Router();

router.use(protect);

/**
 * POST /api/test-email
 * Envía un email de prueba para verificar la configuración SMTP.
 * Solo en desarrollo o con variable ENABLE_TEST_EMAIL=true
 */
router.post('/', async (req, res) => {
  if (process.env.NODE_ENV === 'production' && process.env.ENABLE_TEST_EMAIL !== 'true') {
    return res.status(403).json({ error: 'Endpoint deshabilitado en producción' });
  }
  try {
    await sendCreditEmail({
      nombreCliente: 'Prueba',
      valorCredito: 1000000,
      comercialRegistra: 'Sistema',
      fechaRegistro: new Date()
    });
    res.json({ ok: true, message: 'Email de prueba enviado' });
  } catch (err) {
    console.error('Test email error:', err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
