import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/design/components/atoms/Card';
import { Button } from '@/design/components/atoms/Button';
import { ChefHat, Users, BarChart3, Settings, Palette, Smartphone } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle flex flex-col">
      {/* Hero Section */}
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="text-center space-y-8 mb-16">
          <div className="space-y-4">
            <h1 className="text-6xl font-bold bg-gradient-brand bg-clip-text text-transparent">
              RestaurantOS
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
              Sistema completo de gestão para restaurantes modernos. 
              Cardápio digital, KDS, gestão de mesas e muito mais.
            </p>
          </div>
        </div>

        {/* Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          
          <Link to="/m/mesa-7-demo">
            <Card variant="interactive" radius="xl" className="p-8 text-center space-y-4 hover-glow">
              <Smartphone className="w-16 h-16 text-primary mx-auto" />
              <div className="space-y-2">
                <h2 className="text-2xl font-bold">Cardápio Digital</h2>
                <p className="text-muted-foreground">
                  Experiência do cliente - Mesa 7 (Demo)
                </p>
              </div>
              <Button variant="hero" size="lg" className="w-full">
                Acessar como Cliente
              </Button>
            </Card>
          </Link>

          <Link to="/kds">
            <Card variant="interactive" radius="xl" className="p-8 text-center space-y-4 hover-glow">
              <ChefHat className="w-16 h-16 text-primary mx-auto" />
              <div className="space-y-2">
                <h2 className="text-2xl font-bold">KDS - Cozinha</h2>
                <p className="text-muted-foreground">
                  Sistema de display para cozinha
                </p>
              </div>
              <Button variant="hero" size="lg" className="w-full">
                Abrir KDS
              </Button>
            </Card>
          </Link>

          <Link to="/staff">
            <Card variant="interactive" radius="xl" className="p-8 text-center space-y-4 hover-glow">
              <Users className="w-16 h-16 text-primary mx-auto" />
              <div className="space-y-2">
                <h2 className="text-2xl font-bold">Staff - Salão</h2>
                <p className="text-muted-foreground">
                  Gestão de mesas e atendimento
                </p>
              </div>
              <Button variant="hero" size="lg" className="w-full">
                Área do Staff
              </Button>
            </Card>
          </Link>

          <Link to="/admin">
            <Card variant="interactive" radius="xl" className="p-8 text-center space-y-4 hover-glow">
              <Settings className="w-16 h-16 text-primary mx-auto" />
              <div className="space-y-2">
                <h2 className="text-2xl font-bold">Admin</h2>
                <p className="text-muted-foreground">
                  Catálogo e configurações
                </p>
              </div>
              <Button variant="hero" size="lg" className="w-full">
                Painel Admin
              </Button>
            </Card>
          </Link>

          <Link to="/dashboard">
            <Card variant="interactive" radius="xl" className="p-8 text-center space-y-4 hover-glow">
              <BarChart3 className="w-16 h-16 text-primary mx-auto" />
              <div className="space-y-2">
                <h2 className="text-2xl font-bold">Dashboard</h2>
                <p className="text-muted-foreground">
                  Análises e relatórios
                </p>
              </div>
              <Button variant="hero" size="lg" className="w-full">
                Ver Dashboard
              </Button>
            </Card>
          </Link>

          <Link to="/design-system">
            <Card variant="interactive" radius="xl" className="p-8 text-center space-y-4 hover-glow">
              <Palette className="w-16 h-16 text-primary mx-auto" />
              <div className="space-y-2">
                <h2 className="text-2xl font-bold">Design System</h2>
                <p className="text-muted-foreground">
                  Componentes e tokens
                </p>
              </div>
              <Button variant="hero" size="lg" className="w-full">
                Ver Componentes
              </Button>
            </Card>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Index;
