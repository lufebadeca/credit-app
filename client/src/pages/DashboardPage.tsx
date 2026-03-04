import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { CreditForm } from '@/components/CreditForm';
import { CreditTable } from '@/components/CreditTable';
import { LogOut } from 'lucide-react';

export function DashboardPage() {
  const { logout } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-xl font-semibold">Credit App - Fya Social Capital</h1>
          <Button variant="outline" size="sm" onClick={logout}>
            <LogOut className="size-4 mr-2" />
            Cerrar sesión
          </Button>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8 space-y-8">
        <CreditForm onSuccess={() => window.dispatchEvent(new Event('credits-updated'))} />
        <CreditTable />
      </main>
    </div>
  );
}
