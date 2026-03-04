import { CreditTable } from '@/components/CreditTable';

export function ConsultaCreditosPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Consulta de créditos</h2>
        <p className="text-muted-foreground">
          Filtra, ordena y revisa todos los créditos registrados. Haz clic en un crédito para ver su tabla de amortización.
        </p>
      </div>

      <CreditTable />
    </div>
  );
}
