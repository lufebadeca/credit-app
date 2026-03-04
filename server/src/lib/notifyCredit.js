/**
 * Notifica el registro de un crédito: webhook (fire-and-forget) o Agenda.
 * Webhook: POST a WEBHOOK_EMAIL_URL. Configura Zapier/Make para enviar el correo.
 */

const WEBHOOK_URL = process.env.WEBHOOK_EMAIL_URL;

export function notifyCreditRegistered(payload) {
  const { nombreCliente, valorCredito, comercialRegistra, fechaRegistro } = payload;
  const data = {
    nombreCliente,
    valorCredito: Number(valorCredito),
    comercialRegistra,
    fechaRegistro: fechaRegistro instanceof Date ? fechaRegistro.toISOString() : fechaRegistro
  };

  if (WEBHOOK_URL) {
    fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).catch((err) => console.warn('Webhook email:', err.message));
    return true;
  }

  return false;
}

export function hasWebhook() {
  return !!WEBHOOK_URL;
}
