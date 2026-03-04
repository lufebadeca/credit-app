import { z } from 'zod';

export const creditSchema = z.object({
  nombreCliente: z.string().min(1, 'Nombre requerido').max(200),
  cedulaId: z.string().min(1, 'Cédula o ID requerido').max(50),
  valorCredito: z.coerce.number().positive('El valor debe ser positivo'),
  tipoTasa: z.enum(['anual', 'mensual']),
  tasaInteresInput: z.coerce.number().min(0, 'Tasa inválida').max(100),
  plazoMeses: z.coerce.number().int().positive('El plazo debe ser positivo'),
  comercialRegistra: z.string().min(1, 'Comercial requerido').max(200)
});

export type CreditFormValues = z.infer<typeof creditSchema>;
