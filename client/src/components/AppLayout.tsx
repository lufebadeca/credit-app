import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { FilePlus, List, BookOpen, LogOut, Menu, X } from 'lucide-react';
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
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const handleResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card sticky top-0 z-40">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            <Link to="/registrar" className="flex items-center gap-3 shrink-0">
              <img src={logFya} alt="Fya Social Capital" className="h-8 object-contain" />
              <div className="hidden sm:flex flex-col leading-tight">
                <span className="text-base font-semibold">Credit App</span>
                <span className="text-xs text-muted-foreground">Fya Social Capital</span>
              </div>
              <span className="text-lg font-semibold sm:hidden">Credit App</span>
            </Link>

            <div className="hidden md:flex items-center gap-2 ml-auto">
              <nav className="flex items-center gap-1">
                {navItems.map(({ to, label, icon: Icon }) => (
                  <Link key={to} to={to} className="cursor-pointer">
                    <Button
                      variant={location.pathname.startsWith(to) ? 'default' : 'ghost'}
                      size="sm"
                      className="gap-2 cursor-pointer transition-colors hover:opacity-90"
                    >
                      <Icon className="size-4" />
                      {label}
                    </Button>
                  </Link>
                ))}
              </nav>
              <Button variant="outline" size="sm" onClick={logout} className="gap-2 shrink-0 cursor-pointer transition-colors hover:opacity-90">
                <LogOut className="size-4" />
                Cerrar sesión
              </Button>
            </div>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors cursor-pointer"
              aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {menuOpen && (
            <div className="md:hidden mt-4 pb-2 border-t pt-4 animate-in slide-in-from-top-2 duration-200">
              <div className="flex flex-col gap-1">
                {navItems.map(({ to, label, icon: Icon }) => (
                  <Link key={to} to={to} onClick={closeMenu} className="cursor-pointer">
                    <Button
                      variant={location.pathname.startsWith(to) ? 'default' : 'ghost'}
                      size="sm"
                      className="w-full justify-start gap-2 cursor-pointer transition-colors hover:opacity-90"
                    >
                      <Icon className="size-4" />
                      {label}
                    </Button>
                  </Link>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => { closeMenu(); logout(); }}
                  className="w-full justify-start gap-2 mt-2 cursor-pointer transition-colors hover:opacity-90"
                >
                  <LogOut className="size-4" />
                  Cerrar sesión
                </Button>
              </div>
            </div>
          )}
        </div>
      </header>
      <main className="container mx-auto px-4 py-6">
        {children}
      </main>
      <ChatWidget />
    </div>
  );
}
