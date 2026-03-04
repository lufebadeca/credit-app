import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PublicNavbar } from '@/components/PublicNavbar';

export function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f2d32] via-[#1A363B] to-[#0f2529] text-white">
      <PublicNavbar />

      <main className="relative overflow-hidden">
        {/* Fondo decorativo con elementos financieros sutiles */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        />

        <section className="relative container mx-auto px-4 pt-16 pb-24 md:pt-24 md:pb-32 text-center">
          {/* Badge de confianza */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/5 mb-8">
            <Sparkles className="size-4 text-emerald-400" />
            <span className="text-sm font-medium text-white/90">Tu aliado financiero de confianza</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold max-w-4xl mx-auto leading-tight mb-6">
            <span className="text-white">ConFya tu crédito para que vivas sin </span>
            <span className="text-emerald-400">estrés!</span>
          </h1>

          {/* Subtítulo */}
          <p className="text-lg md:text-xl text-white/85 max-w-2xl mx-auto mb-10">
            Créditos diseñados especialmente para pensionados y docentes. Tu tranquilidad financiera es nuestra
            prioridad.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/login">
              <Button
                size="lg"
                className="bg-emerald-500 hover:bg-emerald-400 text-white font-semibold px-8 cursor-pointer transition-colors hover:opacity-95"
              >
                Solicita tu Crédito
              </Button>
            </Link>
            <Link to="/#beneficios">
              <Button
                variant="outline"
                size="lg"
                className="border-white/30 bg-white/5 hover:bg-white/10 text-white font-medium px-8 cursor-pointer transition-colors"
              >
                Conoce Más
              </Button>
            </Link>
          </div>
        </section>

        {/* Secciones informativas con IDs para navegación */}
        <section id="nosotros" className="container mx-auto px-4 py-16 border-t border-white/10">
          <h2 className="text-2xl font-bold text-emerald-400 mb-4">Nosotros</h2>
          <p className="text-white/85 max-w-2xl">
            Fya Social Capital es una empresa comprometida con el bienestar financiero de pensionados y docentes.
            Ofrecemos créditos con condiciones justas y un proceso ágil.
          </p>
        </section>

        <section id="beneficios" className="container mx-auto px-4 py-16 border-t border-white/10">
          <h2 className="text-2xl font-bold text-emerald-400 mb-4">Beneficios</h2>
          <ul className="text-white/85 space-y-2 max-w-2xl">
            <li>• Tasas de interés competitivas</li>
            <li>• Proceso de aprobación ágil</li>
            <li>• Atención personalizada</li>
            <li>• Flexibilidad en plazos de pago</li>
          </ul>
        </section>

        <section id="proceso" className="container mx-auto px-4 py-16 border-t border-white/10">
          <h2 className="text-2xl font-bold text-emerald-400 mb-4">Proceso</h2>
          <p className="text-white/85 max-w-2xl">
            Solicita tu crédito de manera sencilla: regístrate, completa el formulario y espera la aprobación.
            Nuestro equipo estará listo para ayudarte en cada paso.
          </p>
          <Link to="/login" className="inline-block mt-4">
            <Button
              size="sm"
              className="bg-emerald-500 hover:bg-emerald-400 text-white cursor-pointer transition-colors"
            >
              Solicita tu Crédito
            </Button>
          </Link>
        </section>

        <section id="alianzas" className="container mx-auto px-4 py-16 border-t border-white/10">
          <h2 className="text-2xl font-bold text-emerald-400 mb-4">Alianzas</h2>
          <p className="text-white/85 max-w-2xl">
            Trabajamos con instituciones que comparten nuestra visión de inclusión financiera y apoyo a la comunidad.
          </p>
        </section>

        <section id="contacto" className="container mx-auto px-4 py-16 border-t border-white/10">
          <h2 className="text-2xl font-bold text-emerald-400 mb-4">Contacto</h2>
          <p className="text-white/85 max-w-2xl mb-4">
            ¿Tienes preguntas? Contáctanos y te responderemos a la brevedad.
          </p>
          <Link to="/login">
            <Button
              size="sm"
              className="bg-emerald-500 hover:bg-emerald-400 text-white cursor-pointer transition-colors"
            >
              Solicita tu Crédito
            </Button>
          </Link>
        </section>
      </main>

      {/* Botón flotante WhatsApp */}
      <a
        href="https://wa.me/573000000000"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white shadow-lg transition-all hover:scale-105 cursor-pointer"
        aria-label="Contactar por WhatsApp"
      >
        <svg viewBox="0 0 24 24" className="w-7 h-7" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
    </div>
  );
}
