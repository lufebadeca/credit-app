import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { creditSchema, type CreditFormValues } from '@/schemas/creditSchema';
import { createCredit } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { aEfectivoMensual } from '@/lib/tasasInteres';
import { toast } from 'sonner';

export function CreditForm({ onSuccess }: { onSuccess?: () => void }) {
  const form = useForm<CreditFormValues>({
    resolver: zodResolver(creditSchema) as never,
    defaultValues: { tipoTasa: 'mensual', tasaInteresInput: undefined }
  });

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting }
  } = form;

  const tipoTasa = watch('tipoTasa') as 'anual' | 'mensual';
  const tasaInput = watch('tasaInteresInput');
  const numTasa = Number(tasaInput);
  const tasaMensualEquiv =
    tasaInput != null && String(tasaInput).trim() !== '' && !Number.isNaN(numTasa)
      ? aEfectivoMensual(numTasa, tipoTasa)
      : null;

  const onSubmit = async (data: CreditFormValues) => {
    const tasaMensual =
      data.tipoTasa === 'mensual'
        ? Number(data.tasaInteresInput)
        : aEfectivoMensual(Number(data.tasaInteresInput), 'anual');
    try {
      await createCredit({
        nombreCliente: data.nombreCliente,
        cedulaId: data.cedulaId,
        valorCredito: data.valorCredito,
        tasaInteres: tasaMensual,
        plazoMeses: data.plazoMeses,
        comercialRegistra: data.comercialRegistra
      });
      reset();
      toast.success('Crédito registrado correctamente');
      onSuccess?.();
    } catch (e) {
      throw e;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Registrar crédito</CardTitle>
        <CardDescription>
          Completa los datos del crédito a registrar
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nombreCliente">Nombre del cliente</Label>
              <Input
                id="nombreCliente"
                placeholder="Ej: Pepito Perez"
                {...register('nombreCliente')}
              />
              {errors.nombreCliente && (
                <p className="text-sm text-destructive">{errors.nombreCliente.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="cedulaId">Cédula o ID</Label>
              <Input
                id="cedulaId"
                placeholder="Ej: 123456789"
                {...register('cedulaId')}
              />
              {errors.cedulaId && (
                <p className="text-sm text-destructive">{errors.cedulaId.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="valorCredito">Valor del crédito</Label>
              <Input
                id="valorCredito"
                type="number"
                placeholder="Ej: 7800000"
                {...register('valorCredito')}
              />
              {errors.valorCredito && (
                <p className="text-sm text-destructive">{errors.valorCredito.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label>Tipo de tasa</Label>
              <Select
                value={tipoTasa}
                onValueChange={(v) => setValue('tipoTasa', v as 'anual' | 'mensual')}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mensual">Efectivo mensual</SelectItem>
                  <SelectItem value="anual">Efectivo anual</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="tasaInteresInput">
                Tasa ({tipoTasa === 'anual' ? 'anual' : 'mensual'}) %
              </Label>
              <Input
                id="tasaInteresInput"
                type="number"
                step="0.01"
                min="0"
                max="100"
                placeholder={tipoTasa === 'anual' ? 'Ej: 24' : 'Ej: 2'}
                {...register('tasaInteresInput')}
              />
              {errors.tasaInteresInput && (
                <p className="text-sm text-destructive">{errors.tasaInteresInput.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="equivalenteMensual">Equivalente efectivo mensual</Label>
              <Input
                id="equivalenteMensual"
                readOnly
                disabled
                className="bg-muted"
                value={
                  tasaMensualEquiv !== null
                    ? `${tasaMensualEquiv.toFixed(4)}%`
                    : '—'
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="plazoMeses">Plazo (meses)</Label>
              <Input
                id="plazoMeses"
                type="number"
                placeholder="Ej: 12"
                {...register('plazoMeses')}
              />
              {errors.plazoMeses && (
                <p className="text-sm text-destructive">{errors.plazoMeses.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="comercialRegistra">Comercial que registra</Label>
            <Input
              id="comercialRegistra"
              placeholder="Nombre del comercial"
              {...register('comercialRegistra')}
            />
            {errors.comercialRegistra && (
              <p className="text-sm text-destructive">{errors.comercialRegistra.message}</p>
            )}
          </div>

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Registrando...' : 'Registrar'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
