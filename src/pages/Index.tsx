import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChefHat, Users, BarChart3, Settings, Palette, Smartphone } from 'lucide-react';
import { initializeRealTime } from '@/store/realTimeStore';

const Index = () => {
  useEffect(() => {
    // Initialize real-time functionality
    initializeRealTime();
  }, []);

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
          
          {/* Cardápio Digital */}
          <Card className="group relative overflow-hidden rounded-2xl bg-gradient-subtle border-0 shadow-lg hover:shadow-brand transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-8 text-center space-y-6">
              <div className="w-20 h-20 mx-auto bg-gradient-brand rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Smartphone className="w-10 h-10 text-white" />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-foreground">Cardápio Digital</h2>
                <p className="text-muted-foreground">
                  Experiência completa do cliente
                </p>
              </div>
              <div className="space-y-3">
                <Link to="/client/login">
                  <Button className="w-full bg-gradient-brand text-white hover:opacity-90 transition-opacity">
                    Acessar Mesa
                  </Button>
                </Link>
                <Link to="/client/login?demo=1">
                  <Button variant="outline" className="w-full">
                    Mesa 7 (Demo)
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* KDS - Cozinha */}
          <Card className="group relative overflow-hidden rounded-2xl bg-gradient-subtle border-0 shadow-lg hover:shadow-brand transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-8 text-center space-y-6">
              <div className="w-20 h-20 mx-auto bg-gradient-brand rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <ChefHat className="w-10 h-10 text-white" />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-foreground">KDS - Cozinha</h2>
                <p className="text-muted-foreground">
                  Sistema de display para cozinha
                </p>
              </div>
              <Link to="/kds/login">
                <Button className="w-full bg-gradient-brand text-white hover:opacity-90 transition-opacity">
                  Abrir KDS
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Staff - Salão */}
          <Card className="group relative overflow-hidden rounded-2xl bg-gradient-subtle border-0 shadow-lg hover:shadow-brand transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-8 text-center space-y-6">
              <div className="w-20 h-20 mx-auto bg-gradient-brand rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Users className="w-10 h-10 text-white" />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-foreground">Staff - Salão</h2>
                <p className="text-muted-foreground">
                  Gestão de mesas e atendimento
                </p>
              </div>
              <Link to="/staff/login">
                <Button className="w-full bg-gradient-brand text-white hover:opacity-90 transition-opacity">
                  Área do Staff
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Admin */}
          <Card className="group relative overflow-hidden rounded-2xl bg-gradient-subtle border-0 shadow-lg hover:shadow-brand transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-8 text-center space-y-6">
              <div className="w-20 h-20 mx-auto bg-gradient-brand rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Settings className="w-10 h-10 text-white" />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-foreground">Admin</h2>
                <p className="text-muted-foreground">
                  Gestão completa do sistema
                </p>
              </div>
              <Link to="/admin/login">
                <Button className="w-full bg-gradient-brand text-white hover:opacity-90 transition-opacity">
                  Painel Admin
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Dashboard */}
          <Card className="group relative overflow-hidden rounded-2xl bg-gradient-subtle border-0 shadow-lg hover:shadow-brand transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-8 text-center space-y-6">
              <div className="w-20 h-20 mx-auto bg-gradient-brand rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <BarChart3 className="w-10 h-10 text-white" />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-foreground">Dashboard</h2>
                <p className="text-muted-foreground">
                  Análises e relatórios
                </p>
              </div>
              <Link to="/dashboard">
                <Button className="w-full bg-gradient-brand text-white hover:opacity-90 transition-opacity">
                  Ver Dashboard
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Design System */}
          <Card className="group relative overflow-hidden rounded-2xl bg-gradient-subtle border-0 shadow-lg hover:shadow-brand transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-8 text-center space-y-6">
              <div className="w-20 h-20 mx-auto bg-gradient-brand rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Palette className="w-10 h-10 text-white" />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-foreground">Design System</h2>
                <p className="text-muted-foreground">
                  Componentes e tokens
                </p>
              </div>
              <Link to="/design-system">
                <Button className="w-full bg-gradient-brand text-white hover:opacity-90 transition-opacity">
                  Ver Componentes
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Index;
