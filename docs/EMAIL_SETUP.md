# Configuración de correo electrónico

## Opciones

### Opción A: Gmail (recomendado para pruebas)

1. Activa verificación en 2 pasos en tu cuenta Google.
2. Genera una **contraseña de aplicación** de 16 caracteres:
   - Cuenta Google → Seguridad → Verificación en 2 pasos → Contraseñas de aplicaciones
3. En `.env`:

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=tu_email@gmail.com
SMTP_PASS=abcd_efgh_ijkl_mnop
EMAIL_FROM=tu_email@gmail.com
EMAIL_RECEIVER=destino@gmail.com
```

Tu cuenta de Google es la que envía el correo. La contraseña de 16 caracteres va en `SMTP_PASS` (sin espacios).

### Opción B: Turbo SMTP

1. En Turbo SMTP, añade y verifica el email remitente (EMAIL_FROM) en su panel.
2. En `.env`:

```
SMTP_HOST=pro.eu.turbo-smtp.com
SMTP_PORT=587
SMTP_USER=Consumer_Key
SMTP_PASS=Consumer_Password
EMAIL_FROM=email_verificado@tudominio.com
EMAIL_RECEIVER=destino@gmail.com
```

El `EMAIL_FROM` debe estar verificado en Turbo SMTP.

## Probar el envío

Con el servidor corriendo y estando autenticado:

```bash
curl -X POST http://localhost:3000/api/test-email \
  -H "Authorization: Bearer TU_JWT_TOKEN"
```

O desde el frontend, llama a `POST /api/test-email` con el token.

Revisa la consola del servidor para ver errores de SMTP.
