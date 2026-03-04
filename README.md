# Credit App - Fya Social Capital

Aplicación web para registrar y consultar créditos. Desarrollada como prueba técnica.

## Características principales

- **Selector de tipo de tasa de interés** con calculadora de equivalencia (efectiva anual ↔ efectiva mensual)
- **Enrutamiento por vistas**: nuevo crédito, consulta de créditos, detalle de un crédito
- **Tabla de amortización** en la página de detalle de cada crédito (sistema de cuota fija)
- **Chat con IA** para consultas sobre créditos, tasas de interés, información general y navegación en la app
- **Landing pública** para usuarios no autenticados con navbar y llamadas a la acción
- **Envío de correo** al registrar un crédito (vía webhook Zapier/Make o Agenda + SMTP)

## Stack

- **Frontend**: React (Vite), TypeScript, Tailwind CSS, Shadcn UI, Zod, React Hook Form
- **Backend**: Node.js, Express, Mongoose
- **Base de datos**: MongoDB (Atlas)
- **Email**: Webhook (Zapier/Make) o Nodemailer + Agenda.js (jobs en segundo plano)

## Requisitos

- Node.js 20+
- MongoDB (local o Atlas)

## Configuración

### 1. Clonar e instalar

```bash
git clone https://github.com/lufebadeca/credit-app.git
cd credit-app
cd server && npm install
cd ../client && npm install
```

### 2. Variables de entorno (Server)

Copia `.env.example` a `.env` en la carpeta `server`:

```bash
cp server/.env.example server/.env
```

Edita `server/.env` con `MONGODB_URI`, `JWT_SECRET` y, opcionalmente, `WEBHOOK_EMAIL_URL` para el envío de correos. Ver [docs/WEBHOOK_EMAIL.md](docs/WEBHOOK_EMAIL.md).

### 3. Variables de entorno (Client)

Crea `client/.env`:

```
VITE_GEMINI_API_KEY=tu_api_key_de_google_ai
```

(Opcional para desarrollo: `VITE_API_URL` si el backend está en otra URL.)

### 4. Crear usuario inicial

```bash
cd server && npm run seed
```

Esto crea el usuario: `admin@fyasocialcapital.com` / `Admin123!`

Opcional - datos de ejemplo:
```bash
cd server && npm run seed:credits
```

## Ejecutar

### Desarrollo

**Terminal 1 - Backend:**
```bash
cd server && npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd client && npm run dev
```

- Frontend: http://localhost:5173
- Backend: http://localhost:3000

### Producción (local)

```bash
npm run build
npm start
```

## Despliegue

Frontend y backend se despliegan juntos: el servidor sirve el build estático del frontend.

### Render

1. Cuenta en [render.com](https://render.com) → conecta el repo.
2. **Nuevo Web Service** → selecciona el repo.
3. Configura:
   - **Build Command:** `cd server && npm install && cd ../client && npm install && npm run build`
   - **Start Command:** `cd server && npm start`
4. En **Environment**: `MONGODB_URI`, `JWT_SECRET`, `WEBHOOK_EMAIL_URL` (opcional), `VITE_GEMINI_API_KEY` (opcional).
5. Opcional: usar `render.yaml` como Blueprint.

### Railway

1. Cuenta en [railway.app](https://railway.app) → conecta el repo.
2. **New Project** → **Deploy from GitHub**.
3. En el servicio → **Settings**:
   - **Build Command:** `npm run build`
   - **Start Command:** `npm start`
   - **Root Directory:** `/`
4. **Variables**: `MONGODB_URI`, `JWT_SECRET`, `WEBHOOK_EMAIL_URL`, `VITE_GEMINI_API_KEY`.
5. **Settings → Networking** → **Generate Domain** para exponer la app y obtener la URL pública.

### Después del deploy

Ejecuta el seed para crear el usuario admin (con `MONGODB_URI` apuntando a tu Atlas):

```bash
cd server && MONGODB_URI="<tu_uri>" npm run seed
```

## Estructura

```
credit-app/
├── client/          # React + Vite + Shadcn
├── server/          # Express + Mongoose + Agenda
│   ├── src/
│   │   ├── config/   # DB, Agenda
│   │   ├── jobs/     # Envío de correo
│   │   ├── lib/      # notifyCredit (webhook)
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   └── schemas/
│   └── .env.example
├── docs/
│   ├── EMAIL_SETUP.md
│   └── WEBHOOK_EMAIL.md
└── README.md
```

## Seguridad

- **Helmet**: Headers HTTP seguros y CSP configurado
- **express-mongo-sanitize**: Prevención de inyección NoSQL
- **Zod**: Validación estricta de entradas
- **JWT**: Autenticación para rutas protegidas

## Licencia

Privado - Fya Social Capital SAS & Luis Baldovino
