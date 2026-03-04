import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { PublicNavbar } from '@/components/PublicNavbar';

const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(1, 'Contraseña requerida')
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginPage() {
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = async (data: LoginFormValues) => {
    setError('');
    try {
      await login(data.email, data.password);
      navigate('/registrar');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al iniciar sesión');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f2d32] via-[#1A363B] to-[#0f2529]">
      <PublicNavbar />
      <div className="flex items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md bg-white/95 border-white/20 text-foreground">
          <CardHeader>
            <CardTitle>Iniciar sesión</CardTitle>
            <CardDescription>
              Ingresa tus credenciales para acceder
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@fyasocialcapital.com"
                  {...register('email')}
                />
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <Input
                  id="password"
                  type="password"
                  {...register('password')}
                />
                {errors.password && (
                  <p className="text-sm text-destructive">{errors.password.message}</p>
                )}
              </div>
              {error && (
                <p className="text-sm text-destructive">{error}</p>
              )}
              <Button
                type="submit"
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-white cursor-pointer"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Iniciando sesión...' : 'Iniciar sesión'}
              </Button>
              <p className="text-sm text-center text-muted-foreground">
                ¿No tienes cuenta?{' '}
                <Link to="/" className="text-emerald-600 hover:text-emerald-500 font-medium cursor-pointer">
                  Conoce más sobre nosotros
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
