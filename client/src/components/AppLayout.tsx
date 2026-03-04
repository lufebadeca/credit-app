import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { FilePlus, List, BookOpen, LogOut } from 'lucide-react';
import logFya from '@/assets/logFya.png';
import { ChatWidget } from '@/components/ChatWidget';

const navItems = [
  { to: '/registrar', label: 'Registrar crédito', icon: FilePlus },
  { to: '/consulta', label: 'Consulta de créditos', icon: List },
  { to: '/como-obtener-credito', label: 'Cómo obtener tu crédito', icon: BookOpen }
];

export function AppLayout({ children }: { children: React.ReactNode }) {
  const { logout } = useAuth();
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <Link to="/registrar" className="flex items-center gap-2">
              <img src={logFya} alt="Fya Social Capital" className="h-8 object-contain" />
              <span className="text-lg font-semibold">Credit App</span>
              <span className="text-sm text-muted-foreground hidden sm:inline">Fya Social Capital</span>
            </Link>
            <nav className="flex flex-wrap items-center gap-1">
              {navItems.map(({ to, label, icon: Icon }) => (
                <Link key={to} to={to}>
                  <Button
                    variant={location.pathname.startsWith(to) ? 'default' : 'ghost'}
                    size="sm"
                    className="gap-2"
                  >
                    <Icon className="size-4" />
                    {label}
                  </Button>
                </Link>
              ))}
            </nav>
            <Button variant="outline" size="sm" onClick={logout} className="gap-2 w-fit">
              <LogOut className="size-4" />
              Cerrar sesión
            </Button>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-6">
        {children}
      </main>
      <ChatWidget />
    </div>
  );
}
