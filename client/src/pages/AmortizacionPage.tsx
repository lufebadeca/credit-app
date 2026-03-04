import { useParams, Link } from 'react-router-dom';
import { useState, useEffect, useMemo } from 'react';
import { getCredit } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { formatCurrency, formatTasa } from '@/lib/format';
import { generarTablaAmortizacion } from '@/lib/amortizacion';
import { ArrowLeft } from 'lucide-react';

type Credit = {
  _id: string;
  nombreCliente: string;
  cedulaId: string;
  valorCredito: number;
  tasaInteres: number;
  plazoMeses: number;
  comercialRegistra: string;
  fechaRegistro: string;
};

export function AmortizacionPage() {
  const { id } = useParams<{ id: string }>();
  const [credit, setCredit] = useState<Credit | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    getCredit(id)
      .then(setCredit)
      .catch((e) => setError(e instanceof Error ? e.message : 'Error'))
      .finally(() => setLoading(false));
  }, [id]);

  const tablaAmortizacion = useMemo(() => {
    if (!credit) return [];
    return generarTablaAmortizacion(
      credit.valorCredito,
      credit.tasaInteres,
      credit.plazoMeses
    );
  }, [credit]);

  if (loading) {
    return (
      <div className="space-y-6">
        <p className="text-muted-foreground">Cargando crédito...</p>
      </div>
    );
  }

  if (error || !credit) {
    return (
      <div className="space-y-6">
        <p className="text-destructive">{error || 'Crédito no encontrado'}</p>
        <Link to="/consulta">
          <Button variant="outline">Volver a consulta</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/consulta">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="size-4" />
            Volver
          </Button>
        </Link>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Tabla de amortización</h2>
        <p className="text-muted-foreground">
          Crédito de cuota constante — {credit.nombreCliente}. Valor:{' '}
          {formatCurrency(credit.valorCredito)}, {formatTasa(credit.tasaInteres)}% efectivo mensual,{' '}
          {credit.plazoMeses} meses.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Datos del crédito</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <dl className="grid grid-cols-2 gap-2 text-sm">
            <dt className="text-muted-foreground">Cliente</dt>
            <dd>{credit.nombreCliente}</dd>
            <dt className="text-muted-foreground">Valor del crédito</dt>
            <dd>{formatCurrency(credit.valorCredito)}</dd>
            <dt className="text-muted-foreground">Tasa de interés (efectivo mensual)</dt>
            <dd>{formatTasa(credit.tasaInteres)}%</dd>
            <dt className="text-muted-foreground">Plazo</dt>
            <dd>{credit.plazoMeses} meses</dd>
            <dt className="text-muted-foreground">Cuota fija mensual</dt>
            <dd>
              {tablaAmortizacion[0]
                ? formatCurrency(Math.round(tablaAmortizacion[0].valorCuota))
                : '-'}
            </dd>
          </dl>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Plan de amortización</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mes</TableHead>
                  <TableHead className="text-right">Valor cuota</TableHead>
                  <TableHead className="text-right">Intereses</TableHead>
                  <TableHead className="text-right">Abono a capital</TableHead>
                  <TableHead className="text-right">Saldo</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tablaAmortizacion.map((fila) => (
                  <TableRow key={fila.mes}>
                    <TableCell>{fila.mes}</TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(Math.round(fila.valorCuota))}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(Math.round(fila.intereses))}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(Math.round(fila.abono))}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(Math.round(fila.saldo))}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
