import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/design/components/atoms/Card';
import { Button } from '@/design/components/atoms/Button';
import { Settings, QrCode, Package, ArrowLeft } from 'lucide-react';

const Admin: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-background/95 backdrop-blur">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <Settings className="w-8 h-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold text-primary">Admin - Painel</h1>
                <p className="text-sm text-muted-foreground">Gestão de produtos e configurações</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link to="/admin/products">
            <Card variant="interactive" className="p-6 text-center space-y-4 h-full">
              <Package className="w-12 h-12 text-primary mx-auto" />
              <h2 className="text-xl font-bold">Catálogo de Produtos</h2>
              <p className="text-muted-foreground">Gerencie itens do menu</p>
              <Button variant="hero">Gerenciar</Button>
            </Card>
          </Link>

          <Link to="/admin/qr-codes">
            <Card variant="interactive" className="p-6 text-center space-y-4 h-full">
              <QrCode className="w-12 h-12 text-primary mx-auto" />
              <h2 className="text-xl font-bold">QR Codes</h2>
              <p className="text-muted-foreground">Códigos QR das mesas</p>
              <Button variant="hero">Gerar</Button>
            </Card>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Admin;