import Agenda from 'agenda';
import mongoose from 'mongoose';
import { sendCreditEmail } from '../jobs/sendCreditEmail.js';

let agenda;

export async function initAgenda() {
  agenda = new Agenda({
    mongo: mongoose.connection.db,
    db: { collection: 'agendaJobs' }
  });

  agenda.define('sendCreditEmail', async (job) => {
    const { nombreCliente, valorCredito, comercialRegistra, fechaRegistro } = job.attrs.data;
    await sendCreditEmail({ nombreCliente, valorCredito, comercialRegistra, fechaRegistro });
  });

  await agenda.start();
  return agenda;
}

export function getAgenda() {
  return agenda;
}
