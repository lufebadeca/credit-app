import { useState, useEffect, useRef } from 'react';
import { getCredits } from '@/lib/api';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatCurrency, formatTasa } from '@/lib/format';
import { Link } from 'react-router-dom';

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

export function CreditTable() {
  const [credits, setCredits] = useState<Credit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    nombre: '',
    cedula: '',
    comercial: '',
    sort: 'fechaRegistro',
    order: 'desc'
  });

  const fetchCredits = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getCredits({
        nombre: filters.nombre || undefined,
        cedula: filters.cedula || undefined,
        comercial: filters.comercial || undefined,
        sort: filters.sort,
        order: filters.order
      });
      setCredits(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al cargar');
    } finally {
      setLoading(false);
    }
  };

  const fetchRef = useRef(fetchCredits);
  fetchRef.current = fetchCredits;

  useEffect(() => {
    fetchCredits();
  }, [filters]);

  useEffect(() => {
    const handleUpdate = () => fetchRef.current();
    window.addEventListener('credits-updated', handleUpdate);
    return () => window.removeEventListener('credits-updated', handleUpdate);
  }, []);

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Consulta de créditos</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label>Nombre</Label>
            <Input
              placeholder="Filtrar por nombre"
              value={filters.nombre}
              onChange={(e) =>
                setFilters((f) => ({ ...f, nombre: e.target.value }))
              }
            />
          </div>
          <div className="space-y-2">
            <Label>Cédula/ID</Label>
            <Input
              placeholder="Filtrar por ID"
              value={filters.cedula}
              onChange={(e) =>
                setFilters((f) => ({ ...f, cedula: e.target.value }))
              }
            />
          </div>
          <div className="space-y-2">
            <Label>Comercial</Label>
            <Input
              placeholder="Filtrar por comercial"
              value={filters.comercial}
              onChange={(e) =>
                setFilters((f) => ({ ...f, comercial: e.target.value }))
              }
            />
          </div>
          <div className="space-y-2">
            <Label>Ordenar por</Label>
            <div className="flex gap-2">
              <Select
                value={filters.sort}
                onValueChange={(v) =>
                  setFilters((f) => ({ ...f, sort: v }))
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Campo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fechaRegistro">Fecha</SelectItem>
                  <SelectItem value="valor">Valor</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={filters.order}
                onValueChange={(v) =>
                  setFilters((f) => ({ ...f, order: v }))
                }
              >
                <SelectTrigger className="w-[100px]">
                  <SelectValue placeholder="Orden" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="asc">Asc</SelectItem>
                  <SelectItem value="desc">Desc</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {error && (
          <p className="text-sm text-destructive">{error}</p>
        )}

        {loading ? (
          <p className="text-muted-foreground">Cargando...</p>
        ) : (
          <div className="border rounded-md overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>No.</TableHead>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Monto prestado</TableHead>
                  <TableHead>Plazo</TableHead>
                  <TableHead>Interés</TableHead>
                  <TableHead>Comercial</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead className="w-[120px]">Acción</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {credits.map((c, i) => (
                  <TableRow key={c._id}>
                    <TableCell>{i + 1}</TableCell>
                    <TableCell>{c.nombreCliente}</TableCell>
                    <TableCell>{formatCurrency(c.valorCredito)}</TableCell>
                    <TableCell>{c.plazoMeses}</TableCell>
                    <TableCell>{formatTasa(c.tasaInteres)}% (EM)</TableCell>
                    <TableCell>{c.comercialRegistra}</TableCell>
                    <TableCell>{formatDate(c.fechaRegistro)}</TableCell>
                    <TableCell>
                      <Link to={`/creditos/${c._id}/amortizacion`}>
                        <Button variant="outline" size="sm">
                          Amortización
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
