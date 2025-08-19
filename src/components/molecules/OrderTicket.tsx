import React from 'react';
import { Card } from '@/design/components/atoms/Card';
import { Badge } from '@/design/components/atoms/Badge';
import { Button } from '@/design/components/atoms/Button';
import { Clock, Users, ChefHat, Play, CheckCircle, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { RealtimeOrder } from '@/services/realTimeService';

interface OrderTicketProps {
  order: RealtimeOrder;
  onStatusChange: (orderId: string, newStatus: RealtimeOrder['status']) => void;
  className?: string;
}

export const OrderTicket: React.FC<OrderTicketProps> = ({
  order,
  onStatusChange,
  className
}) => {
  const formatElapsedTime = (createdAt: Date): string => {
    const minutes = Math.floor((Date.now() - createdAt.getTime()) / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    
    if (hours > 0) {
      return `${hours}h ${mins.toString().padStart(2, '0')}m`;
    }
    return `${mins}m`;
  };

  const getStatusColor = (status: RealtimeOrder['status']): string => {
    switch (status) {
      case 'pending': return 'warning';
      case 'preparing': return 'default';
      case 'ready': return 'success';
      case 'delivered': return 'secondary';
      default: return 'secondary';
    }
  };

  const getStationIcon = (station: RealtimeOrder['station']) => {
    switch (station) {
      case 'kitchen': return <ChefHat className="w-4 h-4" />;
      case 'bar': return '🍺';
      case 'dessert': return '🍰';
      default: return <ChefHat className="w-4 h-4" />;
    }
  };

  const elapsedMinutes = Math.floor((Date.now() - order.createdAt.getTime()) / (1000 * 60));
  const isOverdue = elapsedMinutes > 30;

  return (
    <Card
      className={cn(
        'p-4 space-y-4 border-l-4 transition-all hover:shadow-md',
        order.status === 'pending' && 'border-l-warning',
        order.status === 'preparing' && 'border-l-primary',
        order.status === 'ready' && 'border-l-success',
        isOverdue && order.status !== 'delivered' && 'bg-destructive/5 border-destructive',
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-brand rounded-full flex items-center justify-center text-white font-bold text-sm">
            {order.tableNumber}
          </div>
          <div>
            <div className="font-bold">Mesa {order.tableNumber}</div>
            <div className="text-sm text-muted-foreground flex items-center gap-1">
              {getStationIcon(order.station)}
              <span className="capitalize">{order.station}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Badge variant={getStatusColor(order.status) as any} size="sm">
            {order.status === 'pending' && 'Pendente'}
            {order.status === 'preparing' && 'Preparando'}
            {order.status === 'ready' && 'Pronto'}
            {order.status === 'delivered' && 'Entregue'}
          </Badge>
          
          <div className={cn(
            'flex items-center gap-1 text-sm',
            isOverdue ? 'text-destructive font-semibold' : 'text-muted-foreground'
          )}>
            {isOverdue && <AlertTriangle className="w-4 h-4" />}
            <Clock className="w-4 h-4" />
            <span>{formatElapsedTime(order.createdAt)}</span>
          </div>
        </div>
      </div>

      {/* Items */}
      <div className="space-y-2">
        <div className="text-sm font-medium text-muted-foreground">
          {order.items.length} {order.items.length === 1 ? 'item' : 'itens'}
        </div>
        <div className="space-y-1">
          {order.items.map((item) => (
            <div key={item.id} className="flex justify-between items-start text-sm">
              <div className="flex-1">
                <span className="font-medium">{item.quantity}x {item.name}</span>
                {item.allergens && item.allergens.length > 0 && (
                  <div className="flex gap-1 mt-1">
                    {item.allergens.map((allergen) => (
                      <Badge key={allergen} variant="warning" size="sm" className="text-xs">
                        {allergen}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
              <span className="text-muted-foreground ml-2">
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                }).format(item.totalPrice)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Total */}
      <div className="flex justify-between items-center pt-2 border-t border-border">
        <span className="font-semibold">Total:</span>
        <span className="font-bold text-lg">
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }).format(order.total)}
        </span>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        {order.status === 'pending' && (
          <Button
            variant="default"
            size="sm"
            className="flex-1"
            onClick={() => onStatusChange(order.id, 'preparing')}
          >
            <Play className="w-4 h-4 mr-1" />
            Iniciar Preparo
          </Button>
        )}
        
        {order.status === 'preparing' && (
          <Button
            variant="success"
            size="sm"
            className="flex-1"
            onClick={() => onStatusChange(order.id, 'ready')}
          >
            <CheckCircle className="w-4 h-4 mr-1" />
            Marcar como Pronto
          </Button>
        )}
        
        {order.status === 'ready' && (
          <div className="flex-1 text-center py-2">
            <Badge variant="success" className="animate-pulse">
              ✅ Aguardando Entrega
            </Badge>
          </div>
        )}
      </div>
    </Card>
  );
};