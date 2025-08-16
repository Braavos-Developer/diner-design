import React from 'react';
import { Card } from '@/design/components/atoms/Card';
import { Badge } from '@/design/components/atoms/Badge';
import { mockKPIs } from '@/mocks/dashboard';
import { BarChart3, TrendingUp } from 'lucide-react';

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-background/95 backdrop-blur">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <BarChart3 className="w-8 h-8 text-primary" />
            <div>
              <h1 className="text-2xl font-bold text-primary">Dashboard</h1>
              <p className="text-sm text-muted-foreground">Análise de vendas e performance</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockKPIs.map((kpi) => (
            <Card key={kpi.id} variant="elevated" className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">{kpi.title}</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold">
                      {kpi.unit === 'R$' && 'R$ '}
                      {kpi.value.toLocaleString('pt-BR')}
                      {kpi.unit !== 'R$' && kpi.unit}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-success" />
                    <Badge variant="default" size="sm">
                      +{kpi.change}%
                    </Badge>
                  </div>
                </div>
                <div className="text-3xl">{kpi.icon}</div>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;