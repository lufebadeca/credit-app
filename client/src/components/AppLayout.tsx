import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { FilePlus, List, LogOut } from 'lucide-react';

const navItems = [
  { to: '/registrar', label: 'Registrar crédito', icon: FilePlus },
  { to: '/consulta', label: 'Consulta de créditos', icon: List }
];

export function AppLayout({ children }: { children: React.ReactNode }) {
  const { logout } = useAuth();
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold">Credit App</h1>
              <span className="text-sm text-muted-foreground hidden sm:inline">Fya Social Capital</span>
            </div>
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
    </div>
  );
}
