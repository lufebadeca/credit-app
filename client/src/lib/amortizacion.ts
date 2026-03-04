/**
 * Tabla de amortización para crédito de cuota constante.
 * La tasa de interés debe ser efectiva mensual (mismo período que el plazo en meses).
 */
export type FilaAmortizacion = {
  mes: number;
  valorCuota: number;
  intereses: number;
  abono: number;
  saldo: number;
};

export function generarTablaAmortizacion(
  valorCredito: number,
  tasaInteresMensual: number,
  plazoMeses: number
): FilaAmortizacion[] {
  const r = tasaInteresMensual / 100; // tasa como decimal (ej: 2% -> 0.02)
  let saldo = valorCredito;

  // Cuota fija: P * [r(1+r)^n] / [(1+r)^n - 1]
  const valorCuota =
    r === 0
      ? valorCredito / plazoMeses
      : (valorCredito * (r * Math.pow(1 + r, plazoMeses))) /
        (Math.pow(1 + r, plazoMeses) - 1);

  const filas: FilaAmortizacion[] = [];

  for (let mes = 1; mes <= plazoMeses; mes++) {
    const intereses = saldo * r;
    const abono = valorCuota - intereses;
    saldo = Math.max(0, saldo - abono);

    filas.push({
      mes,
      valorCuota,
      intereses,
      abono,
      saldo
    });
  }

  return filas;
}
