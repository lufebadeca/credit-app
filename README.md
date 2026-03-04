# Credit App - Fya Social Capital

Aplicación web para registrar y consultar créditos. Desarrollada como prueba técnica.

## Stack

- **Frontend**: React (Vite), TypeScript, Tailwind CSS, Shadcn UI, Zod, React Hook Form
- **Backend**: Node.js, Express, Mongoose
- **Base de datos**: MongoDB (Atlas)
- **Email**: Nodemailer + Agenda.js (jobs en segundo plano)

## Requisitos

- Node.js 18+
- MongoDB (local o Atlas)
- Cuenta SMTP (Gmail, SendGrid, etc.)

## Configuración

### 1. Clonar e instalar

```bash
git clone <repositorio>
cd credit-app
cd server && npm install
cd ../client && npm install
```

### 2. Variables de entorno (Server)

Copia `.env.example` a `.env` en la carpeta `server`:

```bash
cp server/.env.example server/.env
```

Edita `server/.env`:

```
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/credit-app?retryWrites=true&w=majority
JWT_SECRET=tu_clave_secreta_muy_segura
PORT=3000
CORS_ORIGIN=http://localhost:5173

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=tu_email@gmail.com
SMTP_PASS=tu_app_password
```

Ver [docs/EMAIL_SETUP.md](docs/EMAIL_SETUP.md) para configuración detallada.

**Gmail:** SMTP_USER = tu email, SMTP_PASS = contraseña de aplicación de 16 caracteres ([cómo generar](https://support.google.com/accounts/answer/185833)).

**Turbo SMTP:** EMAIL_FROM debe estar verificado en el panel de Turbo SMTP.

### 3. Variables de entorno (Client)

Crea `client/.env`:

```
VITE_API_URL=https://tu-api.com/api
VITE_GEMINI_API_KEY=tu_api_key_de_google_ai
```

- `VITE_API_URL`: opcional en desarrollo (proxy a localhost:3000).
- `VITE_GEMINI_API_KEY`: para el chat de IA con Gemini ([Google AI Studio](https://aistudio.google.com)).

### 4. Crear usuario inicial

```bash
cd server
npm run seed
```

Esto crea el usuario: `admin@fyasocialcapital.com` / `Admin123!`

Opcional - datos de ejemplo del anexo:
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

### Producción

```bash
cd client && npm run build
cd ../server && npm start
```

Sirve el frontend desde `client/dist` o despliega por separado.

## Despliegue (Render o Railway)

Frontend y backend se despliegan juntos: el servidor sirve el build estático del frontend.

### Render

1. Crea cuenta en [render.com](https://render.com) y conecta tu repositorio.
2. **Nuevo Web Service** → selecciona el repo.
3. Configura:
   - **Root Directory:** (vacío = raíz)
   - **Build Command:** `cd server && npm install && cd ../client && npm install && npm run build`
   - **Start Command:** `cd server && npm start`
4. En **Environment** añade:
   - `MONGODB_URI` – URI de MongoDB Atlas
   - `JWT_SECRET` – clave secreta para JWT
   - `WEBHOOK_EMAIL_URL` – URL del webhook (Zapier/Make) para enviar correos al registrar créditos. Ver [docs/WEBHOOK_EMAIL.md](docs/WEBHOOK_EMAIL.md)
   - `VITE_GEMINI_API_KEY` – (opcional) para el chat con IA

Opcional: si tienes `render.yaml` en el repo, Render puede usarlo como Blueprint.

### Railway

1. Crea cuenta en [railway.app](https://railway.app) y conecta el repo.
2. **New Project** → **Deploy from GitHub**.
3. En el servicio → **Settings** → configura:
   - **Build Command:** `npm run build`
   - **Start Command:** `npm start` (o `node server/src/server.js`)
   - **Root Directory:** `/` (raíz del repo)
4. Añade las mismas variables de entorno que en Render.

### Después del deploy

Ejecuta el seed para crear el usuario admin (desde local con `MONGODB_URI` apuntando a tu Atlas, o desde Railway/Render si ofrecen un shell):

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
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   └── schemas/
│   └── .env.example
└── README.md
```

## Seguridad

- **Helmet**: Headers HTTP seguros
- **express-mongo-sanitize**: Prevención de inyección NoSQL
- **Zod**: Validación estricta de entradas
- **JWT**: Autenticación para rutas protegidas

## Licencia

Privado - Fya Social Capital SAS & Luis Baldovino
