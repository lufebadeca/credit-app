# Envío de correo por Webhook (Zapier / Make)

Cuando se registra un crédito, la app hace un POST a una URL (webhook). Un servicio externo recibe los datos y envía el correo a **fyasocialcapital@gmail.com**.

Ventajas: no depende de SMTP, funciona en Render free tier (con inactividad), no usa Agenda.

## Configuración

### 1. Crear la automatización

#### Opción A: Zapier

1. [zapier.com](https://zapier.com) → **Create Zap**
2. **Trigger:** Webhooks by Zapier → **Catch Hook**
3. Copia la URL del webhook (ej: `https://hooks.zapier.com/hooks/catch/12345/abcdef/`)
4. **Action:** Gmail → **Send Email**
   - Conecta tu Gmail
   - **To:** fyasocialcapital@gmail.com
   - **Subject:** `Nuevo crédito - {{nombreCliente}}`
   - **Body:** texto o HTML con:
     - `{{nombreCliente}}`
     - `{{valorCredito}}`
     - `{{comercialRegistra}}`
     - `{{fechaRegistro}}`
5. Activa el Zap y **deja el webhook en espera del primer request** (o haz un test)

#### Opción B: Make (Integromat)

1. [make.com](https://make.com) → **Create new scenario**
2. **Trigger:** Webhooks → **Custom webhook** → crea uno, copia la URL
3. **Module:** Gmail → **Send an Email**
   - Mapea los campos del payload al correo
4. Activa el escenario

### 2. Añadir la variable en Render / Railway

En el panel de tu servicio:

- **Variable:** `WEBHOOK_EMAIL_URL`
- **Valor:** la URL del webhook (Zapier o Make)

Ejemplo: `https://hooks.zapier.com/hooks/catch/12345/abcdef/`

### 3. Formato del payload

La app envía un POST con JSON:

```json
{
  "nombreCliente": "Juan Pérez",
  "valorCredito": 5000000,
  "comercialRegistra": "Admin",
  "fechaRegistro": "2025-03-04T10:30:00.000Z"
}
```

Mapea estos campos en tu Zap/escenario para crear el correo.
