import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/hooks/useAuth';
import { AppLayout } from '@/components/AppLayout';
import { LandingPage } from '@/pages/LandingPage';
import { LoginPage } from '@/pages/LoginPage';
import { RegistrarCreditoPage } from '@/pages/RegistrarCreditoPage';
import { ConsultaCreditosPage } from '@/pages/ConsultaCreditosPage';
import { AmortizacionPage } from '@/pages/AmortizacionPage';
import { ComoObtenerTuCreditoPage } from '@/pages/ComoObtenerTuCreditoPage';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

function HomeRedirect() {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) return <Navigate to="/registrar" replace />;
  return <LandingPage />;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomeRedirect />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/registrar"
        element={
          <ProtectedRoute>
            <AppLayout>
              <RegistrarCreditoPage />
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/consulta"
        element={
          <ProtectedRoute>
            <AppLayout>
              <ConsultaCreditosPage />
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/como-obtener-credito"
        element={
          <ProtectedRoute>
            <AppLayout>
              <ComoObtenerTuCreditoPage />
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/creditos/:id/amortizacion"
        element={
          <ProtectedRoute>
            <AppLayout>
              <AmortizacionPage />
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}
