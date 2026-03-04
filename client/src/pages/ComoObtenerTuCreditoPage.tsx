import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function ComoObtenerTuCreditoPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Cómo obtener tu crédito</h2>
        <p className="text-muted-foreground">
          Consejos y buenas prácticas para mejorar tus posibilidades de acceder a un crédito
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>1. Mantén un historial crediticio limpio</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Paga tus obligaciones a tiempo. Los retrasos en pagos de tarjetas, préstamos o servicios
              pueden afectar tu puntaje. Revisa tu historial crediticio con regularidad para detectar
              errores.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>2. Reduces tus deudas existentes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Un menor nivel de endeudamiento mejora tu perfil. Prioriza pagar deudas de mayor
              interés y evita usar el límite completo de tus tarjetas de crédito.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>3. Ten ingresos estables y documentados</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Las entidades financieras valoran la estabilidad laboral y los ingresos comprobables.
              Mantén copias de certificados laborales, declaraciones de renta o comprobantes de ingreso.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>4. Ahorra y construye un respaldo</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Un ahorro previo demuestra disciplina financiera y reduce el riesgo percibido. Además,
              te permite aportar cuota inicial o afrontar imprevistos sin afectar tus pagos.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>5. Conoce tu capacidad de pago</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Calcula cuánto puedes destinar mensualmente al crédito sin comprometer tus gastos
              básicos. Como regla general, los pagos de créditos no deberían superar el 30-40% de
              tus ingresos.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>6. Compara opciones antes de decidir</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Revisa tasas de interés, plazos y condiciones en varias entidades. Lee bien las
              cláusulas y evita comprometerte con la primera oferta que recibas.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
