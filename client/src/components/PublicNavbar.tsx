import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import logFya from '@/assets/logFya.png';

const navItems = [
  { to: '/', label: 'Inicio' },
  { to: '/#nosotros', label: 'Nosotros' },
  { to: '/#beneficios', label: 'Beneficios' },
  { to: '/#proceso', label: 'Proceso' },
  { to: '/#alianzas', label: 'Alianzas' },
  { to: '/#contacto', label: 'Contacto' }
];

export function PublicNavbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const handleResize = () => {
      if (globalThis.innerWidth >= 768) setMenuOpen(false);
    };
    globalThis.addEventListener('resize', handleResize);
    return () => globalThis.removeEventListener('resize', handleResize);
  }, []);

  const handleNavClick = (to: string) => {
    if (to === '/') {
      closeMenu();
      return;
    }
    closeMenu();
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0f2d32]/95 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <Link
            to="/"
            className="flex items-center gap-3 shrink-0 cursor-pointer transition-opacity hover:opacity-90"
            onClick={closeMenu}
          >
            <img src={logFya} alt="Fya Social Capital" className="h-8 object-contain" />
            <div className="hidden sm:flex flex-col leading-tight">
              <span className="text-base font-semibold text-white">Fya</span>
              <span className="text-xs text-white/80">SOCIAL CAPITAL</span>
            </div>
            <span className="text-lg font-semibold text-white sm:hidden">Fya</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navItems.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                onClick={() => handleNavClick(to)}
                className={`text-sm font-medium transition-colors hover:text-emerald-400 cursor-pointer ${
                  location.pathname === '/' && to === '/' ? 'text-emerald-400' : 'text-white'
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-2 ml-4">
            <Link to="/login">
              <Button
                size="sm"
                className="bg-emerald-500 hover:bg-emerald-400 text-white font-medium cursor-pointer transition-colors"
              >
                Solicita tu Crédito
              </Button>
            </Link>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden mt-4 pb-2 border-t border-white/10 pt-4 animate-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col gap-1">
              {navItems.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  onClick={() => handleNavClick(to)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                    location.pathname === '/' && to === '/' ? 'text-emerald-400 bg-emerald-500/20' : 'text-white hover:bg-white/10'
                  }`}
                >
                  {label}
                </Link>
              ))}
              <Link to="/login" onClick={closeMenu} className="mt-2">
                <Button
                  size="sm"
                  className="w-full bg-emerald-500 hover:bg-emerald-400 text-white cursor-pointer"
                >
                  Solicita tu Crédito
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
