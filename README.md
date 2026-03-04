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

Opcional. Para producción, crea `client/.env`:

```
VITE_API_URL=https://tu-api.com/api
```

En desarrollo, el proxy de Vite apunta a `http://localhost:3000`.

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

## Despliegue sugerido

| Componente | Plataforma | Notas |
|------------|------------|-------|
| Frontend | Vercel | Conectar repo, build command: `cd client && npm run build`, output: `client/dist` |
| Backend | Render | Web Service, Node, comando: `cd server && npm start`, variables de entorno |
| Base de datos | MongoDB Atlas | Cluster gratuito |
| Email | Gmail SMTP / SendGrid | Variables SMTP_* en el backend |

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

Privado - Fya Social Capital SAS
