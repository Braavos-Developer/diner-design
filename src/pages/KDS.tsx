import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/design/components/atoms/Card';
import { Badge } from '@/design/components/atoms/Badge';
import { Button } from '@/design/components/atoms/Button';
import { KDSTicket } from '@/design/components/molecules/KDSTicket';
import { 
  mockKDSTickets, 
  getTicketsByStatus, 
  KDSTicket as KDSTicketType 
} from '@/mocks/orders';
import { 
  ChefHat, 
  Clock, 
  AlertTriangle, 
  Filter,
  RefreshCw,
  ArrowLeft
} from 'lucide-react';
import { cn } from '@/lib/utils';

const KDS: React.FC = () => {
  const [tickets, setTickets] = useState(mockKDSTickets);
  const [selectedStation, setSelectedStation] = useState<string>('all');
  const [refreshing, setRefreshing] = useState(false);

  const stations = [
    { id: 'all', name: 'Todas', icon: '🍽️' },
    { id: 'kitchen', name: 'Cozinha', icon: '👨‍🍳' },
    { id: 'bar', name: 'Bar', icon: '🍺' },
    { id: 'dessert', name: 'Sobremesas', icon: '🍰' }
  ];

  const filteredTickets = selectedStation === 'all' 
    ? tickets 
    : tickets.filter(ticket => ticket.station === selectedStation);

  const pendingTickets = filteredTickets.filter(t => t.status === 'pending');
  const preparingTickets = filteredTickets.filter(t => t.status === 'preparing');
  const readyTickets = filteredTickets.filter(t => t.status === 'ready');
  
  const overdueCount = filteredTickets.filter(t => t.isOverdue).length;

  const handleStatusChange = (ticketId: string, newStatus: KDSTicketType['status']) => {
    setTickets(prev => prev.map(ticket => 
      ticket.id === ticketId 
        ? { 
            ...ticket, 
            status: newStatus,
            startedAt: newStatus === 'preparing' && !ticket.startedAt ? new Date() : ticket.startedAt,
            completedAt: newStatus === 'ready' ? new Date() : ticket.completedAt
          }
        : ticket
    ));
  };

  const handleRefresh = () => {
    setRefreshing(true);
    // Simulate refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const getColumnConfig = (status: string) => {
    switch (status) {
      case 'pending':
        return {
          title: 'Pendente',
          count: pendingTickets.length,
          color: 'bg-warning/10 border-warning/20',
          headerColor: 'text-warning'
        };
      case 'preparing':
        return {
          title: 'Em Preparo',
          count: preparingTickets.length,
          color: 'bg-primary/10 border-primary/20',
          headerColor: 'text-primary'
        };
      case 'ready':
        return {
          title: 'Pronto',
          count: readyTickets.length,
          color: 'bg-success/10 border-success/20',
          headerColor: 'text-success'
        };
      default:
        return {
          title: 'Desconhecido',
          count: 0,
          color: 'bg-muted',
          headerColor: 'text-muted-foreground'
        };
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Voltar
                </Button>
              </Link>
              <div className="flex items-center gap-3">
                <ChefHat className="w-8 h-8 text-primary" />
                <div>
                  <h1 className="text-2xl font-bold text-primary">Sistema KDS</h1>
                  <p className="text-sm text-muted-foreground">Kitchen Display System</p>
                </div>
              </div>

              {overdueCount > 0 && (
                <Badge variant="destructive" className="animate-pulse">
                  <AlertTriangle className="w-4 h-4 mr-1" />
                  {overdueCount} Atrasados
                </Badge>
              )}
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRefresh}
                disabled={refreshing}
                className="gap-2"
              >
                <RefreshCw className={cn('w-4 h-4', refreshing && 'animate-spin')} />
                Atualizar
              </Button>

              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>{new Date().toLocaleTimeString('pt-BR')}</span>
              </div>
            </div>
          </div>

          {/* Station Filter */}
          <div className="flex items-center gap-2 mt-4">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground mr-2">Estação:</span>
            <div className="flex gap-2">
              {stations.map((station) => (
                <Button
                  key={station.id}
                  variant={selectedStation === station.id ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedStation(station.id)}
                  className="gap-2"
                >
                  <span>{station.icon}</span>
                  <span>{station.name}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* KDS Board */}
      <main className="container mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
          
          {/* Pending Column */}
          <div className="space-y-4">
            <Card className={cn('p-4', getColumnConfig('pending').color)}>
              <div className="flex items-center justify-between">
                <h2 className={cn('text-lg font-bold', getColumnConfig('pending').headerColor)}>
                  📋 {getColumnConfig('pending').title}
                </h2>
                <Badge variant="warning" className="bg-warning/20">
                  {getColumnConfig('pending').count}
                </Badge>
              </div>
            </Card>
            
            <div className="space-y-4 overflow-y-auto max-h-[calc(100vh-280px)]">
              {pendingTickets.map((ticket) => (
                <KDSTicket
                  key={ticket.id}
                  ticket={ticket}
                  onStatusChange={handleStatusChange}
                />
              ))}
              
              {pendingTickets.length === 0 && (
                <Card className="p-8 text-center opacity-60">
                  <div className="space-y-2">
                    <div className="text-2xl">✅</div>
                    <p className="text-sm text-muted-foreground">
                      Nenhum pedido pendente
                    </p>
                  </div>
                </Card>
              )}
            </div>
          </div>

          {/* Preparing Column */}
          <div className="space-y-4">
            <Card className={cn('p-4', getColumnConfig('preparing').color)}>
              <div className="flex items-center justify-between">
                <h2 className={cn('text-lg font-bold', getColumnConfig('preparing').headerColor)}>
                  🔥 {getColumnConfig('preparing').title}
                </h2>
                <Badge variant="default" className="bg-primary/20">
                  {getColumnConfig('preparing').count}
                </Badge>
              </div>
            </Card>
            
            <div className="space-y-4 overflow-y-auto max-h-[calc(100vh-280px)]">
              {preparingTickets.map((ticket) => (
                <KDSTicket
                  key={ticket.id}
                  ticket={ticket}
                  onStatusChange={handleStatusChange}
                />
              ))}
              
              {preparingTickets.length === 0 && (
                <Card className="p-8 text-center opacity-60">
                  <div className="space-y-2">
                    <div className="text-2xl">⏳</div>
                    <p className="text-sm text-muted-foreground">
                      Nenhum pedido em preparo
                    </p>
                  </div>
                </Card>
              )}
            </div>
          </div>

          {/* Ready Column */}
          <div className="space-y-4">
            <Card className={cn('p-4', getColumnConfig('ready').color)}>
              <div className="flex items-center justify-between">
                <h2 className={cn('text-lg font-bold', getColumnConfig('ready').headerColor)}>
                  ✅ {getColumnConfig('ready').title}
                </h2>
                <Badge variant="success" className="bg-success/20">
                  {getColumnConfig('ready').count}
                </Badge>
              </div>
            </Card>
            
            <div className="space-y-4 overflow-y-auto max-h-[calc(100vh-280px)]">
              {readyTickets.map((ticket) => (
                <KDSTicket
                  key={ticket.id}
                  ticket={ticket}
                  onStatusChange={handleStatusChange}
                />
              ))}
              
              {readyTickets.length === 0 && (
                <Card className="p-8 text-center opacity-60">
                  <div className="space-y-2">
                    <div className="text-2xl">🎉</div>
                    <p className="text-sm text-muted-foreground">
                      Nenhum pedido pronto
                    </p>
                  </div>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default KDS;