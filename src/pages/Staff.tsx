import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/design/components/atoms/Card';
import { Badge } from '@/design/components/atoms/Badge';
import { Button } from '@/design/components/atoms/Button';
import { TableTile } from '@/design/components/molecules/TableTile';
import { 
  mockTables, 
  mockWaiterCalls, 
  Table, 
  WaiterCall,
  getTablesByStatus,
  getPendingCalls,
  formatCallElapsedTime,
  getCallPriorityColor
} from '@/mocks/tables';
import { 
  Users, 
  Phone, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  Settings,
  Grid3X3,
  List,
  ArrowLeft
} from 'lucide-react';
import { cn } from '@/lib/utils';

const Staff: React.FC = () => {
  const [tables, setTables] = useState(mockTables);
  const [calls, setCalls] = useState(mockWaiterCalls);
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const occupiedTables = getTablesByStatus('occupied');
  const availableTables = getTablesByStatus('available');
  const serviceTables = getTablesByStatus('needs_service');
  const pendingCalls = getPendingCalls();

  const handleTableSelect = (table: Table) => {
    setSelectedTable(table);
  };

  const handleCallAction = (callId: string, action: 'attend' | 'resolve') => {
    setCalls(prev => prev.map(call => 
      call.id === callId
        ? {
            ...call,
            status: action === 'attend' ? 'attending' : 'resolved',
            respondedAt: action === 'attend' ? new Date() : call.respondedAt,
            resolvedAt: action === 'resolve' ? new Date() : call.resolvedAt,
            assignedWaiterId: action === 'attend' ? 'waiter-001' : call.assignedWaiterId
          }
        : call
    ));
  };

  const getCallTypeIcon = (type: WaiterCall['type']) => {
    switch (type) {
      case 'water': return '💧';
      case 'utensils': return '🍴';
      case 'bill': return '💰';
      case 'assistance': return '🆘';
      case 'complaint': return '😞';
      case 'order_ready': return '🍽️';
      default: return '📞';
    }
  };

  const getCallTypeLabel = (type: WaiterCall['type']) => {
    switch (type) {
      case 'water': return 'Água';
      case 'utensils': return 'Utensílios';
      case 'bill': return 'Conta';
      case 'assistance': return 'Assistência';
      case 'complaint': return 'Reclamação';
      case 'order_ready': return 'Pedido Pronto';
      default: return 'Chamada';
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
                <Users className="w-8 h-8 text-primary" />
                <div>
                  <h1 className="text-2xl font-bold text-primary">Staff - Salão</h1>
                  <p className="text-sm text-muted-foreground">Gestão de Mesas e Atendimento</p>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <Badge variant="default">{availableTables.length}</Badge>
                  <span className="text-sm text-muted-foreground">Livres</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="default">{occupiedTables.length}</Badge>
                  <span className="text-sm text-muted-foreground">Ocupadas</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="warning">{serviceTables.length}</Badge>
                  <span className="text-sm text-muted-foreground">Serviço</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* View Toggle */}
              <div className="flex border border-border rounded-md">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="rounded-r-none"
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="rounded-l-none"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>

              <Button variant="outline" size="sm" className="gap-2">
                <Settings className="w-4 h-4" />
                Configurações
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-6">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          
          {/* Tables Section */}
          <div className="xl:col-span-3 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Mesas (25)</h2>
              <div className="text-sm text-muted-foreground">
                Ocupação: {Math.round((occupiedTables.length / tables.length) * 100)}%
              </div>
            </div>

            {/* Tables Grid */}
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {tables.map((table) => (
                  <TableTile
                    key={table.id}
                    table={table}
                    onTableSelect={handleTableSelect}
                  />
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {tables.map((table) => (
                  <Card 
                    key={table.id} 
                    variant="interactive"
                    className="p-4 flex items-center justify-between"
                    onClick={() => handleTableSelect(table)}
                  >
                    <div className="flex items-center gap-4">
                      <div className="font-bold text-lg">Mesa {table.number}</div>
                      <Badge 
                        variant={
                          table.status === 'available' ? 'default' :
                          table.status === 'occupied' ? 'default' :
                          table.status === 'needs_service' ? 'warning' :
                          'secondary'
                        }
                      >
                        {table.status === 'available' && 'Livre'}
                        {table.status === 'occupied' && 'Ocupada'}
                        {table.status === 'needs_service' && 'Chamada'}
                        {table.status === 'needs_cleaning' && 'Limpeza'}
                        {table.status === 'reserved' && 'Reservada'}
                      </Badge>
                      <div className="text-sm text-muted-foreground">
                        {table.capacity} lugares - Seção {table.section}
                      </div>
                    </div>
                    
                    {table.currentOrder && (
                      <div className="text-right">
                        <div className="font-semibold">
                          {new Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                          }).format(table.currentOrder.total)}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {table.currentOrder.itemCount} itens
                        </div>
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Calls Sidebar */}
          <div className="xl:col-span-1 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">Chamadas</h2>
              {pendingCalls.length > 0 && (
                <Badge variant="destructive" className="animate-pulse">
                  {pendingCalls.length}
                </Badge>
              )}
            </div>

            <div className="space-y-3 max-h-[calc(100vh-300px)] overflow-y-auto">
              {calls.map((call) => (
                <Card 
                  key={call.id} 
                  variant={call.status === 'pending' ? 'brand' : 'default'}
                  className={cn(
                    'p-4 space-y-3',
                    call.priority === 'urgent' && call.status === 'pending' && 'ring-2 ring-destructive/30 animate-pulse'
                  )}
                >
                  {/* Call Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{getCallTypeIcon(call.type)}</span>
                      <span className="font-bold">Mesa {call.tableNumber}</span>
                    </div>
                    <Badge variant={getCallPriorityColor(call.priority) as any} size="sm">
                      {call.priority.toUpperCase()}
                    </Badge>
                  </div>

                  {/* Call Details */}
                  <div className="space-y-2">
                    <div className="text-sm font-medium">
                      {getCallTypeLabel(call.type)}
                    </div>
                    
                    {call.message && (
                      <div className="text-sm text-muted-foreground bg-muted/50 p-2 rounded">
                        {call.message}
                      </div>
                    )}

                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      <span>{formatCallElapsedTime(call.elapsedTime)}</span>
                      {call.elapsedTime > call.estimatedResponseTime && (
                        <AlertTriangle className="w-3 h-3 text-destructive" />
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    {call.status === 'pending' && (
                      <Button
                        variant="default"
                        size="sm"
                        className="flex-1"
                        onClick={() => handleCallAction(call.id, 'attend')}
                      >
                        <Phone className="w-3 h-3 mr-1" />
                        Atender
                      </Button>
                    )}
                    
                    {call.status === 'attending' && (
                      <Button
                        variant="success"
                        size="sm"
                        className="flex-1"
                        onClick={() => handleCallAction(call.id, 'resolve')}
                      >
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Finalizar
                      </Button>
                    )}

                    {call.status === 'resolved' && (
                      <div className="flex-1 text-center py-1">
                        <Badge variant="success" size="sm">
                          ✓ Resolvido
                        </Badge>
                      </div>
                    )}
                  </div>
                </Card>
              ))}

              {calls.length === 0 && (
                <Card className="p-8 text-center opacity-60">
                  <div className="space-y-2">
                    <div className="text-2xl">🔕</div>
                    <p className="text-sm text-muted-foreground">
                      Nenhuma chamada no momento
                    </p>
                  </div>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Table Detail Modal */}
      {selectedTable && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedTable(null)}
          />
          <Card className="relative w-full max-w-md">
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold">Mesa {selectedTable.number}</h3>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setSelectedTable(null)}
                >
                  ✕
                </Button>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Capacidade:</span>
                  <span>{selectedTable.capacity} pessoas</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Seção:</span>
                  <span>{selectedTable.section}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status:</span>
                  <Badge>
                    {selectedTable.status === 'available' && 'Livre'}
                    {selectedTable.status === 'occupied' && 'Ocupada'}
                    {selectedTable.status === 'needs_service' && 'Precisa Atendimento'}
                    {selectedTable.status === 'needs_cleaning' && 'Precisa Limpeza'}
                    {selectedTable.status === 'reserved' && 'Reservada'}
                    {selectedTable.status === 'out_of_order' && 'Fora de Uso'}
                  </Badge>
                </div>

                {selectedTable.currentOrder && (
                  <>
                    <div className="border-t pt-3 space-y-2">
                      <h4 className="font-semibold">Comanda Atual</h4>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Total:</span>
                        <span className="font-bold">
                          {new Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                          }).format(selectedTable.currentOrder.total)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Itens:</span>
                        <span>{selectedTable.currentOrder.itemCount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Tempo:</span>
                        <span>
                          {Math.floor((new Date().getTime() - selectedTable.currentOrder.startTime.getTime()) / (1000 * 60))}min
                        </span>
                      </div>
                    </div>
                  </>
                )}
              </div>

              <div className="flex gap-2 pt-4">
                <Button variant="outline" size="sm" className="flex-1">
                  Ver Comanda
                </Button>
                <Button variant="hero" size="sm" className="flex-1">
                  Ações
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Staff;