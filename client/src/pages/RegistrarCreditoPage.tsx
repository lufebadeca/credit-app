import { useState, useEffect, useRef } from 'react';
import { CreditForm } from '@/components/CreditForm';
import { getCreditsCount } from '@/lib/api';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';

export function RegistrarCreditoPage() {
  const [total, setTotal] = useState<number | null>(null);
  const [error, setError] = useState('');
  const fetchRef = useRef(() => {});

  const refreshCount = async () => {
    try {
      const count = await getCreditsCount();
      setTotal(count);
      setError('');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al cargar total');
    }
  };

  fetchRef.current = refreshCount;

  useEffect(() => {
    refreshCount();
  }, []);

  useEffect(() => {
    const handleUpdate = () => fetchRef.current();
    window.addEventListener('credits-updated', handleUpdate);
    return () => window.removeEventListener('credits-updated', handleUpdate);
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Registrar nuevo crédito</h2>
        <p className="text-muted-foreground">
          Completa el formulario para registrar un crédito. Se enviará una notificación por correo.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <CreditForm onSuccess={() => window.dispatchEvent(new Event('credits-updated'))} />
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Total de créditos</CardTitle>
              <CardDescription className="text-muted-foreground">
                Créditos registrados en el sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              {error ? (
                <p className="text-sm text-destructive">{error}</p>
              ) : total !== null ? (
                <p className="text-3xl font-bold tabular-nums">{total}</p>
              ) : (
                <p className="text-muted-foreground">Cargando...</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
