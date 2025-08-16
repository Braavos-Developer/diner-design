import React from 'react';
import { Card } from '@/design/components/atoms/Card';
import { Button } from '@/design/components/atoms/Button';
import { Settings, QrCode, Package } from 'lucide-react';

const Admin: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-background/95 backdrop-blur">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <Settings className="w-8 h-8 text-primary" />
            <div>
              <h1 className="text-2xl font-bold text-primary">Admin - Catálogo</h1>
              <p className="text-sm text-muted-foreground">Gestão de produtos e configurações</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card variant="interactive" className="p-6 text-center space-y-4">
            <Package className="w-12 h-12 text-primary mx-auto" />
            <h2 className="text-xl font-bold">Catálogo de Produtos</h2>
            <p className="text-muted-foreground">Gerencie itens do menu</p>
            <Button variant="hero">Gerenciar</Button>
          </Card>

          <Card variant="interactive" className="p-6 text-center space-y-4">
            <QrCode className="w-12 h-12 text-primary mx-auto" />
            <h2 className="text-xl font-bold">QR Codes</h2>
            <p className="text-muted-foreground">Códigos QR das mesas</p>
            <Button variant="hero">Gerar</Button>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Admin;