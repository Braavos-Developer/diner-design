import React from 'react';
import { Card } from '@/design/components/atoms/Card';
import { Button } from '@/design/components/atoms/Button';
import { Badge } from '@/design/components/atoms/Badge';
import { Palette, Type, Layers } from 'lucide-react';

const DesignSystem: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-background/95 backdrop-blur">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <Palette className="w-8 h-8 text-primary" />
            <div>
              <h1 className="text-2xl font-bold text-primary">Design System</h1>
              <p className="text-sm text-muted-foreground">Componentes e tokens do sistema</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-6 space-y-12">
        
        {/* Colors */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Palette className="w-5 h-5" />
            Paleta de Cores
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="p-4 text-center">
              <div className="w-full h-16 bg-primary rounded-md mb-2"></div>
              <p className="font-medium">Primary</p>
              <p className="text-xs text-muted-foreground">Terra Cotta</p>
            </Card>
            <Card className="p-4 text-center">
              <div className="w-full h-16 bg-accent rounded-md mb-2"></div>
              <p className="font-medium">Accent</p>
              <p className="text-xs text-muted-foreground">Warm Amber</p>
            </Card>
            <Card className="p-4 text-center">
              <div className="w-full h-16 bg-success rounded-md mb-2"></div>
              <p className="font-medium">Success</p>
              <p className="text-xs text-muted-foreground">Fresh Green</p>
            </Card>
            <Card className="p-4 text-center">
              <div className="w-full h-16 bg-warning rounded-md mb-2"></div>
              <p className="font-medium">Warning</p>
              <p className="text-xs text-muted-foreground">Warm Orange</p>
            </Card>
          </div>
        </section>

        {/* Buttons */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Layers className="w-5 h-5" />
            Botões
          </h2>
          <div className="flex flex-wrap gap-4">
            <Button variant="default">Default</Button>
            <Button variant="hero">Hero</Button>
            <Button variant="warm">Warm</Button>
            <Button variant="success">Success</Button>
            <Button variant="warning">Warning</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
          </div>
        </section>

        {/* Badges */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold">Badges</h2>
          <div className="flex flex-wrap gap-2">
            <Badge variant="default">Default</Badge>
            <Badge variant="new">Novo</Badge>
            <Badge variant="bestseller">Mais Vendido</Badge>
            <Badge variant="vegetarian">Vegetariano</Badge>
            <Badge variant="vegan">Vegano</Badge>
            <Badge variant="glutenfree">Sem Glúten</Badge>
            <Badge variant="spicy">Picante</Badge>
          </div>
        </section>

        {/* Typography */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Type className="w-5 h-5" />
            Tipografia
          </h2>
          <div className="space-y-2">
            <h1 className="text-4xl font-bold">Heading 1 (4xl)</h1>
            <h2 className="text-3xl font-bold">Heading 2 (3xl)</h2>
            <h3 className="text-2xl font-bold">Heading 3 (2xl)</h3>
            <h4 className="text-xl font-bold">Heading 4 (xl)</h4>
            <p className="text-base">Body text (base) - Lorem ipsum dolor sit amet consectetur.</p>
            <p className="text-sm text-muted-foreground">Small text (sm) - Texto auxiliar e legendas.</p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default DesignSystem;