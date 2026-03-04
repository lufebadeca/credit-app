/**
 * Conversión de tasas de interés.
 * Fórmulas:
 * - Efectivo anual a efectivo mensual: i_m = (1 + i_a)^(1/12) - 1
 * - Efectivo mensual a efectivo anual: i_a = (1 + i_m)^12 - 1
 */

export type TipoTasa = 'anual' | 'mensual';

export function tasaAnualAMensual(tasaAnualPorcentaje: number): number {
  const i = tasaAnualPorcentaje / 100;
  const iMensual = Math.pow(1 + i, 1 / 12) - 1;
  return iMensual * 100;
}

export function tasaMensualAAnual(tasaMensualPorcentaje: number): number {
  const i = tasaMensualPorcentaje / 100;
  const iAnual = Math.pow(1 + i, 12) - 1;
  return iAnual * 100;
}

export function aEfectivoMensual(
  valor: number,
  tipo: TipoTasa
): number {
  if (tipo === 'mensual') return valor;
  return tasaAnualAMensual(valor);
}
