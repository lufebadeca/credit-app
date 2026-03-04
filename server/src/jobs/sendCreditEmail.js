import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

export async function sendCreditEmail({ nombreCliente, valorCredito, comercialRegistra, fechaRegistro }) {
  const to = process.env.EMAIL_RECEIVER || 'fyasocialcapital@gmail.com';
  const from = process.env.EMAIL_FROM || process.env.SMTP_USER || 'noreply@creditapp.com';

  const fecha = fechaRegistro instanceof Date
    ? fechaRegistro.toLocaleString('es-CO')
    : new Date(fechaRegistro).toLocaleString('es-CO');

  const valorFormateado = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0
  }).format(valorCredito);

  const html = `
    <h2>Nuevo crédito registrado</h2>
    <p><strong>Nombre del cliente:</strong> ${nombreCliente}</p>
    <p><strong>Valor del crédito:</strong> ${valorFormateado}</p>
    <p><strong>Nombre del comercial:</strong> ${comercialRegistra}</p>
    <p><strong>Fecha de registro:</strong> ${fecha}</p>
  `;

  try {
    await transporter.sendMail({
      from,
      to,
      subject: `Nuevo crédito registrado - ${nombreCliente}`,
      html
    });
    console.log(`Email enviado a ${to} para crédito de ${nombreCliente}`);
  } catch (err) {
    console.error('Error enviando email:', err.message);
    throw err;
  }
}
